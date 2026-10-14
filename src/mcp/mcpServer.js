/**
 * Sanctum Studio - Stdio Model Context Protocol (MCP) Server
 * Exposes design inspection, template application, component insertion/editing, QA validation, and code export tools
 */

import readline from 'node:readline';
import { listAllTemplates, createTemplateBySubtype } from '../templates/index.js';
import { runFullQaAudit } from '../validation/a11yAuditor.js';
import { exportToCompose } from '../exporters/composeExporter.js';
import { exportToPyQt } from '../exporters/pyqtExporter.js';
import { exportToReact } from '../exporters/reactExporter.js';
import { exportToDtcgTokens } from '../exporters/dtcgExporter.js';
import { exportToDesignCanvas } from '../exporters/canvasExporter.js';
import {
  COMPONENT_DEFINITIONS,
  createComponentInstance,
  findNodeById,
  removeNodeById
} from '../ast/components.js';
import { saveProjectToDisk, loadProjectFromDisk } from '../server/projectStorage.js';

let currentDoc = createTemplateBySubtype('ai_assistant_delegation');

export const TOOLS = [
  {
    name: 'design_list_templates',
    description: 'Lists all 23 interface subtype preset templates available in the Sanctum UX Handbook.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'design_get_active_doc',
    description: 'Retrieves the complete Sanctum IR AST document currently loaded in the studio.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'design_apply_template',
    description: 'Applies one of the 23 interface subtype presets (e.g. ai_assistant_delegation, creative_document_editor, record_administration_crud).',
    inputSchema: {
      type: 'object',
      properties: {
        subtypeId: {
          type: 'string',
          description: 'Identifier of the subtype preset (e.g. ai_assistant_delegation, creative_document_editor, testing_coding_sandbox).'
        }
      },
      required: ['subtypeId']
    }
  },
  {
    name: 'design_insert_component',
    description: 'Inserts a new component (Button, Input, CardWidget, RiskGuardBanner, TaskRack, MetricChip, DataTable) into the active visual design AST.',
    inputSchema: {
      type: 'object',
      properties: {
        defKey: {
          type: 'string',
          enum: Object.keys(COMPONENT_DEFINITIONS),
          description: 'Component definition key (e.g. button, input, card_widget, risk_guard, task_rack, metric_chip, data_table).'
        },
        parentId: {
          type: 'string',
          description: 'Optional ID of the container element to insert into. If omitted, appends to the root AppShell.'
        },
        customProps: {
          type: 'object',
          description: 'Custom properties (e.g. label, title, subtitle, variant, placeholder).'
        }
      },
      required: ['defKey']
    }
  },
  {
    name: 'design_modify_props',
    description: 'Updates properties (title, label, variant, helperText) of any existing component in the design AST.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'ID of the component to update.'
        },
        props: {
          type: 'object',
          description: 'Properties to merge into the component.'
        },
        name: {
          type: 'string',
          description: 'Optional new display name.'
        }
      },
      required: ['id', 'props']
    }
  },
  {
    name: 'design_delete_component',
    description: 'Removes a component by ID from the active design AST.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'ID of the component to delete.'
        }
      },
      required: ['id']
    }
  },
  {
    name: 'design_save_project',
    description: 'Saves the active design document to local disk as a .sanctum project file.',
    inputSchema: {
      type: 'object',
      properties: {
        fileName: {
          type: 'string',
          description: 'Filename or path (e.g. my-app-design.sanctum).'
        }
      },
      required: ['fileName']
    }
  },
  {
    name: 'design_load_project',
    description: 'Loads a .sanctum project file from local disk into the active design AST.',
    inputSchema: {
      type: 'object',
      properties: {
        fileName: {
          type: 'string',
          description: 'Filename of the .sanctum project to open.'
        }
      },
      required: ['fileName']
    }
  },
  {
    name: 'design_validate_qa',
    description: 'Runs automated accessibility, contrast, hit target, and state machine completeness verification.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'design_export_code',
    description: 'Compiles the active design into production code for Compose Multiplatform (Kotlin), PyQt6 (Python), React (Web), DTCG Tokens, or Design Canvas.',
    inputSchema: {
      type: 'object',
      properties: {
        target: {
          type: 'string',
          enum: ['compose', 'pyqt6', 'react', 'dtcg', 'canvas'],
          description: 'Target export framework or format.'
        }
      },
      required: ['target']
    }
  }
];

export function handleToolCall(name, args) {
  switch (name) {
    case 'design_list_templates':
      return {
        content: [{ type: 'text', text: JSON.stringify(listAllTemplates(), null, 2) }]
      };

    case 'design_get_active_doc':
      return {
        content: [{ type: 'text', text: JSON.stringify(currentDoc, null, 2) }]
      };

    case 'design_apply_template': {
      currentDoc = createTemplateBySubtype(args.subtypeId);
      return {
        content: [
          {
            type: 'text',
            text: `Successfully applied template '${args.subtypeId}'. Document title: '${currentDoc.meta?.title}'.`
          }
        ]
      };
    }

    case 'design_insert_component': {
      const { defKey, parentId, customProps } = args;
      const component = createComponentInstance(defKey, customProps);
      let target = currentDoc.masterPrototype;
      if (parentId) {
        const found = findNodeById(currentDoc.masterPrototype, parentId);
        if (found && found.children) target = found;
      }
      if (!target.children) target.children = [];
      target.children.push(component);
      return {
        content: [
          {
            type: 'text',
            text: `Successfully inserted component '${component.name}' (${component.type}) with ID '${component.id}'.`
          }
        ]
      };
    }

    case 'design_modify_props': {
      const { id, props, name: nodeName } = args;
      const node = findNodeById(currentDoc.masterPrototype, id);
      if (!node) throw new Error(`Node '${id}' not found`);
      if (nodeName) node.name = nodeName;
      node.props = { ...node.props, ...props };
      return {
        content: [
          {
            type: 'text',
            text: `Successfully updated properties for node '${id}'.`
          }
        ]
      };
    }

    case 'design_delete_component': {
      const { id } = args;
      const removed = removeNodeById(currentDoc.masterPrototype, id);
      if (!removed) throw new Error(`Node '${id}' not found for deletion`);
      return {
        content: [
          {
            type: 'text',
            text: `Successfully deleted component '${id}'.`
          }
        ]
      };
    }

    case 'design_save_project': {
      const saveRes = saveProjectToDisk(args.fileName, currentDoc);
      return {
        content: [
          {
            type: 'text',
            text: `Successfully saved design to '${saveRes.filePath}'.`
          }
        ]
      };
    }

    case 'design_load_project': {
      const loadRes = loadProjectFromDisk(args.fileName);
      currentDoc = loadRes.doc;
      return {
        content: [
          {
            type: 'text',
            text: `Successfully loaded project '${args.fileName}'. Title: '${currentDoc.meta?.title}'.`
          }
        ]
      };
    }

    case 'design_validate_qa': {
      const qaResult = runFullQaAudit(currentDoc);
      return {
        content: [{ type: 'text', text: JSON.stringify(qaResult, null, 2) }]
      };
    }

    case 'design_export_code': {
      const target = args.target;
      let output = '';
      if (target === 'compose') output = exportToCompose(currentDoc);
      else if (target === 'pyqt6') output = exportToPyQt(currentDoc);
      else if (target === 'react') output = exportToReact(currentDoc);
      else if (target === 'dtcg') output = JSON.stringify(exportToDtcgTokens(currentDoc), null, 2);
      else if (target === 'canvas') output = JSON.stringify(exportToDesignCanvas(currentDoc), null, 2);
      else throw new Error(`Unknown target '${target}'`);

      return {
        content: [{ type: 'text', text: output }]
      };
    }

    default:
      throw new Error(`Tool '${name}' not recognized.`);
  }
}

export function startMcpServer() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  const sendResponse = (id, result, error = null) => {
    const res = { jsonrpc: '2.0', id };
    if (error) res.error = error;
    else res.result = result;
    process.stdout.write(JSON.stringify(res) + '\n');
  };

  rl.on('line', (line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    try {
      const req = JSON.parse(trimmed);
      const { id, method, params } = req;

      if (method === 'initialize') {
        sendResponse(id, {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: 'sanctum-design-mcp', version: '1.0.0' }
        });
      } else if (method === 'notifications/initialized') {
        // Notification, no reply needed
      } else if (method === 'tools/list') {
        sendResponse(id, { tools: TOOLS });
      } else if (method === 'tools/call') {
        const { name, arguments: args } = params;
        const result = handleToolCall(name, args || {});
        sendResponse(id, result);
      } else {
        sendResponse(id, null, { code: -32601, message: `Method '${method}' not found` });
      }
    } catch (err) {
      sendResponse(null, null, { code: -32700, message: `Parse error: ${err.message}` });
    }
  });
}
