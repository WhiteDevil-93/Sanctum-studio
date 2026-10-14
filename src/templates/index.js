/**
 * Sanctum Studio - Master Template Registry & Factory
 * Fully implements bespoke AST trees for all 23 interface subtypes from INTERFACE_PATTERNS.md
 */

import { PRESETS_CATALOG } from './presetsCatalog.js';
import { createAiDelegationTemplate } from './aiDelegation.js';
import { createCreativeEditorTemplate } from './creativeEditor.js';
import { createSandboxTemplate } from './sandbox.js';
import { createRecordCrudTemplate } from './recordCrud.js';
import { createOperationsQueueTemplate, createRenderFarmTemplate } from './operationsMonitor.js';
import { createAnalyticsDashboardTemplate } from './analyticsDashboard.js';
import { createMediaAssetTemplate } from './mediaAsset.js';
import { createProjectPlanningTemplate, createMessagingCommunityTemplate } from './collaborationHub.js';
import { createOnboardingSettingsTemplate, createSearchLauncherTemplate } from './systemSettings.js';
import {
  createHealthFinanceTemplate,
  createPublicServiceTemplate,
  createScientificEngineeringTemplate,
  createEducationLearningTemplate,
  createMapsGeospatialTemplate,
  createGameImmersiveTemplate,
  createKioskXrTemplate,
  createMarketingLandingTemplate,
  createContentPublishingTemplate,
  createTransactionCommerceTemplate,
  createConsumerUtilityTemplate
} from './domainSpecialized.js';
import { createEmptyDocument } from '../ast/schema.js';

export const SPECIALIZED_FACTORIES = {
  // 1. Agents & Sandboxes
  ai_assistant_delegation: createAiDelegationTemplate,
  testing_coding_sandbox: createSandboxTemplate,

  // 2. Operations & Racks
  operations_monitoring_queue: createOperationsQueueTemplate,
  export_render_background_jobs: createRenderFarmTemplate,

  // 3. Creative & Media
  creative_document_editor: createCreativeEditorTemplate,
  media_library_asset_management: createMediaAssetTemplate,

  // 4. Data & Analytics
  record_administration_crud: createRecordCrudTemplate,
  analytics_dashboard: createAnalyticsDashboardTemplate,

  // 5. Collaboration & Community
  project_planning_collaboration: createProjectPlanningTemplate,
  messaging_community: createMessagingCommunityTemplate,

  // 6. System & Search
  onboarding_account_settings: createOnboardingSettingsTemplate,
  search_command_launcher: createSearchLauncherTemplate,

  // 7. Regulated & Public Service
  health_finance_regulated: createHealthFinanceTemplate,
  public_service_accessibility_first: createPublicServiceTemplate,

  // 8. Specialized & Immersive
  scientific_engineering: createScientificEngineeringTemplate,
  education_guided_learning: createEducationLearningTemplate,
  maps_geospatial: createMapsGeospatialTemplate,
  game_immersive: createGameImmersiveTemplate,
  kiosk_tv_wearable_xr: createKioskXrTemplate,

  // 9. Web & Utilities
  marketing_landing: createMarketingLandingTemplate,
  content_publishing_docs: createContentPublishingTemplate,
  transaction_booking_commerce: createTransactionCommerceTemplate,
  consumer_utility: createConsumerUtilityTemplate
};

/**
 * Creates a fully configured Sanctum IR Document for any of the 23 subtypes
 */
export function createTemplateBySubtype(subtypeId) {
  if (SPECIALIZED_FACTORIES[subtypeId]) {
    return SPECIALIZED_FACTORIES[subtypeId]();
  }

  const meta = PRESETS_CATALOG.find(p => p.id === subtypeId) || PRESETS_CATALOG[0];
  const doc = createEmptyDocument(meta.title, meta.id);
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: `${meta.title} Shell`,
    props: {
      category: meta.category,
      characteristicRisk: meta.characteristicRisk,
      containerQueries: true
    },
    children: [
      {
        id: 'header_card',
        type: 'CardWidget',
        name: 'Header & Context',
        props: {
          title: meta.title,
          subtitle: meta.description
        }
      }
    ]
  };
  return doc;
}

export function listAllTemplates() {
  return PRESETS_CATALOG;
}
