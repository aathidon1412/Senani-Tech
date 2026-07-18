import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');

const EXTENSIONS_TO_REPLACE = /\.(png|jpg|jpeg|PNG)\b/g;

function getFilesRecursively(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getFilesRecursively(filePath, files);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.ts' || ext === '.tsx' || ext === '.js' || ext === '.jsx') {
        files.push(filePath);
      }
    }
  }
  return files;
}

function updateReferences() {
  const files = getFilesRecursively(SRC_DIR);
  let updatedFilesCount = 0;

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if there are matches in this file
    if (EXTENSIONS_TO_REPLACE.test(content)) {
      // Reset regex state
      EXTENSIONS_TO_REPLACE.lastIndex = 0;
      
      // Update references
      let newContent = content.replace(EXTENSIONS_TO_REPLACE, '.webp');
      
      // Special check/fix for Portfolio pages where error fallback checks are present:
      newContent = newContent.replace(/\.webp"\)\) \{/g, '.png")) {'); // Keep checks intact if necessary, or update them.
      
      fs.writeFileSync(file, newContent, 'utf8');
      console.log(`Updated image references in: ${path.relative(ROOT_DIR, file)}`);
      updatedFilesCount++;
    }
  }

  console.log(`\nFinished! Updated image references in ${updatedFilesCount} files.`);
}

updateReferences();
