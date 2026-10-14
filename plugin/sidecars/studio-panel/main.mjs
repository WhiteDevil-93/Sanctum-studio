/**
 * Sanctum Studio - Antigravity UI Extension Sidecar Runner
 */

import { createStudioServer } from '../../../src/server/appServer.js';

const PORT = parseInt(process.env.SIDECAR_PORT || process.env.PORT || '4180', 10);
const server = createStudioServer();

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[SanctumStudioSidecar] Listening on 127.0.0.1:${PORT}`);
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
