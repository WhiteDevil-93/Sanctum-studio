/**
 * Sanctum Studio - AI Assistant & Delegation Preset Template
 * Models the multi-agent delegation center (Control Center, HypnoForge, ForgeHub, Qwen Lab)
 */

import { createEmptyDocument } from '../ast/schema.js';

export function createAiDelegationTemplate() {
  const doc = createEmptyDocument('Sanctum Agent Hub', 'ai_assistant_delegation');

  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Sanctum Shell',
    props: {
      domains: ['Control Center', 'HypnoForge', 'ForgeHub', 'Qwen Lab'],
      activeDomain: 'Control Center',
      containerQueries: true
    },
    children: [
      {
        id: 'sidebar_rail',
        type: 'NavigationRail',
        name: 'Domain Navigation Rail',
        props: {
          items: [
            { id: 'cc', label: 'Control Center', icon: 'agent', badge: 'Active' },
            { id: 'hf', label: 'HypnoForge', icon: 'palette', badge: '2 tasks' },
            { id: 'fh', label: 'ForgeHub', icon: 'hub', badge: 'Online' },
            { id: 'qw', label: 'Qwen Lab', icon: 'terminal', badge: 'Proposed' }
          ]
        }
      },
      {
        id: 'main_workspace',
        type: 'WorkspaceContainer',
        name: 'Central Agent Workspace',
        props: { layout: 'split_columns', minWidth: '0' },
        children: [
          {
            id: 'agent_chat_column',
            type: 'AgentChatView',
            name: 'Agent Interaction Stream',
            props: {
              activeAgent: 'Venice Agent',
              model: 'gemma4_e4b_32k',
              showProvenance: true
            },
            children: [
              {
                id: 'approval_gate_card',
                type: 'ApprovalGateCard',
                name: 'Approval Gate',
                props: {
                  title: 'Tool Approval Required',
                  tool: 'cloud_render_submit',
                  costEstimate: '$0.40',
                  target: 'Vast.ai Instance #9021',
                  status: 'AWAITING_CONFIRMATION'
                }
              },
              {
                id: 'tool_execution_log',
                type: 'ToolExecutionTimeline',
                name: 'Tool Execution Flow',
                props: {
                  steps: [
                    { step: 1, name: 'Inspect Local Index', status: 'COMPLETED', evidence: 'index.sqlite: 42 rows' },
                    { step: 2, name: 'Prepare Render Pack', status: 'COMPLETED', evidence: 'bundle.zip: 14MB' },
                    { step: 3, name: 'Sync to Remote Worker', status: 'RUNNING', evidence: '48% uploaded' }
                  ]
                }
              }
            ]
          },
          {
            id: 'task_rack',
            type: 'TaskMonitoringRack',
            name: 'Active Tasks Rack',
            props: { density: 'compact', widthEm: '24em' },
            children: [
              {
                id: 'task_item_1',
                type: 'TaskCard',
                name: 'Task Card #1',
                props: {
                  taskId: 'task-101',
                  domain: 'HypnoForge',
                  title: 'Synthesize PMV Sequence',
                  state: 'RUNNING',
                  progress: 0.65,
                  allowCancel: true
                }
              },
              {
                id: 'task_item_2',
                type: 'TaskCard',
                name: 'Task Card #2',
                props: {
                  taskId: 'task-102',
                  domain: 'Qwen Lab',
                  title: 'Run AST Code Audit',
                  state: 'QUEUED',
                  progress: 0.0,
                  allowCancel: true
                }
              }
            ]
          }
        ]
      }
    ]
  };

  doc.scenarios = [
    {
      id: 'desktop_100_running',
      title: 'Desktop 100% · Sanctum Delegation Active',
      viewport: { width: 1280, height: 800 },
      scale: 1.0,
      activeState: 'running',
      theme: 'dark'
    },
    {
      id: 'desktop_150_running',
      title: 'Desktop 150% · Scaled Text Layout',
      viewport: { width: 1280, height: 800 },
      scale: 1.5,
      activeState: 'running',
      theme: 'dark'
    },
    {
      id: 'mobile_390_running',
      title: 'Phone 390px · Adaptive Rail -> Bottom Bar',
      viewport: { width: 390, height: 844 },
      scale: 1.0,
      activeState: 'running',
      theme: 'dark'
    }
  ];

  return doc;
}
