/**
 * Sanctum Studio - Operations & Background Queue Templates
 * Reference: INTERFACE_PATTERNS.md (Operations Monitoring & Render Farm)
 */

import { createEmptyDocument } from '../ast/schema.js';

export function createOperationsQueueTemplate() {
  const doc = createEmptyDocument('Operations Queue Monitor', 'operations_monitoring_queue');
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Ops Monitor Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'top_metrics_banner',
        type: 'CardWidget',
        name: 'Worker Telemetry Banner',
        props: { title: 'Cluster Telemetry & Freshness', subtitle: 'Live sync heartbeat: 2s ago' },
        children: [
          {
            id: 'metric_active_jobs',
            type: 'MetricChip',
            name: 'Active Jobs',
            props: { label: 'Active Jobs', value: '14 running', trend: '3 queued', status: 'nominal' }
          },
          {
            id: 'metric_throughput',
            type: 'MetricChip',
            name: 'Throughput',
            props: { label: 'Throughput', value: '42 tasks/min', trend: '+8%', status: 'nominal' }
          }
        ]
      },
      {
        id: 'main_queue_card',
        type: 'CardWidget',
        name: 'Active Job Queue',
        props: { title: 'Live Execution Queue', subtitle: 'Sortable by priority & resource consumption' },
        children: [
          {
            id: 'queue_table',
            type: 'DataTable',
            name: 'Queue Grid',
            props: {
              columns: ['Job ID', 'Worker Node', 'Target Pipeline', 'Status', 'Runtime', 'Actions']
            }
          },
          {
            id: 'emergency_stop_btn',
            type: 'Button',
            name: 'Emergency Pause',
            props: { label: 'Emergency Pause All Workers', variant: 'danger', size: 'large' }
          }
        ]
      }
    ]
  };
  return doc;
}

export function createRenderFarmTemplate() {
  const doc = createEmptyDocument('Render Farm & GPU Manager', 'export_render_background_jobs');
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Render Farm Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'spend_guard',
        type: 'RiskGuardBanner',
        name: 'Spend & Verification Guard',
        props: {
          title: 'Idle Meter Watchdog Active',
          message: 'Cloud GPU idle for >30m will auto-stop. Local disk byte verification enforced.',
          severity: 'warning'
        }
      },
      {
        id: 'render_job_card',
        type: 'CardWidget',
        name: 'Active Render Batch',
        props: { title: 'ComfyUI / Wan2.2 Render Pipeline', subtitle: 'Target: A:\\ComfyUI\\renders\\instance_01' },
        children: [
          {
            id: 'render_task_rack',
            type: 'TaskRack',
            name: 'Render Stages',
            props: {
              columns: ['Prompt Ingest', 'GPU Inference', 'Byte Sync Verification', 'Instance Stopped']
            }
          },
          {
            id: 'verify_sync_btn',
            type: 'Button',
            name: 'Verify Local Sync',
            props: { label: 'Verify Byte-Size Match', variant: 'primary' }
          }
        ]
      }
    ]
  };
  return doc;
}
