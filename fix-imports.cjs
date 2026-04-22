const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Calculate relative path to src/server/db
      const rootPath = path.resolve('.');
      const dbPath = path.join(rootPath, 'src', 'server', 'db');
      const fileDir = path.dirname(path.resolve(fullPath));
      let relativePath = path.relative(fileDir, dbPath).replace(/\\/g, '/');
      if (!relativePath.startsWith('.')) {
        relativePath = './' + relativePath;
      }
      
      let newContent = content.replace(/from\s+['"].*src\/server\/db\/client\.js['"]/g, `from '${relativePath}/client.js'`);
      newContent = newContent.replace(/from\s+['"].*src\/server\/db\/schema\.js['"]/g, `from '${relativePath}/schema.js'`);
      
      if (newContent !== content) {
        fs.writeFileSync(fullPath, newContent);
        console.log('Fixed', fullPath, 'with', relativePath);
      }
    }
  }
}

processDir('./src/server/api');
