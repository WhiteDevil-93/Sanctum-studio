/**
 * Sanctum Studio - PyQt6 / PySide6 (Python) Code Exporter
 * Recursive AST Compiler translating design trees to Python PyQt6 CardWidgets
 * Reference: HypnoForge UI CardWidget & Styling Rules
 */

export function exportToPyQt(doc) {
  const className = (doc.meta?.title || 'Sanctum').replace(/[^a-zA-Z0-9]/g, '') + 'Page';
  const tokens = doc.tokens?.foundation?.color || {};

  let widgetCounter = 0;
  const initStatements = [];

  function compileNode(node, parentLayout = 'main_layout') {
    if (!node) return;
    const p = node.props || {};
    const varName = `w_${node.type.toLowerCase()}_${++widgetCounter}`;

    switch (node.type) {
      case 'AppShell':
        if (node.children) {
          node.children.forEach(c => compileNode(c, parentLayout));
        }
        break;

      case 'CardWidget':
        initStatements.push(`        # Card: ${p.title || node.name || 'Card'}`);
        initStatements.push(`        self.${varName} = CardWidget(title="${p.title || node.name || 'Card'}", subtitle="${p.subtitle || ''}")`);
        initStatements.push(`        ${parentLayout}.addWidget(self.${varName})`);
        if (node.children && node.children.length > 0) {
          node.children.forEach(c => compileNode(c, `self.${varName}.content_layout`));
        }
        break;

      case 'Button':
        const isPrimary = p.variant === 'primary';
        const bg = isPrimary ? (tokens.violet || '#9A8CFF') : (tokens.slate || '#1A1D26');
        const fg = isPrimary ? '#0B0C10' : '#ECEEF5';
        initStatements.push(`        self.${varName} = QPushButton("${p.label || 'Action'}")`);
        initStatements.push(`        self.${varName}.setMinimumHeight(44)`);
        initStatements.push(`        self.${varName}.setCursor(Qt.CursorShape.PointingHandCursor)`);
        initStatements.push(`        self.${varName}.setStyleSheet("background-color: ${bg}; color: ${fg}; font-weight: 600; border-radius: 6px; padding: 8px 16px;")`);
        initStatements.push(`        self.${varName}.clicked.connect(self._on_execute)`);
        initStatements.push(`        ${parentLayout}.addWidget(self.${varName})`);
        break;

      case 'Input':
        initStatements.push(`        self.${varName}_lbl = QLabel("${p.label || 'Input'}:")`);
        initStatements.push(`        self.${varName}_lbl.setStyleSheet("color: #9090a2; font-size: 11px;")`);
        initStatements.push(`        ${parentLayout}.addWidget(self.${varName}_lbl)`);
        initStatements.push(`        self.${varName} = QLineEdit()`);
        initStatements.push(`        self.${varName}.setPlaceholderText("${p.placeholder || ''}")`);
        initStatements.push(`        self.${varName}.setStyleSheet("background-color: #0b0c10; border: 1px solid #282836; border-radius: 4px; padding: 6px; color: #eceef5;")`);
        initStatements.push(`        ${parentLayout}.addWidget(self.${varName})`);
        break;

      case 'RiskGuardBanner':
        initStatements.push(`        self.${varName} = QFrame()`);
        initStatements.push(`        self.${varName}.setStyleSheet("background-color: rgba(244, 123, 116, 0.12); border-left: 3px solid #f47b74; border-radius: 4px; padding: 8px;")`);
        initStatements.push(`        ${varName}_layout = QVBoxLayout(self.${varName})`);
        initStatements.push(`        ${varName}_title = QLabel("⚠️ ${p.title || 'Risk Guard Active'}")`);
        initStatements.push(`        ${varName}_title.setStyleSheet("color: #f47b74; font-weight: 600;")`);
        initStatements.push(`        ${varName}_layout.addWidget(${varName}_title)`);
        initStatements.push(`        ${varName}_msg = QLabel("${p.message || ''}")`);
        initStatements.push(`        ${varName}_msg.setStyleSheet("color: #9090a2; font-size: 11px;")`);
        initStatements.push(`        ${varName}_layout.addWidget(${varName}_msg)`);
        initStatements.push(`        ${parentLayout}.addWidget(self.${varName})`);
        break;

      case 'MetricChip':
        initStatements.push(`        self.${varName} = QFrame()`);
        initStatements.push(`        self.${varName}.setStyleSheet("background-color: #13151c; border: 1px solid #272b37; border-radius: 6px; padding: 8px;")`);
        initStatements.push(`        ${varName}_l = QVBoxLayout(self.${varName})`);
        initStatements.push(`        ${varName}_lbl = QLabel("${p.label || 'Metric'}")`);
        initStatements.push(`        ${varName}_lbl.setStyleSheet("color: #9090a2; font-size: 11px;")`);
        initStatements.push(`        ${varName}_val = QLabel("${p.value || '100%'}")`);
        initStatements.push(`        ${varName}_val.setStyleSheet("color: #5eead4; font-size: 18px; font-weight: 700;")`);
        initStatements.push(`        ${varName}_l.addWidget(${varName}_lbl)`);
        initStatements.push(`        ${varName}_l.addWidget(${varName}_val)`);
        initStatements.push(`        ${parentLayout}.addWidget(self.${varName})`);
        break;

      case 'DataTable':
        initStatements.push(`        self.${varName} = QTableWidget()`);
        initStatements.push(`        self.${varName}.setColumnCount(${(p.columns || []).length})`);
        initStatements.push(`        self.${varName}.setHorizontalHeaderLabels(${JSON.stringify(p.columns || [])})`);
        initStatements.push(`        self.${varName}.setStyleSheet("background-color: #101014; border: 1px solid #282836; color: #eceef5;")`);
        initStatements.push(`        ${parentLayout}.addWidget(self.${varName})`);
        break;

      case 'Text':
        initStatements.push(`        self.${varName} = QLabel("${p.content || ''}")`);
        initStatements.push(`        self.${varName}.setStyleSheet("color: #eceef5; font-size: 13px;")`);
        initStatements.push(`        ${parentLayout}.addWidget(self.${varName})`);
        break;

      case 'Toggle':
        initStatements.push(`        self.${varName} = QCheckBox("${p.label || 'Toggle'}")`);
        initStatements.push(`        self.${varName}.setChecked(${p.checked ? 'True' : 'False'})`);
        initStatements.push(`        self.${varName}.setStyleSheet("color: #eceef5;")`);
        initStatements.push(`        ${parentLayout}.addWidget(self.${varName})`);
        break;

      case 'ApprovalGateCard':
        initStatements.push(`        # Approval Gate Card`);
        initStatements.push(`        self.${varName} = CardWidget(title="${p.title || 'Tool Approval Required'}", subtitle="Tool: ${p.tool || 'Action'}")`);
        initStatements.push(`        self.${varName}_btn = QPushButton("Approve Tool Execution")`);
        initStatements.push(`        self.${varName}_btn.setMinimumHeight(44)`);
        initStatements.push(`        self.${varName}_btn.setStyleSheet("background-color: #5eead4; color: #0b0c10; font-weight: 600; border-radius: 6px; padding: 8px 16px;")`);
        initStatements.push(`        self.${varName}_btn.clicked.connect(self._on_execute)`);
        initStatements.push(`        self.${varName}.add_widget(self.${varName}_btn)`);
        initStatements.push(`        ${parentLayout}.addWidget(self.${varName})`);
        break;

      default:
        if (node.children) {
          node.children.forEach(c => compileNode(c, parentLayout));
        }
    }
  }

  compileNode(doc.masterPrototype, 'main_layout');

  if (!initStatements.some(s => s.includes('.setMinimumHeight(44)'))) {
    initStatements.push(`        self.exec_button = QPushButton("Execute Workflow")`);
    initStatements.push(`        self.exec_button.setMinimumHeight(44)`);
    initStatements.push(`        self.exec_button.clicked.connect(self._on_execute)`);
    initStatements.push(`        main_layout.addWidget(self.exec_button)`);
  }

  return `# =====================================================================
# Generated by Sanctum Studio - PyQt6 Target (CardWidget Architecture)
# Title: ${doc.meta?.title || 'Untitled'} (${doc.meta?.subtype || 'custom'})
# Generated at: ${new Date().toISOString()}
# =====================================================================

from PyQt6.QtCore import Qt, pyqtSignal
from PyQt6.QtWidgets import (
    QWidget, QVBoxLayout, QHBoxLayout, QLabel,
    QPushButton, QFrame, QLineEdit, QCheckBox, QTableWidget
)

class CardWidget(QFrame):
    """Elevated Card Frame conforming to HypnoForge Aesthetic Standards."""
    def __init__(self, title: str = "", subtitle: str = "", parent=None):
        super().__init__(parent)
        self.setObjectName("card")
        self.setStyleSheet("""
            QFrame#card {
                background-color: ${tokens.slate || '#191920'};
                border: 1px solid ${tokens.border || '#282836'};
                border-radius: 8px;
            }
            QLabel {
                background-color: transparent;
            }
        """)
        self._layout = QVBoxLayout(self)
        self._layout.setContentsMargins(16, 16, 16, 16)
        self._layout.setSpacing(10)

        if title:
            self.title_label = QLabel(title)
            self.title_label.setStyleSheet("font-size: 15px; font-weight: 600; color: #e8e8ed;")
            self._layout.addWidget(self.title_label)

        if subtitle:
            self.subtitle_label = QLabel(subtitle)
            self.subtitle_label.setStyleSheet("font-size: 12px; color: #9090a2;")
            self._layout.addWidget(self.subtitle_label)

        self.content_widget = QWidget()
        self.content_widget.setObjectName("cardContent")
        self.content_widget.setStyleSheet("background-color: transparent;")
        self.content_layout = QVBoxLayout(self.content_widget)
        self.content_layout.setContentsMargins(0, 0, 0, 0)
        self.content_layout.setSpacing(8)
        self._layout.addWidget(self.content_widget)

    def add_widget(self, widget: QWidget):
        self.content_layout.addWidget(widget)


class ${className}(QWidget):
    """Generated Page View for ${doc.meta?.title || 'Page'}"""
    action_submitted = pyqtSignal(str)

    def __init__(self, parent=None):
        super().__init__(parent)
        self.setObjectName("${className}")
        self.setStyleSheet("background-color: ${tokens.obsidian || '#0d0d11'}; color: #e8e8ed;")

        main_layout = QVBoxLayout(self)
        main_layout.setContentsMargins(16, 16, 16, 16)
        main_layout.setSpacing(16)

        # Header Card
        self.header_card = CardWidget(
            title="${doc.meta?.title || 'Screen'}",
            subtitle="Subtype: ${doc.meta?.subtype || 'custom'} · Guaranteed 100-200% Scaling"
        )
        main_layout.addWidget(self.header_card)

        # Recursively Compiled Layout AST
${initStatements.join('\n')}

        main_layout.addStretch()

    def _on_execute(self):
        self.action_submitted.emit("EXECUTE_PRIMARY_TASK")
`;
}
