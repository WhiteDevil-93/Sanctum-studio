/**
 * Sanctum Studio - Automated QA & Accessibility Auditor
 * Reference: docs/design/sanctum-ux/VALIDATION_AND_HANDOFF.md
 */

import { TokenManager } from '../tokens/tokenManager.js';

export function runFullQaAudit(doc) {
  const reports = [];
  const tokenManager = new TokenManager(doc.tokens);

  // 1. Contrast Audit for all themes
  const themes = ['dark', 'light', 'highContrast'];
  for (const theme of themes) {
    const themeContrasts = tokenManager.evaluateThemeContrast(theme);
    for (const item of themeContrasts) {
      reports.push({
        id: `contrast_${theme}_${item.surface}_${item.foreground}`,
        category: 'Accessibility / Contrast',
        check: `${theme.toUpperCase()}: ${item.foreground} on ${item.surface}`,
        ratio: item.ratio,
        expected: '≥ 4.5:1 (text) or ≥ 3.0:1 (controls)',
        observed: `${item.ratio}:1 (${item.foregroundHex} on ${item.surfaceHex})`,
        result: item.pass ? 'PASS' : 'FAIL',
        evidence: `Computed WCAG relative luminance level: ${item.level}`
      });
    }
  }

  // 2. State Completeness Audit
  const declaredStates = doc.stateModel?.states || [];
  const requiredStates = ['ready', 'submission_pending', 'accepted', 'completed', 'failed'];
  for (const reqState of requiredStates) {
    const present = declaredStates.includes(reqState);
    reports.push({
      id: `state_${reqState}`,
      category: 'Contract / State Completeness',
      check: `Required state '${reqState}' declared in state model`,
      expected: 'State declared with transition and error/recovery evidence',
      observed: present ? `State '${reqState}' present` : `Missing state '${reqState}'`,
      result: present ? 'PASS' : 'FAIL',
      evidence: present ? `Included in stateModel.states` : `UNVERIFIED / Missing from FSM`
    });
  }

  // 3. Scaling & Layout Resilience Audit (100% / 150% / 200%)
  const hasScaledScenarios = (doc.scenarios || []).some(s => s.scale >= 1.5);
  reports.push({
    id: 'scaling_resilience',
    category: 'Layout / Scaling',
    check: 'Scenarios include ≥ 150% scaled viewport checks',
    expected: 'At least one scenario testing 150% or 200% scaling without clipped controls',
    observed: hasScaledScenarios ? 'Scaled scenarios configured' : 'Only 100% scale tested',
    result: hasScaledScenarios ? 'PASS' : 'FAIL',
    evidence: `Scenarios: ${(doc.scenarios || []).map(s => `${s.scale}x`).join(', ')}`
  });

  // Calculate summary counts
  const total = reports.length;
  const passed = reports.filter(r => r.result === 'PASS').length;
  const failed = reports.filter(r => r.result === 'FAIL').length;

  return {
    docTitle: doc.meta.title,
    subtype: doc.meta.subtype,
    summary: { total, passed, failed, passRate: `${Math.round((passed / total) * 100)}%` },
    reports
  };
}
