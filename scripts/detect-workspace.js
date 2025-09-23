#!/usr/bin/env node

/**
 * Workspace Detection Script
 * 
 * This script detects if the package is running in a workspace context
 * and provides appropriate configuration for both standalone and workspace usage.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function detectWorkspace() {
  // Check if we're in a workspace by looking for common workspace indicators
  const indicators = [
    'pnpm-workspace.yaml',
    'lerna.json',
    'nx.json',
    'rush.json',
    '.yarnrc.yml'
  ];
  
  let currentDir = process.cwd();
  let workspaceRoot = null;
  
  // Walk up the directory tree looking for workspace indicators
  while (currentDir !== path.dirname(currentDir)) {
    for (const indicator of indicators) {
      if (fs.existsSync(path.join(currentDir, indicator))) {
        workspaceRoot = currentDir;
        break;
      }
    }
    if (workspaceRoot) break;
    currentDir = path.dirname(currentDir);
  }
  
  return {
    isWorkspace: !!workspaceRoot,
    workspaceRoot,
    packageDir: process.cwd()
  };
}

const workspaceInfo = detectWorkspace();

console.log('Workspace Detection Results:');
console.log(`Is Workspace: ${workspaceInfo.isWorkspace}`);
console.log(`Workspace Root: ${workspaceInfo.workspaceRoot || 'N/A'}`);
console.log(`Package Directory: ${workspaceInfo.packageDir}`);

// Export for use in other scripts
export default workspaceInfo;
