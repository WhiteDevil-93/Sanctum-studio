/**
 * Sanctum Studio - Local HTTP Server
 * Serves the Visual Studio UI and REST APIs for templates, exports, visual editing, and QA
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { listAllTemplates, createTemplateBySubtype } from '../templates/index.js';
import { createEmptyDocument } from '../ast/schema.js';
import {
  COMPONENT_DEFINITIONS,
  createComponentInstance,
  findNodeById,
  findParentNode,
  removeNodeById
} from '../ast/components.js';
import { runFullQaAudit } from '../validation/a11yAuditor.js';
import { exportToCompose } from '../exporters/composeExporter.js';
import { exportToPyQt } from '../exporters/pyqtExporter.js';
import { exportToReact } from '../exporters/reactExporter.js';
import { exportToDtcgTokens } from '../exporters/dtcgExporter.js';
import { exportToDesignCanvas } from '../exporters/canvasExporter.js';
import { listSavedProjects, saveProjectToDisk, loadProjectFromDisk } from './projectStorage.js';
import { applyDesignOptions } from '../tokens/designOptions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UI_DIR = path.resolve(__dirname, '../../ui');

let currentDoc = createTemplateBySubtype('ai_assistant_delegation');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml'
};

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

export function createStudioServer() {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = url.pathname;

    // CORS & Common Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    // --- REST APIs ---
    if (pathname === '/api/templates' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(listAllTemplates()));
      return;
    }

    if (pathname === '/api/components/palette' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(COMPONENT_DEFINITIONS));
      return;
    }

    if (pathname === '/api/doc' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(currentDoc));
      return;
    }

    if (pathname.startsWith('/api/template/') && req.method === 'POST') {
      const subtypeId = pathname.replace('/api/template/', '');
      currentDoc = createTemplateBySubtype(subtypeId);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, doc: currentDoc }));
      return;
    }

    // --- Design Options (global design-language presets) ---
    if (pathname === '/api/design-options' && req.method === 'POST') {
      try {
        const body = await parseJsonBody(req);
        applyDesignOptions(currentDoc, body);
        currentDoc.meta.updatedAt = new Date().toISOString();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, doc: currentDoc }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    // --- Component Mutation APIs (Build Your Own) ---
    if (pathname === '/api/component/add' && req.method === 'POST') {
      try {
        const body = await parseJsonBody(req);
        const { defKey, parentId, customProps } = body;
        const newComponent = createComponentInstance(defKey, customProps);

        let targetParent = currentDoc.masterPrototype;
        if (parentId) {
          const found = findNodeById(currentDoc.masterPrototype, parentId);
          if (found && found.children) {
            targetParent = found;
          }
        }

        if (!targetParent.children) targetParent.children = [];
        targetParent.children.push(newComponent);
        currentDoc.meta.updatedAt = new Date().toISOString();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, component: newComponent, doc: currentDoc }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    if (pathname === '/api/component/update' && req.method === 'POST') {
      try {
        const body = await parseJsonBody(req);
        const { id, props, name } = body;
        const node = findNodeById(currentDoc.masterPrototype, id);
        if (!node) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: `Node '${id}' not found` }));
          return;
        }

        if (name) node.name = name;
        if (props) node.props = { ...node.props, ...props };
        currentDoc.meta.updatedAt = new Date().toISOString();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, node, doc: currentDoc }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    if (pathname === '/api/component/delete' && req.method === 'POST') {
      try {
        const body = await parseJsonBody(req);
        const { id } = body;
        const removed = removeNodeById(currentDoc.masterPrototype, id);
        if (!removed) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: `Node '${id}' not found` }));
          return;
        }

        currentDoc.meta.updatedAt = new Date().toISOString();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, doc: currentDoc }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    if (pathname === '/api/component/reorder' && req.method === 'POST') {
      try {
        const body = await parseJsonBody(req);
        const { id, direction } = body; // direction: 'up' | 'down'
        const parent = findParentNode(currentDoc.masterPrototype, id);
        if (!parent || !parent.children) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Node parent not found or has no siblings' }));
          return;
        }

        const idx = parent.children.findIndex(c => c.id === id);
        if (idx !== -1) {
          const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
          if (targetIdx >= 0 && targetIdx < parent.children.length) {
            const [moved] = parent.children.splice(idx, 1);
            parent.children.splice(targetIdx, 0, moved);
          }
        }

        currentDoc.meta.updatedAt = new Date().toISOString();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, doc: currentDoc }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    // --- Project Operations ---
    if (pathname === '/api/project/new' && req.method === 'POST') {
      try {
        const body = await parseJsonBody(req);
        const title = body.title || 'Custom Blank Design';
        const doc = createEmptyDocument(title, 'custom_blank');
        const rootCard = createComponentInstance('card_widget', {
          title: 'Main Canvas Card',
          subtitle: 'Build your custom UI by adding components from the palette'
        });
        doc.masterPrototype.children = [rootCard];
        currentDoc = doc;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, doc: currentDoc }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    if (pathname === '/api/project/save' && req.method === 'POST') {
      try {
        const body = await parseJsonBody(req);
        if (body.doc) {
          currentDoc = body.doc;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, doc: currentDoc }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    if (pathname === '/api/project/list-saved' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(listSavedProjects()));
      return;
    }

    if (pathname === '/api/project/save-to-disk' && req.method === 'POST') {
      try {
        const body = await parseJsonBody(req);
        const fileName = body.fileName || (currentDoc.meta.title || 'untitled').toLowerCase().replace(/\s+/g, '-');
        const result = saveProjectToDisk(fileName, currentDoc);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    if (pathname === '/api/project/open-from-disk' && req.method === 'POST') {
      try {
        const body = await parseJsonBody(req);
        const { fileName } = body;
        const result = loadProjectFromDisk(fileName);
        currentDoc = result.doc;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    if (pathname.startsWith('/api/export/') && req.method === 'GET') {
      const target = pathname.replace('/api/export/', '');
      let code = '';
      if (target === 'compose') code = exportToCompose(currentDoc);
      else if (target === 'pyqt6') code = exportToPyQt(currentDoc);
      else if (target === 'react') code = exportToReact(currentDoc);
      else if (target === 'dtcg') code = JSON.stringify(exportToDtcgTokens(currentDoc), null, 2);
      else if (target === 'canvas') code = JSON.stringify(exportToDesignCanvas(currentDoc), null, 2);
      else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `Unknown export target '${target}'` }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(code);
      return;
    }

    if (pathname === '/api/qa' && req.method === 'GET') {
      const qaResult = runFullQaAudit(currentDoc);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(qaResult));
      return;
    }

    // --- Static File Serving ---
    // Serve UI_DIR by default; fall back to the project root for module
    // imports that reach into src/ (e.g. ui/app.js importing
    // ../src/tokens/designOptions.js). UI wins on a path collision.
    const rootDir = path.resolve(__dirname, '../..');
    let filePath = path.join(UI_DIR, pathname === '/' ? 'index.html' : pathname);
    if (!fs.existsSync(filePath) && !pathname.startsWith('/api/')) {
      const alt = path.join(rootDir, pathname);
      if (fs.existsSync(alt)) filePath = alt;
    }
    if (!fs.existsSync(filePath)) {
      filePath = path.join(UI_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
}
