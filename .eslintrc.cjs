const fs = require('fs');
const path = require('path');

// Check if we're in a workspace by looking for the shared ESLint config
function isInWorkspace() {
  const workspaceRoot = path.resolve(__dirname, '../../..');
  const sharedConfigPath = path.join(workspaceRoot, 'packages/eslint-config/default.cjs');
  return fs.existsSync(sharedConfigPath);
}

// Base configuration for standalone mode
const standaloneConfig = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};

// Workspace configuration that extends the shared config
const workspaceConfig = {
  root: true,
  extends: ['@repo/eslint-config/default.cjs'],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      env: { browser: true, es2020: true },
      plugins: ['react-refresh'],
      rules: {
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
      },
    },
  ],
};

module.exports = isInWorkspace() ? workspaceConfig : standaloneConfig;