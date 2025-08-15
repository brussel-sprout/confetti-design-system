const fs = require('fs');
const path = require('path');

function deleteJsFiles(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip these directories
      if (item === 'node_modules' || item === 'dist' || item === '.storybook') {
        continue;
      }
      // Recursively process subdirectories
      deleteJsFiles(fullPath);
    } else if (stat.isFile() && item.endsWith('.js')) {
      // Delete .js files
      fs.unlinkSync(fullPath);
      console.log(`Deleted: ${fullPath}`);
    }
  }
}

try {
  deleteJsFiles('.');
  console.log('JavaScript file cleanup completed.');
} catch (error) {
  console.error('Error during cleanup:', error.message);
  process.exit(1);
}