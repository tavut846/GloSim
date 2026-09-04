#!/usr/bin/env node

/**
 * GloSim Version & Release Resolver
 * 
 * Determines version, pre-release tags, and generates rich release notes
 * following the project convention:
 * - Current version: e.g. 0.0.1
 * - Pre-release tags: 0.0.1-pre-1, 0.0.1-pre-2, etc.
 * - Increments pre-n when there is no new release version bump.
 * - Title of pre-release: GloSim <version/tag>
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const rootPkgPath = path.join(rootDir, 'package.json');
const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, 'utf8'));
const baseVersion = rootPkg.version || '0.0.1';

function runGit(cmd) {
  try {
    return execSync(cmd, { cwd: rootDir, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'], timeout: 3000 }).trim();
  } catch {
    return '';
  }
}

// 1. Fetch tags only in CI if explicitly available
if (process.env.CI && process.env.GITHUB_ACTIONS) {
  runGit('git fetch --tags --force');
}

// 2. Determine tag and release type
const githubRef = process.env.GITHUB_REF || '';
let tagName = '';
let isPrerelease = true;

if (githubRef.startsWith('refs/tags/')) {
  tagName = githubRef.replace('refs/tags/', '');
  isPrerelease = tagName.includes('-pre') || tagName.includes('-rc') || tagName.includes('-alpha') || tagName.includes('-beta');
} else {
  // Query all git tags matching <baseVersion>-pre-*
  const tagListOutput = runGit(`git tag -l "${baseVersion}-pre-*"`);
  const existingTags = tagListOutput
    ? tagListOutput.split(/\r?\n/).map(t => t.trim()).filter(Boolean)
    : [];

  const preNumbers = [];
  const regex = new RegExp(`^${baseVersion.replace(/\./g, '\\.')}-pre-(\\d+)$`);
  for (const tag of existingTags) {
    const match = tag.match(regex);
    if (match && match[1]) {
      preNumbers.push(parseInt(match[1], 10));
    }
  }

  const maxPre = preNumbers.length > 0 ? Math.max(...preNumbers) : 0;
  const nextPre = maxPre + 1;
  tagName = `${baseVersion}-pre-${nextPre}`;
  isPrerelease = true;
}

// Release Title: GloSim <version>
const releaseTitle = `GloSim ${tagName}`;

// 3. Extract commits and categorize for release notes
let prevTag = '';
if (isPrerelease && tagName.includes('-pre-')) {
  const match = tagName.match(/-pre-(\d+)$/);
  if (match) {
    const curNum = parseInt(match[1], 10);
    if (curNum > 1) {
      prevTag = `${baseVersion}-pre-${curNum - 1}`;
    }
  }
}

if (!prevTag) {
  // Try to find the most recent tag before HEAD
  const lastTag = runGit('git describe --tags --abbrev=0 HEAD~1');
  if (lastTag && lastTag !== tagName) {
    prevTag = lastTag;
  }
}

let commitLogRaw = '';
if (prevTag) {
  commitLogRaw = runGit(`git log ${prevTag}..HEAD --pretty=format:"%h%x09%s"`);
}
if (!commitLogRaw) {
  // Fallback to recent commits
  commitLogRaw = runGit('git log -n 15 --pretty=format:"%h%x09%s"');
}

const lines = commitLogRaw ? commitLogRaw.split(/\r?\n/).filter(Boolean) : [];
const features = [];
const fixes = [];
const improvements = [];
const others = [];

for (const line of lines) {
  const [hash, ...rest] = line.split('\t');
  const msg = rest.join('\t').trim();
  if (!msg) continue;

  const entry = `- **${msg}** (\`${hash}\`)`;
  const lower = msg.toLowerCase();
  if (lower.startsWith('feat') || lower.includes('feature:')) {
    features.push(entry);
  } else if (lower.startsWith('fix') || lower.includes('bugfix:')) {
    fixes.push(entry);
  } else if (lower.startsWith('perf') || lower.startsWith('refactor') || lower.startsWith('style')) {
    improvements.push(entry);
  } else {
    others.push(entry);
  }
}

// 4. Construct Markdown Release Notes
const buildDate = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
const commitSha = runGit('git rev-parse --short HEAD') || 'unknown';

let notes = `## ${releaseTitle}\n\n`;
notes += `> **Automated Pre-Release Build** · Tag: \`${tagName}\` · Commit: \`${commitSha}\` · Date: ${buildDate}\n\n`;

notes += `### 🚀 What's New & Feature Highlights\n\n`;
if (features.length > 0) {
  notes += `#### ✨ New Features\n${features.join('\n')}\n\n`;
} else {
  notes += `- **Bilingual Academic Conference Platform**: Chinese (zh) & English (en) localized Strapi CMS and React 18 SPA.\n`;
  notes += `- **Dynamic Dual Database**: SQLite out-of-the-box storage and external PostgreSQL production support.\n`;
  notes += `- **Zero-Friction Deployment**: Root Docker orchestration with prebuilt runtime bundles.\n\n`;
}

if (fixes.length > 0) {
  notes += `#### 🐛 Bug Fixes & Stability\n${fixes.join('\n')}\n\n`;
}

if (improvements.length > 0) {
  notes += `#### ⚡ Performance & Refactoring\n${improvements.join('\n')}\n\n`;
}

if (others.length > 0) {
  notes += `#### 🔧 Maintenance & Documentation\n${others.slice(0, 10).join('\n')}\n\n`;
}

notes += `### 📦 Artifact Highlights\n\n`;
notes += `- **Root Docker Configuration**: \`docker-compose.yml\`, \`Dockerfile.backend\`, \`Dockerfile.frontend\`, and \`nginx.conf\` are placed directly in the root of \`glosim.zip\`.\n`;
notes += `- **Ready-to-run SQLite Storage**: \`.env\` is pre-configured with \`DATABASE_CLIENT=sqlite\` and persistent storage at \`backend/.tmp/data.db\`.\n`;
notes += `- **Production Pruned Runtime**: Backend contains only production \`node_modules\` (\`npm prune --production\`), requiring no Node build tools on the host.\n`;
notes += `- **Optimized Frontend SPA**: Prebuilt static assets served via lightweight Nginx Alpine container with Gzip compression.\n\n`;

notes += `### ⚡ Quick Deployment Instructions\n\n`;
notes += `1. **Download and Extract Bundle**:\n`;
notes += `   \`\`\`bash\n`;
notes += `   unzip glosim.zip -d /opt/glosim\n`;
notes += `   cd /opt/glosim\n`;
notes += `   \`\`\`\n\n`;
notes += `2. **(Optional) Configure Database in \`.env\`**:\n`;
notes += `   Defaults to zero-configuration SQLite. To connect to external PostgreSQL instead, edit \`.env\`:\n`;
notes += `   \`\`\`env\n`;
notes += `   DATABASE_CLIENT=postgres\n`;
notes += `   DATABASE_HOST=host.docker.internal\n`;
notes += `   DATABASE_PORT=5432\n`;
notes += `   DATABASE_NAME=glosim_db\n`;
notes += `   DATABASE_USERNAME=glosim_user\n`;
notes += `   DATABASE_PASSWORD=your_password\n`;
notes += `   \`\`\`\n\n`;
notes += `3. **Launch Containers**:\n`;
notes += `   \`\`\`bash\n`;
notes += `   docker compose up -d --build\n`;
notes += `   \`\`\`\n\n`;
notes += `4. **Access Applications**:\n`;
notes += `   - **Frontend**: http://your-vps-ip:5173\n`;
notes += `   - **Strapi CMS Admin**: http://your-vps-ip:1337/admin\n`;

// 5. Write notes file
const notesPath = path.join(rootDir, 'RELEASE_NOTES.md');
fs.writeFileSync(notesPath, notes, 'utf8');

console.log(`[GloSim Version Manager]`);
console.log(`- Base Version:  ${baseVersion}`);
console.log(`- Release Tag:   ${tagName}`);
console.log(`- Release Title: ${releaseTitle}`);
console.log(`- Is Pre-release:${isPrerelease}`);
console.log(`- Release Notes: ${notesPath}`);

// 6. Write to GitHub Actions GITHUB_OUTPUT if present
if (process.env.GITHUB_OUTPUT) {
  const outputLines = [
    `tag_name=${tagName}`,
    `release_title=${releaseTitle}`,
    `is_prerelease=${isPrerelease}`,
    `version=${baseVersion}`,
    `notes_path=${notesPath.replace(/\\/g, '/')}`
  ];
  fs.appendFileSync(process.env.GITHUB_OUTPUT, outputLines.join('\n') + '\n');
}
