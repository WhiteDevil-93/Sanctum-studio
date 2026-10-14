/**
 * Sanctum Studio - Creative & Document Editor Preset Template
 * Inspired by HypnoForge Creative Suite & DaVinci Resolve Studio patterns
 */

import { createEmptyDocument } from '../ast/schema.js';

export function createCreativeEditorTemplate() {
  const doc = createEmptyDocument('Creative PMV Studio', 'creative_document_editor');

  doc.masterPrototype = {
    id: 'root',
    type: 'AppShell',
    name: 'Creative Studio Shell',
    props: {
      workflow: 'PMV Beat Sync',
      containerQueries: true
    },
    children: [
      {
        id: 'top_identity_bar',
        type: 'IdentityBar',
        name: 'Studio Control Bar',
        props: {
          title: 'Project: Cybernetic Trance 01',
          workflowBadge: 'PMV Active',
          badgeColor: '#e056fd',
          controls: ['preset_select', 'kit_select', 'reload', 'save', 'render']
        }
      },
      {
        id: 'editor_stage',
        type: 'WorkspaceContainer',
        name: 'Editor Stage Area',
        props: { layout: 'stage_and_inspector' },
        children: [
          {
            id: 'viewport_timeline_column',
            type: 'ViewportColumn',
            name: 'Preview & Timeline Column',
            children: [
              {
                id: 'video_preview_card',
                type: 'CardWidget',
                name: 'Live Video Viewport',
                props: { title: 'Playback Monitor', elevation: 'card' },
                children: [
                  {
                    id: 'video_screen',
                    type: 'CanvasDisplay',
                    props: { aspectRatio: '16:9', placeholder: 'Preview Stage (1080p 60fps)' }
                  }
                ]
              },
              {
                id: 'beat_timeline_card',
                type: 'CardWidget',
                name: 'Beat Sync Timeline',
                props: { title: 'Multi-Track Beat Grid', elevation: 'card' },
                children: [
                  {
                    id: 'waveform_track',
                    type: 'WaveformTrack',
                    props: { bpm: 128, transients: 48, syncMode: 'Drop Lock' }
                  }
                ]
              }
            ]
          },
          {
            id: 'inspector_sidebar',
            type: 'InspectorColumn',
            name: 'Properties Inspector',
            props: { widthEm: '22em' },
            children: [
              {
                id: 'clip_params_card',
                type: 'CardWidget',
                name: 'Clip FX Inspector',
                props: { title: 'Cut & Strobe Parameters' },
                children: [
                  { id: 'cut_interval', type: 'FormRow', props: { label: 'Cut Interval', widget: 'SpinBox', value: '4 beats' } },
                  { id: 'motion_blur', type: 'FormRow', props: { label: 'Motion Blur', widget: 'Slider', value: '0.45' } },
                  { id: 'color_grade', type: 'FormRow', props: { label: 'LUT Preset', widget: 'Dropdown', value: 'Neon Obsidian' } }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  return doc;
}
