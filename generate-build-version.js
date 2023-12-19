const fs = require('fs');
const path = require('path');

// Read the current version from meta.json
const metaPath = path.join(__dirname, 'public', 'meta.json');
const metaData = require(metaPath);
const currentVersion = metaData.version;

// Determine the desired version update type (default: patch)
const updateType = process.argv[2] || 'patch';
const versionParts = currentVersion.split('.');
let [major, minor, patch] = versionParts.map(Number);

// Update the version based on the specified update type
switch (updateType) {
  case 'major':
    major++;
    minor = 0;
    patch = 0;
    break;
  case 'minor':
    minor++;
    patch = 0;
    break;
  case 'patch':
  default:
    patch++;
}

// Update the version in meta.json
const newVersion = `${major}.${minor}.${patch}`;
metaData.version = newVersion;
fs.writeFileSync(metaPath, JSON.stringify(metaData, null, 2));

console.log(`Version updated from ${currentVersion} to ${newVersion}`);
