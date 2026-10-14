/**
 * Sanctum Studio - Domain-Specific Subtype Templates
 * Provides bespoke AST trees for regulated, scientific, educational, and public service interfaces
 */

import { createEmptyDocument } from '../ast/schema.js';

export function createHealthFinanceTemplate() {
  const doc = createEmptyDocument('Regulated Health & Finance Suite', 'health_finance_regulated');
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Regulated Suite Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'compliance_banner',
        type: 'RiskGuardBanner',
        name: 'Dual-Key Authorization Guard',
        props: {
          title: 'High-Integrity Audit Mode',
          message: 'All actions logged to immutable tamper-evident journal. Dual signature required.',
          severity: 'danger'
        }
      },
      {
        id: 'audit_card',
        type: 'CardWidget',
        name: 'Transaction Ledger & Approvals',
        props: { title: 'Compliance Journal', subtitle: 'Zero masked transactions permitted without sign-off' },
        children: [
          {
            id: 'audit_table',
            type: 'DataTable',
            name: 'Audit Grid',
            props: { columns: ['Record ID', 'Timestamp', 'Originator', 'Checksum', 'Audit Status'] }
          }
        ]
      }
    ]
  };
  return doc;
}

export function createPublicServiceTemplate() {
  const doc = createEmptyDocument('Public Service Accessibility-First', 'public_service_accessibility_first');
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Public Service Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'a11y_card',
        type: 'CardWidget',
        name: 'Accessible Services Portal',
        props: { title: 'Citizen Application Portal', subtitle: 'WCAG 2.2 AAA Contrast & Screen-Reader Optimized' },
        children: [
          {
            id: 'service_name_input',
            type: 'Input',
            name: 'Citizen ID / Reference',
            props: { label: 'Application Reference Number', placeholder: 'e.g. APP-2026-9921', helperText: 'Found on your paper notice' }
          },
          {
            id: 'submit_service_btn',
            type: 'Button',
            name: 'Submit Application',
            props: { label: 'Verify & Proceed to Step 2', variant: 'primary', size: 'large' }
          }
        ]
      }
    ]
  };
  return doc;
}

export function createScientificEngineeringTemplate() {
  const doc = createEmptyDocument('Scientific & Computational Studio', 'scientific_engineering');
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Scientific Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'param_sweep_card',
        type: 'CardWidget',
        name: 'Parameter Sweep Harness',
        props: { title: 'Simulation Parameters', subtitle: 'Monte Carlo iterations & seed control' },
        children: [
          {
            id: 'metric_convergence',
            type: 'MetricChip',
            name: 'Convergence Delta',
            props: { label: 'Residual Error (L2)', value: '0.00041', trend: 'Converged', status: 'nominal' }
          },
          {
            id: 'run_simulation_btn',
            type: 'Button',
            name: 'Run Simulation',
            props: { label: 'Execute Computational Run', variant: 'primary' }
          }
        ]
      }
    ]
  };
  return doc;
}

export function createEducationLearningTemplate() {
  const doc = createEmptyDocument('Guided Learning & Interactive Course', 'education_guided_learning');
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Learning Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'lesson_card',
        type: 'CardWidget',
        name: 'Interactive Module',
        props: { title: 'Module 3: Design Tokens & Contrast', subtitle: 'Interactive Exercise & Verification' },
        children: [
          {
            id: 'lesson_text',
            type: 'Text',
            name: 'Lesson Guide',
            props: { content: 'Calculate relative luminance using sRGB IEC 61966-2-1 coefficients.', variant: 'body' }
          },
          {
            id: 'check_answer_btn',
            type: 'Button',
            name: 'Check Solution',
            props: { label: 'Validate Challenge Answer', variant: 'primary' }
          }
        ]
      }
    ]
  };
  return doc;
}

export function createMapsGeospatialTemplate() {
  const doc = createEmptyDocument('Geospatial & Map Studio', 'maps_geospatial');
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Geospatial Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'map_controls_card',
        type: 'CardWidget',
        name: 'Coordinate & Layer Inspector',
        props: { title: 'GIS Viewport Controls', subtitle: 'Projection: EPSG:4326 (WGS 84)' },
        children: [
          {
            id: 'coord_input',
            type: 'Input',
            name: 'Coordinate Lat/Long',
            props: { label: 'Target Latitude / Longitude', placeholder: '48.8566, 2.3522' }
          },
          {
            id: 'render_layer_btn',
            type: 'Button',
            name: 'Render Layer',
            props: { label: 'Overlay Vector Tile Layer', variant: 'primary' }
          }
        ]
      }
    ]
  };
  return doc;
}

export function createGameImmersiveTemplate() {
  const doc = createEmptyDocument('Immersive HUD & State Display', 'game_immersive');
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Immersive Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'hud_stats_card',
        type: 'CardWidget',
        name: 'Player Status & Telemetry',
        props: { title: 'Combat & Systems HUD', subtitle: 'Engine FPS: 144 · VRAM: 3.2 GB' },
        children: [
          {
            id: 'metric_hp',
            type: 'MetricChip',
            name: 'Health Metric',
            props: { label: 'Shield Integrity', value: '100%', trend: 'Nominal', status: 'nominal' }
          }
        ]
      }
    ]
  };
  return doc;
}

export function createKioskXrTemplate() {
  const doc = createEmptyDocument('Kiosk, TV & Wearable Interface', 'kiosk_tv_wearable_xr');
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Kiosk Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'touch_target_card',
        type: 'CardWidget',
        name: 'High-Target Touch Surface',
        props: { title: 'Self-Service Touch Terminal', subtitle: 'Minimum 48px tap targets with high contrast outlines' },
        children: [
          {
            id: 'kiosk_checkin_btn',
            type: 'Button',
            name: 'Start Check-In',
            props: { label: 'Tap Here to Begin Check-in', variant: 'primary', size: 'large' }
          }
        ]
      }
    ]
  };
  return doc;
}

export function createMarketingLandingTemplate() {
  const doc = createEmptyDocument('Marketing Landing & Product Showcase', 'marketing_landing');
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Landing Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'hero_card',
        type: 'CardWidget',
        name: 'Hero Billboard',
        props: { title: 'Contract-Driven Desktop Designing', subtitle: 'From UX Handbook to Native Compose & PyQt Code' },
        children: [
          {
            id: 'cta_button',
            type: 'Button',
            name: 'Call to Action',
            props: { label: 'Get Started with Sanctum Studio', variant: 'primary', size: 'large' }
          }
        ]
      }
    ]
  };
  return doc;
}

export function createContentPublishingTemplate() {
  const doc = createEmptyDocument('Documentation & Publishing Studio', 'content_publishing_docs');
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Docs Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'docs_reader_card',
        type: 'CardWidget',
        name: 'Documentation Reader',
        props: { title: 'Design Process & Architecture Spec', subtitle: 'Version 1.0.6 · Last updated today' },
        children: [
          {
            id: 'doc_body_text',
            type: 'Text',
            name: 'Prose Content',
            props: { content: 'Contract verification ensures that no UI action claims completion without verifiable proof.', variant: 'body' }
          }
        ]
      }
    ]
  };
  return doc;
}

export function createTransactionCommerceTemplate() {
  const doc = createEmptyDocument('Commerce & Booking Checkout', 'transaction_booking_commerce');
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Commerce Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'checkout_card',
        type: 'CardWidget',
        name: 'Order Summary & Payment Gate',
        props: { title: 'Secure Checkout', subtitle: 'Zero hidden transaction fees' },
        children: [
          {
            id: 'checkout_btn',
            type: 'Button',
            name: 'Confirm Order',
            props: { label: 'Confirm and Authorize Payment', variant: 'primary', size: 'large' }
          }
        ]
      }
    ]
  };
  return doc;
}

export function createConsumerUtilityTemplate() {
  const doc = createEmptyDocument('System Tray & Quick Utility', 'consumer_utility');
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Utility Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'utility_card',
        type: 'CardWidget',
        name: 'Quick Action Center',
        props: { title: 'System Tray Hub', subtitle: 'Local GPU, daemon status, and fast toggles' },
        children: [
          {
            id: 'guard_toggle',
            type: 'Toggle',
            name: 'Guard Toggle',
            props: { label: 'Enforce Local Byte Verification', checked: true }
          }
        ]
      }
    ]
  };
  return doc;
}
