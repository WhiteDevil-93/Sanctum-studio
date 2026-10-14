/**
 * Sanctum Studio - DTCG 2025.10 Tokens & CSS Custom Properties Exporter
 */

import { TokenManager } from '../tokens/tokenManager.js';

export function exportToDtcgTokens(doc) {
  const manager = new TokenManager(doc.tokens);
  return {
    tokensJson: JSON.stringify(manager.toDTCG(), null, 2),
    tokensCss: manager.toCSS()
  };
}
