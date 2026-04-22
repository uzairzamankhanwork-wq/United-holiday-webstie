const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/index.tsx',
  'src/pages/destinations.tsx',
  'src/pages/contact.tsx',
  'src/pages/destination/[id].tsx',
  'src/pages/visa/[id].tsx',
  'src/pages/admin/dashboard.tsx',
  'src/components/admin/HomepageContentManager.tsx',
  'src/components/admin/PackageManager.tsx',
  'src/components/admin/VisaManager.tsx',
  'src/components/admin/SiteSettingsManager.tsx',
  'src/components/admin/ImageUploader.tsx',
];

const importLine = "import { apiFetch } from '@/lib/api';";

for (const relPath of files) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) {
    console.log('SKIP (not found):', relPath);
    continue;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Replace fetch('/api/ with apiFetch('/
  const newContent = content.replace(/fetch\('\/api\//g, "apiFetch('/");
  
  if (newContent === content) {
    console.log('NO CHANGE:', relPath);
    continue;
  }
  
  // Add import at top if not already there
  let finalContent = newContent;
  if (!finalContent.includes("from '@/lib/api'")) {
    // Find the last import line and insert after it
    const importMatch = finalContent.match(/(^import .+$)/m);
    if (importMatch) {
      finalContent = finalContent.replace(
        /^(import .+\n)+/m,
        (match) => match + importLine + '\n'
      );
    } else {
      finalContent = importLine + '\n' + finalContent;
    }
  }
  
  fs.writeFileSync(fullPath, finalContent);
  console.log('UPDATED:', relPath);
}

console.log('\nDone! All API calls now use apiFetch()');
