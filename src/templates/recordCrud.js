/**
 * Sanctum Studio - Record Administration / CRUD Preset Template
 * Models enterprise data records, bulk actions, and safe modification workflows
 */

import { createEmptyDocument } from '../ast/schema.js';

export function createRecordCrudTemplate() {
  const doc = createEmptyDocument('Data Administration Console', 'record_administration_crud');

  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Admin Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'header_actions_card',
        type: 'CardWidget',
        name: 'Action & Filter Bar',
        props: { title: 'User & Permission Records' },
        children: [
          {
            id: 'filter_row',
            type: 'FilterBar',
            props: {
              searchPlaceholder: 'Search by ID, role, or email...',
              filterChips: ['All (1,420)', 'Admins (12)', 'Pending Approval (4)', 'Disabled (35)']
            }
          }
        ]
      },
      {
        id: 'table_card',
        type: 'CardWidget',
        name: 'Data Table Card',
        props: { title: 'Records Table · Paginated' },
        children: [
          {
            id: 'data_table',
            type: 'DataTable',
            props: {
              columns: [
                { key: 'id', title: 'Record ID', width: '120px' },
                { key: 'name', title: 'Subject Name', width: '240px' },
                { key: 'role', title: 'Security Role', width: '160px' },
                { key: 'status', title: 'State', width: '140px' },
                { key: 'actions', title: 'Actions', width: '140px' }
              ],
              bulkSelectionEnabled: true,
              destructiveConfirmationPrompt: 'Are you sure you want to delete {count} selected records?'
            }
          }
        ]
      }
    ]
  };

  return doc;
}
