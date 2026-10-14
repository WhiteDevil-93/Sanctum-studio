/**
 * Sanctum Studio - Analytics & Metric Dashboard Template
 */

import { createEmptyDocument } from '../ast/schema.js';

export function createAnalyticsDashboardTemplate() {
  const doc = createEmptyDocument('Analytics & Metrics Dashboard', 'analytics_dashboard');
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Analytics Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'kpi_row',
        type: 'CardWidget',
        name: 'Key Performance Indicators',
        props: { title: 'Executive Overview', subtitle: 'Aggregated over past 24 hours' },
        children: [
          {
            id: 'metric_token_spend',
            type: 'MetricChip',
            name: 'Token Spend',
            props: { label: 'API Spend', value: '$12.45', trend: '-14% vs avg', status: 'nominal' }
          },
          {
            id: 'metric_task_success',
            type: 'MetricChip',
            name: 'Task Success Rate',
            props: { label: 'Verification Pass Rate', value: '99.4%', trend: '+0.2%', status: 'nominal' }
          }
        ]
      },
      {
        id: 'data_breakdown_card',
        type: 'CardWidget',
        name: 'Traffic & Query Explorer',
        props: { title: 'Dimension Analysis', subtitle: 'Breakdown by model endpoint & latency tier' },
        children: [
          {
            id: 'analytics_table',
            type: 'DataTable',
            name: 'Performance Grid',
            props: {
              columns: ['Endpoint', 'P50 Latency', 'P99 Latency', 'Error Rate', 'Cost / 1k Tokens']
            }
          }
        ]
      }
    ]
  };
  return doc;
}
