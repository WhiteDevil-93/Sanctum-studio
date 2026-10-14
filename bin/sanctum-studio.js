#!/usr/bin/env node
/**
 * Sanctum Studio - Desktop Application Entry Point
 */

import { createStudioServer } from '../src/server/appServer.js';

const PORT = parseInt(process.env.SANCTUM_PORT || '4180', 10);
const server = createStudioServer();

server.listen(PORT, '127.0.0.1', () => {
  console.log(`=======================================================`);
  console.log(` Sanctum Studio Desktop Designing App & MCP Engine    `);
  console.log(` Based on the Sanctum UX Handbook (23 Subtype Presets) `);
  console.log(`=======================================================`);
  console.log(` Local Studio URL : http://127.0.0.1:${PORT}`);
  console.log(` MCP Server Binary: node bin/sanctum-mcp-server.js     `);
  console.log(` Press Ctrl+C to stop.`);
});
