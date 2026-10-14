/**
 * Sanctum Studio - Collaboration & Messaging Templates
 */

import { createEmptyDocument } from '../ast/schema.js';

export function createProjectPlanningTemplate() {
  const doc = createEmptyDocument('Project Planning & Kanban', 'project_planning_collaboration');
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Collaboration Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'kanban_card',
        type: 'CardWidget',
        name: 'Sprint Board',
        props: { title: 'Q4 Milestone Delivery', subtitle: '6 active agent assignees' },
        children: [
          {
            id: 'kanban_rack',
            type: 'TaskRack',
            name: 'Kanban Rack',
            props: {
              columns: ['Backlog', 'Design Spec', 'Code Implementation', 'Verification Gate', 'Merged']
            }
          }
        ]
      }
    ]
  };
  return doc;
}

export function createMessagingCommunityTemplate() {
  const doc = createEmptyDocument('Community & Agent Messaging', 'messaging_community');
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Messaging Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'chat_stream_card',
        type: 'CardWidget',
        name: 'Stream Channel',
        props: { title: '#general-engineering', subtitle: 'Connected to local agent network' },
        children: [
          {
            id: 'message_input',
            type: 'Input',
            name: 'Chat Input',
            props: { label: 'Broadcast Message', placeholder: 'Send command or update to channel...' }
          },
          {
            id: 'send_btn',
            type: 'Button',
            name: 'Send Button',
            props: { label: 'Send Broadcast', variant: 'primary' }
          }
        ]
      }
    ]
  };
  return doc;
}
