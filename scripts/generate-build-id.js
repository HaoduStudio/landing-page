const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function generateId() {
  // 8 hex chars (32 bits) should be enough for uniqueness per build
  return crypto.randomBytes(4).toString('hex');
}

const id = generateId();
const content = `// This file is auto-generated at build time.
// Do NOT edit manually.
export const BUILD_ID = '${id}';
`;

const outPath = path.resolve(__dirname, '../lib/build-info.ts');

fs.writeFileSync(outPath, content, { encoding: 'utf8' });
console.log(`Generated BUILD_ID: ${id} -> ${outPath}`);
