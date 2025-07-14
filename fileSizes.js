const fs = require('fs');
const path = require('path');
const inputDir = './input';
const webpDir = './output/webp';
const avifDir = './output/avif';

function getFilesWithExt(dir, validExts) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => validExts.includes(path.extname(file).toLowerCase()))
    .map(file => ({
      base: path.parse(file).name,
      ext: path.extname(file).replace('.', '').toLowerCase(),
      file,
      sizeKB: (fs.statSync(path.join(dir, file)).size / 1024).toFixed(2)
    }));
}

const inputExts = ['.jpg', '.png'];
const webpExts = ['.webp'];
const avifExts = ['.avif'];
const inputFiles = getFilesWithExt(inputDir, inputExts);
const webpFiles = getFilesWithExt(webpDir, webpExts);
const avifFiles = getFilesWithExt(avifDir, avifExts);

const allBases = Array.from(new Set([
  ...inputFiles.map(f => f.base),
  ...webpFiles.map(f => f.base),
  ...avifFiles.map(f => f.base)
]));

const grouped = allBases.map(base => {
  const files = [
    ...inputFiles.filter(f => f.base === base),
    ...webpFiles.filter(f => f.base === base),
    ...avifFiles.filter(f => f.base === base)
  ];
  return {
    image: base,
    files: files.map(f => ({ extension: f.ext, sizeKB: f.sizeKB }))
  };
});

console.log('--- Image Comparison (Grouped by image) ---');
grouped.forEach(img => {
  console.log(`\n${img.image}:`);
  img.files.forEach(f => {
    console.log(`  ${f.extension.toUpperCase()}: ${f.sizeKB} KB`);
  });
});

console.log('\nImages:', inputFiles.map(f => ({ file: f.file, sizeKB: f.sizeKB })));
console.log('WebP:', webpFiles.map(f => ({ file: f.file, sizeKB: f.sizeKB })));
console.log('AVIF:', avifFiles.map(f => ({ file: f.file, sizeKB: f.sizeKB })));