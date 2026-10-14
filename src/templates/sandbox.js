/**
 * Sanctum Studio - Testing, Coding & Sandbox Preset Template
 * Models Qwen Lab sandbox and developer IDE workflows
 */

import { createEmptyDocument } from '../ast/schema.js';

export function createSandboxTemplate() {
  const doc = createEmptyDocument('Developer Sandbox & Test Bench', 'testing_coding_sandbox');

  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Sandbox Shell',
    props: {
      isolationMode: 'Virtual Workspace (Dry Run)',
      containerQueries: true
    },
    children: [
      {
        id: 'top_sandbox_bar',
        type: 'StatusBanner',
        name: 'Isolation Banner',
        props: {
          env: 'SANDBOX ISOLATED',
          badgeColor: '#5EEAD4',
          notice: 'Zero paid API calls allowed without explicit approval token.'
        }
      },
      {
        id: 'main_ide_area',
        type: 'WorkspaceContainer',
        name: 'IDE Workspace Area',
        props: { layout: 'three_pane_vertical' },
        children: [
          {
            id: 'upper_editor_split',
            type: 'SplitPane',
            name: 'Code & Diff Split Pane',
            children: [
              {
                id: 'proposed_code_card',
                type: 'CardWidget',
                name: 'Proposed AST Changes',
                props: { title: 'Diff Viewer · Modified vs Baseline' },
                children: [
                  {
                    id: 'diff_display',
                    type: 'DiffViewer',
                    props: {
                      file: 'domain_tasks.py',
                      horizontalScroll: true,
                      additions: 14,
                      deletions: 2
                    }
                  }
                ]
              }
            ]
          },
          {
            id: 'bottom_terminal_card',
            type: 'CardWidget',
            name: 'JediTerm Terminal & Log View',
            props: { title: 'Terminal Output (PTY / WSL2)' },
            children: [
              {
                id: 'terminal_emulator',
                type: 'TerminalView',
                props: {
                  theme: 'JediDark',
                  shell: 'bash',
                  cwd: '/workspace/sanctum'
                }
              }
            ]
          }
        ]
      }
    ]
  };

  return doc;
}
