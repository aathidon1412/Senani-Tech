import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const TARGET_DIRS = [
  path.join(ROOT_DIR, 'public'),
  path.join(ROOT_DIR, 'src', 'assets')
];

const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.PNG'];

function getFilesRecursively(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getFilesRecursively(filePath, files);
    } else {
      const ext = path.extname(file);
      if (EXTENSIONS.includes(ext)) {
        files.push(filePath);
      }
    }
  }
  return files;
}

function removeOldImages() {
  let removedCount = 0;

  for (const targetDir of TARGET_DIRS) {
    console.log(`Scanning for old images in: ${targetDir}`);
    const files = getFilesRecursively(targetDir);
    
    for (const file of files) {
      try {
        fs.unlinkSync(file);
        console.log(`Removed: ${path.relative(ROOT_DIR, file)}`);
        removedCount++;
      } catch (err) {
        console.error(`Failed to remove ${path.relative(ROOT_DIR, file)}:`, err.message);
      }
    }
  }

  console.log(`\nFinished! Successfully removed ${removedCount} old images.`);
}

removeOldImages();
