const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'public/icons');

function getFiles(dir, baseDir = '') {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) {
      files.push(...getFiles(path.join(dir, item.name), path.join(baseDir, item.name)));
    } else if (item.name.endsWith('.png') || item.name.endsWith('.svg') || item.name.endsWith('.xpm')) {
      files.push(path.join(baseDir, item.name));
    }
  }
  return files;
}

try {
  const allIcons = getFiles(iconsDir);
  fs.writeFileSync(path.join(__dirname, 'src/config/icons.json'), JSON.stringify(allIcons, null, 2));
  console.log(`Successfully generated icons.json with ${allIcons.length} icons.`);
} catch (err) {
  console.error('Error generating icons.json:', err);
}
