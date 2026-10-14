/**
 * Sanctum Studio - Local Project Storage Engine
 * Manages .sanctum project files on local disk
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const PROJECTS_DIR = path.resolve(__dirname, '../../projects');

// Ensure directory exists
if (!fs.existsSync(PROJECTS_DIR)) {
  fs.mkdirSync(PROJECTS_DIR, { recursive: true });
}

/**
 * Lists all .sanctum projects in the storage directory
 */
export function listSavedProjects() {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  const files = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.sanctum') || f.endsWith('.sanctum.json'));
  
  return files.map(file => {
    const filePath = path.join(PROJECTS_DIR, file);
    const stats = fs.statSync(filePath);
    let meta = { title: file, subtype: 'unknown' };
    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (content.meta) {
        meta.title = content.meta.title || file;
        meta.subtype = content.meta.subtype || 'unknown';
      }
    } catch {
      // fallback to filename
    }
    return {
      fileName: file,
      filePath,
      title: meta.title,
      subtype: meta.subtype,
      sizeBytes: stats.size,
      updatedAt: stats.mtime.toISOString()
    };
  }).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

/**
 * Saves a document to a .sanctum file
 */
export function saveProjectToDisk(fileName, doc) {
  let safeName = fileName.replace(/[^a-zA-Z0-9_\-\.]/g, '_');
  if (!safeName.endsWith('.sanctum') && !safeName.endsWith('.sanctum.json')) {
    safeName += '.sanctum';
  }
  
  const targetPath = path.join(PROJECTS_DIR, safeName);
  doc.meta = doc.meta || {};
  doc.meta.updatedAt = new Date().toISOString();

  fs.writeFileSync(targetPath, JSON.stringify(doc, null, 2), 'utf8');
  return {
    success: true,
    fileName: safeName,
    filePath: targetPath,
    doc
  };
}

/**
 * Loads a document from a .sanctum file
 */
export function loadProjectFromDisk(fileName) {
  const targetPath = path.isAbsolute(fileName) ? fileName : path.join(PROJECTS_DIR, fileName);
  if (!fs.existsSync(targetPath)) {
    throw new Error(`Project file '${fileName}' not found at ${targetPath}`);
  }

  const raw = fs.readFileSync(targetPath, 'utf8');
  const doc = JSON.parse(raw);
  return {
    success: true,
    filePath: targetPath,
    doc
  };
}
