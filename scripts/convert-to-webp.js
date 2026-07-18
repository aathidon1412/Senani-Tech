import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define directories to scan
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const TARGET_DIRS = [
  path.join(ROOT_DIR, 'public'),
  path.join(ROOT_DIR, 'src', 'assets')
];

const EXTENSIONS = ['.png', '.jpg', '.jpeg'];

// Dynamically import sharp to avoid import failure if not installed yet
async function getSharp() {
  try {
    const { default: sharp } = await import('sharp');
    return sharp;
  } catch (error) {
    console.error('Error: "sharp" library is required. Please install it by running:\n  npm install -D sharp\n  or\n  bun add -d sharp');
    process.exit(1);
  }
}

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
      if (EXTENSIONS.includes(ext)) {
        files.push(filePath);
      }
    }
  }
  return files;
}

async function convert() {
  const sharp = await getSharp();
  let convertedCount = 0;

  for (const targetDir of TARGET_DIRS) {
    console.log(`Scanning: ${targetDir}`);
    const files = getFilesRecursively(targetDir);
    
    for (const file of files) {
      const ext = path.extname(file);
      const webpPath = file.substring(0, file.length - ext.length) + '.webp';
      
      try {
        await sharp(file)
          .webp({ quality: 80 })
          .toFile(webpPath);
        console.log(`Converted: ${path.relative(ROOT_DIR, file)} -> ${path.relative(ROOT_DIR, webpPath)}`);
        convertedCount++;
      } catch (err) {
        console.error(`Failed to convert ${path.relative(ROOT_DIR, file)}:`, err.message);
      }
    }
  }

  console.log(`\nFinished! Successfully converted ${convertedCount} images to WebP.`);
}

convert();
