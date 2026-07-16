import fs from 'fs';
import path from 'path';

const root = path.resolve('c:/smart-attendance-system');
const outFile = path.join(root, 'PROJECT_CODEBASE.md');

const excludeDirs = new Set(['node_modules', '.git', 'dist', 'build', 'logs', 'scratch']);
const excludeFiles = new Set([
  '.env',
  'package-lock.json',
  'combined.log',
  'error.log',
  'hero.png',
  'react.svg',
  'vite.svg',
  'favicon.svg',
  'generate-codebase-md.mjs',
  'PROJECT_CODEBASE.md',
]);

const codeExtensions = new Set([
  '.ts', '.tsx', '.js', '.cjs', '.css', '.html', '.sql', '.yml', '.yaml', '.json', '.md', '.svg',
]);

const specialFiles = new Set([
  'Dockerfile', '.gitignore', '.eslintignore', '.prettierrc', '.eslintrc.cjs', '.env.example',
]);

function shouldExclude(fullPath) {
  const rel = path.relative(root, fullPath).replace(/\\/g, '/');
  const parts = rel.split('/');
  if (parts.some((p) => excludeDirs.has(p))) return true;
  if (excludeFiles.has(path.basename(fullPath))) return true;
  return false;
}

function isCodeFile(fullPath) {
  const base = path.basename(fullPath);
  if (specialFiles.has(base)) return true;
  return codeExtensions.has(path.extname(fullPath).toLowerCase());
}

function buildTree(dir, prefix = '') {
  const lines = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return lines;
  }

  const filtered = entries
    .filter((e) => !shouldExclude(path.join(dir, e.name)))
    .sort((a, b) => {
      if (a.isDirectory() !== b.isDirectory()) return a.isDirectory() ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

  filtered.forEach((entry, i) => {
    const isLast = i === filtered.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    lines.push(`${prefix}${connector}${entry.name}`);
    if (entry.isDirectory()) {
      const ext = isLast ? '    ' : '│   ';
      lines.push(...buildTree(path.join(dir, entry.name), prefix + ext));
    }
  });

  return lines;
}

function langFor(filePath) {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  const map = { ts: 'typescript', tsx: 'tsx', js: 'javascript', cjs: 'javascript', yml: 'yaml' };
  return map[ext] || ext || 'text';
}

const lines = [];
lines.push('# Smart Attendance System - Complete Codebase');
lines.push('');
lines.push(`Generated on: ${new Date().toISOString().slice(0, 19).replace('T', ' ')}`);
lines.push('');
lines.push('## Folder Structure');
lines.push('');
lines.push('```');
lines.push('smart-attendance-system/');
lines.push(...buildTree(root));
lines.push('```');
lines.push('');
lines.push('## Code Files');
lines.push('');

function walkFiles(dir, acc = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (shouldExclude(full)) continue;
    if (entry.isDirectory()) walkFiles(full, acc);
    else if (isCodeFile(full)) acc.push(full);
  }
  return acc;
}

const files = walkFiles(root).sort();
let fileCount = 0;

for (const file of files) {
  const relPath = path.relative(root, file).replace(/\\/g, '/');
  const lang = langFor(file);
  lines.push('---');
  lines.push('');
  lines.push(`### \`${relPath}\``);
  lines.push('');
  lines.push(`\`\`\`${lang}`);
  try {
    const content = fs.readFileSync(file, 'utf8');
    lines.push(content.replace(/\r\n/g, '\n').replace(/\n$/, ''));
  } catch (err) {
    lines.push(`[Unable to read file: ${err.message}]`);
  }
  lines.push('```');
  lines.push('');
  fileCount++;
}

lines.push('---');
lines.push('');
lines.push(`*Total files included: ${fileCount}*`);

fs.writeFileSync(outFile, lines.join('\n') + '\n', 'utf8');
const sizeKb = (fs.statSync(outFile).size / 1024).toFixed(1);
console.log(`Written ${fileCount} files to ${outFile}`);
console.log(`File size: ${sizeKb} KB`);
