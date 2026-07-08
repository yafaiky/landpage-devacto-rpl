import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync, copyFileSync } from 'fs';
import { join, parse, relative } from 'path';

const PUBLIC_DIR = join(process.cwd(), 'public');
const SRC_ASSETS_DIR = join(process.cwd(), 'src', 'assets');
const OUT_DIR = join(process.cwd(), 'public');

const qualityMap = {
  'hero': 75,
  'project': 70,
  'divisi': 70,
  'default': 75,
};

const maxSizeMap = {
  'hero': { width: 1200 },
  'project': { width: 900 },
  'divisi': { width: 800 },
  'default': { width: 1200 },
};

function getCategory(filePath) {
  const p = filePath.toLowerCase();
  if (p.includes('hero') || p.includes('banner')) return 'hero';
  if (p.includes('project')) return 'project';
  if (p.includes('imagedivisi') || p.includes('divisi')) return 'divisi';
  return 'default';
}

async function optimizeImage(inputPath, outputPath) {
  const ext = parse(outputPath).ext.toLowerCase();
  const category = getCategory(inputPath);
  const quality = qualityMap[category] || qualityMap.default;
  const maxSize = maxSizeMap[category] || maxSizeMap.default;

  const outputDir = parse(outputPath).dir;
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  try {
    const img = sharp(inputPath);
    const metadata = await img.metadata();

    let pipeline = img;

    // Resize if larger than max dimensions
    if (metadata.width > maxSize.width) {
      pipeline = pipeline.resize({ width: maxSize.width, withoutEnlargement: true });
    }

    if (ext === '.webp') {
      await pipeline.webp({ quality, effort: 6 }).toFile(outputPath);
    } else if (ext === '.png') {
      await pipeline.png({ quality: quality, palette: true }).toFile(outputPath);
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await pipeline.jpeg({ quality, mozjpeg: true }).toFile(outputPath);
    } else {
      // Copy as-is for SVG etc.
      copyFileSync(inputPath, outputPath);
    }

    const originalSize = (await sharp(inputPath).metadata()).size;
    const newSize = (await sharp(outputPath).metadata()).size;
    const saved = ((1 - newSize / originalSize) * 100).toFixed(1);
    console.log(`✓ ${parse(inputPath).base} (${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB, -${saved}%)`);
  } catch (err) {
    console.error(`✗ ${inputPath}: ${err.message}`);
  }
}

async function processDirectory(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const subResults = await processDirectory(fullPath);
      results.push(...subResults);
    } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
      const parsed = parse(fullPath);
      const relativePath = relative(process.cwd(), fullPath);
      
      // Convert to WebP
      const webpPath = join(parsed.dir, parsed.name + '.webp');
      results.push({ input: fullPath, output: webpPath });
    }
  }
  return results;
}

async function main() {
  console.log('=== Optimizing Images ===\n');

  const allFiles = [
    ...await processDirectory(PUBLIC_DIR),
    ...await processDirectory(SRC_ASSETS_DIR),
  ];

  // Deduplicate by path
  const seen = new Set();
  const unique = allFiles.filter(f => {
    const key = f.input;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  console.log(`Found ${unique.length} images to optimize\n`);

  for (const { input, output } of unique) {
    await optimizeImage(input, output);
  }

  console.log('\n=== Done! ===');
}

main().catch(console.error);
