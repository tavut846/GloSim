#!/usr/bin/env node

/**
 * GloSim Version Bump Utility
 * 
 * Synchronizes version updates across package.json, frontend/package.json,
 * and backend/package.json.
 * 
 * Usage:
 *   node scripts/bump-version.js <new-version>
 * Example:
 *   node scripts/bump-version.js 0.0.1
 */

const fs = require('fs');
const path = require('path');

const newVersion = process.argv[2];

if (!newVersion) {
  console.error('Usage: node scripts/bump-version.js <new-version>');
  console.error('Example: node scripts/bump-version.js 0.0.1');
  process.exit(1);
}

// Validate semver-like format
if (!/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(newVersion)) {
  console.error(`Invalid version format: "${newVersion}". Expected semver e.g. 0.0.1`);
  process.exit(1);
}

const rootDir = path.resolve(__dirname, '..');
const filesToUpdate = [
  path.join(rootDir, 'package.json'),
  path.join(rootDir, 'frontend', 'package.json'),
  path.join(rootDir, 'backend', 'package.json')
];

for (const filePath of filesToUpdate) {
  if (fs.existsSync(filePath)) {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const oldVersion = content.version;
    content.version = newVersion;
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf8');
    console.log(`Updated ${path.relative(rootDir, filePath)}: ${oldVersion} -> ${newVersion}`);
  }
}

console.log(`\nSuccessfully bumped GloSim version to ${newVersion}`);
