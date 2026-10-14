/**
 * Sanctum Studio - System, Settings & Search Launcher Templates
 */

import { createEmptyDocument } from '../ast/schema.js';

export function createOnboardingSettingsTemplate() {
  const doc = createEmptyDocument('Onboarding & Settings Vault', 'onboarding_account_settings');
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Settings Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'stepper_card',
        type: 'CardWidget',
        name: 'Account & Credentials Stepper',
        props: { title: 'Security & Provider Credentials', subtitle: 'Step 2 of 4: API Vault Configuration' },
        children: [
          {
            id: 'api_key_input',
            type: 'Input',
            name: 'API Key Input',
            props: { label: 'Provider API Key / Token', placeholder: 'sk-... (encrypted in local keychain)' }
          },
          {
            id: 'save_token_btn',
            type: 'Button',
            name: 'Save Token',
            props: { label: 'Verify & Store in Keychain', variant: 'primary' }
          }
        ]
      }
    ]
  };
  return doc;
}

export function createSearchLauncherTemplate() {
  const doc = createEmptyDocument('Command Palette & Search', 'search_command_launcher');
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Command Launcher Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'command_box_card',
        type: 'CardWidget',
        name: 'Command Input Box',
        props: { title: 'Quick Command Launcher (Ctrl+K)', subtitle: 'Search actions, artboards, and tokens' },
        children: [
          {
            id: 'search_bar',
            type: 'Input',
            name: 'Search Bar',
            props: { label: 'Type command or keyword', placeholder: '> Run QA audit, export to Compose...' }
          },
          {
            id: 'recent_commands_table',
            type: 'DataTable',
            name: 'Recent Commands',
            props: {
              columns: ['Shortcut', 'Command Name', 'Category', 'Last Run']
            }
          }
        ]
      }
    ]
  };
  return doc;
}
