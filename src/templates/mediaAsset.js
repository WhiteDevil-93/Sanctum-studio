/**
 * Sanctum Studio - Media Library & Asset Manager Template
 */

import { createEmptyDocument } from '../ast/schema.js';

export function createMediaAssetTemplate() {
  const doc = createEmptyDocument('Media Library & Assets', 'media_library_asset_management');
  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Media Manager Shell',
    props: { containerQueries: true },
    children: [
      {
        id: 'filter_header_card',
        type: 'CardWidget',
        name: 'Asset Filters & Ingestion',
        props: { title: 'Asset Vault', subtitle: 'Aspect-ratio locked catalog with provenance tags' },
        children: [
          {
            id: 'search_input',
            type: 'Input',
            name: 'Search Assets',
            props: { label: 'Search by tag or model hash', placeholder: 'e.g. wan2.2, comfy-clip, 4k-upscale' }
          },
          {
            id: 'upload_asset_btn',
            type: 'Button',
            name: 'Ingest Asset',
            props: { label: 'Ingest Asset Pack', variant: 'primary' }
          }
        ]
      },
      {
        id: 'asset_catalog_card',
        type: 'CardWidget',
        name: 'Media Gallery Grid',
        props: { title: 'Cached Assets', subtitle: '48 items indexed across local workspace' },
        children: [
          {
            id: 'asset_table',
            type: 'DataTable',
            name: 'Assets Table',
            props: {
              columns: ['Thumbnail', 'Filename', 'Resolution', 'Codec', 'File Size', 'Status']
            }
          }
        ]
      }
    ]
  };
  return doc;
}
