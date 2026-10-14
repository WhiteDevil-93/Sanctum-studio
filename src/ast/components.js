/**
 * Sanctum Studio - Visual Component Library & Definitions
 * Catalog of Atoms, Molecules, and Organisms for "Build Your Own" Canvas
 */

export const COMPONENT_CATEGORIES = {
  ATOMS: 'atoms',
  MOLECULES: 'molecules',
  ORGANISMS: 'organisms'
};

// Common "appearance" props every block carries, so every asset in the
// inspector has meaningful controls (alignment, size, spacing, colour, shape, surface).
const COMMON_PROPS = {
  alignment: 'left',      // 'left' | 'center' | 'right' | 'stretch'
  widthPct: 100,          // 10-100, percentage of parent width
  gap: 8,                 // spacing between children (px)
  padding: 16,            // internal padding (px)
  accentColor: null,      // null = theme accent, else hex override
  // --- Shape ---
  radius: 8,              // 0-32 corner radius (px)
  // --- Surface / fill ---
  fill: null,             // null = transparent/theme surface, else hex
  texture: 'flat',        // 'flat' | 'dotgrid' | 'scanlines' | 'gradient'
  // --- Border ---
  borderWidth: 1,         // 0-8 (px), 0 = none
  borderColor: null,      // null = theme border, else hex
  // --- Text decoration (applies to any text this block renders) ---
  bold: false,
  italic: false,
  underline: false
};

// Props that containers use for their OWN surface (fill/texture apply to the
// box the block draws, which for containers is the card/section body).
const CONTAINER_PROPS = { ...COMMON_PROPS };

export const COMPONENT_DEFINITIONS = {
  // --- ATOMS ---
  button: {
    type: 'Button',
    category: COMPONENT_CATEGORIES.ATOMS,
    name: 'Action Button',
    description: 'Interactive button with contract-driven variants',
    defaultProps: {
      label: 'Execute Action',
      variant: 'primary', // 'primary', 'secondary', 'danger', 'ghost'
      size: 'medium',     // 'small', 'medium', 'large'
      stateBinding: 'ready', // which state activates or shows it
      disabled: false,
      ...COMMON_PROPS
    }
  },
  input: {
    type: 'Input',
    category: COMPONENT_CATEGORIES.ATOMS,
    name: 'Text Input',
    description: 'Single-line text input with label and validation',
    defaultProps: {
      label: 'Input Field',
      placeholder: 'Enter parameter value...',
      helperText: 'Required configuration',
      disabled: false,
      ...COMMON_PROPS
    }
  },
  badge: {
    type: 'Badge',
    category: COMPONENT_CATEGORIES.ATOMS,
    name: 'Status Badge',
    description: 'Compact status pill or metric counter',
    defaultProps: {
      text: 'READY',
      variant: 'info', // 'info', 'success', 'warning', 'danger'
      ...COMMON_PROPS
    }
  },
  toggle: {
    type: 'Toggle',
    category: COMPONENT_CATEGORIES.ATOMS,
    name: 'Toggle Switch',
    description: 'Binary setting toggle switch',
    defaultProps: {
      label: 'Enable Guard',
      checked: true,
      ...COMMON_PROPS
    }
  },
  text: {
    type: 'Text',
    category: COMPONENT_CATEGORIES.ATOMS,
    name: 'Typography',
    description: 'Header, paragraph, or caption element',
    defaultProps: {
      content: 'Contract-verified layout block.',
      variant: 'body', // 'h1', 'h2', 'h3', 'body', 'caption'
      textSize: 16,    // px, overrides the variant default
      textColor: null, // null = theme text colour
      weight: 400,     // 300-800
      ...COMMON_PROPS
    }
  },
  divider: {
    type: 'Divider',
    category: COMPONENT_CATEGORIES.ATOMS,
    name: 'Divider',
    description: 'Horizontal rule that separates grouped blocks',
    defaultProps: {
      thickness: 1,     // px
      color: null,      // null = theme border colour
      ...COMMON_PROPS
    }
  },

  // --- MOLECULES ---
  section: {
    type: 'Section',
    category: COMPONENT_CATEGORIES.MOLECULES,
    name: 'Section Group',
    description: 'Titled container that stacks child blocks on a shared spacing rhythm — the workhorse for composing custom layouts',
    isContainer: true,
    defaultProps: {
      title: 'Section',
      showTitle: true,
      layout: 'column', // 'column' | 'row'
      ...COMMON_PROPS
    }
  },
  card_widget: {
    type: 'CardWidget',
    category: COMPONENT_CATEGORIES.MOLECULES,
    name: 'Card Widget',
    description: 'Elevated container with header and nested children',
    isContainer: true,
    defaultProps: {
      title: 'Workflow Card',
      subtitle: 'Bounded task context',
      elevation: 'elevated', // 'flat', 'elevated', 'outlined'
      ...COMMON_PROPS
    }
  },
  risk_guard: {
    type: 'RiskGuardBanner',
    category: COMPONENT_CATEGORIES.MOLECULES,
    name: 'Risk Guard Banner',
    description: 'Amber/crimson guard banner protecting destructive or costly tasks',
    defaultProps: {
      title: 'Spend & Safety Guard Active',
      message: 'Zero unverified closures. Local disk byte verification enforced.',
      severity: 'warning', // 'info', 'warning', 'danger'
      ...COMMON_PROPS
    }
  },
  metric_chip: {
    type: 'MetricChip',
    category: COMPONENT_CATEGORIES.MOLECULES,
    name: 'Metric Chip',
    description: 'Key performance indicator with unit and trend',
    defaultProps: {
      label: 'GPU Cluster Load',
      value: '74.2%',
      trend: '+2.1%',
      status: 'nominal', // 'nominal', 'pending_review', 'warning', 'critical'
      ...COMMON_PROPS
    }
  },
  diff_harness: {
    type: 'DiffHarness',
    category: COMPONENT_CATEGORIES.MOLECULES,
    name: 'Diff Harness',
    description: 'Side-by-side or inline code/state diff comparison harness',
    defaultProps: {
      sourceLabel: 'Proposed Delta',
      targetLabel: 'Active Baseline',
      status: 'pending_review',
      ...COMMON_PROPS
    }
  },

  // --- ORGANISMS ---
  task_rack: {
    type: 'TaskRack',
    category: COMPONENT_CATEGORIES.ORGANISMS,
    name: 'Task Rack',
    description: 'Multi-column pipeline rack for orchestration and delegation',
    isContainer: true,
    defaultProps: {
      columns: ['Queued', 'In Flight', 'Verification Gate', 'Done'],
      activeTaskCount: 3,
      ...COMMON_PROPS
    }
  },
  data_table: {
    type: 'DataTable',
    category: COMPONENT_CATEGORIES.ORGANISMS,
    name: 'Data Table',
    description: 'Accessible paginated data grid with sorting and selection',
    defaultProps: {
      columns: ['Task ID', 'Assigned Agent', 'State', 'Progress', 'Actions'],
      rowCount: 4,
      ...COMMON_PROPS
    }
  },
  timeline_track: {
    type: 'TimelineTrack',
    category: COMPONENT_CATEGORIES.ORGANISMS,
    name: 'Timeline Track',
    description: 'Beat-synced media track with clip markers and playhead',
    defaultProps: {
      durationSeconds: 120,
      bpm: 128,
      markerCount: 6,
      ...COMMON_PROPS
    }
  }
};

/**
 * Creates a unique component instance from a definition key
 */
export function createComponentInstance(defKey, customProps = {}) {
  const def = COMPONENT_DEFINITIONS[defKey];
  if (!def) {
    throw new Error(`Unknown component definition '${defKey}'`);
  }

  const id = `cmp_${defKey}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
  return {
    id,
    type: def.type,
    name: def.name,
    category: def.category,
    props: {
      ...def.defaultProps,
      ...customProps
    },
    children: def.isContainer ? [] : undefined
  };
}

/**
 * Recursively find a node by ID in the AST tree
 */
export function findNodeById(root, id) {
  if (!root) return null;
  if (root.id === id) return root;
  if (root.children && Array.isArray(root.children)) {
    for (const child of root.children) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Recursively find the parent of a node by ID
 */
export function findParentNode(root, id) {
  if (!root || !root.children) return null;
  for (const child of root.children) {
    if (child.id === id) return root;
    const found = findParentNode(child, id);
    if (found) return found;
  }
  return null;
}

/**
 * Recursively remove a node by ID
 */
export function removeNodeById(root, id) {
  if (!root || !root.children) return false;
  const idx = root.children.findIndex(c => c.id === id);
  if (idx !== -1) {
    root.children.splice(idx, 1);
    return true;
  }
  for (const child of root.children) {
    if (removeNodeById(child, id)) return true;
  }
  return false;
}
