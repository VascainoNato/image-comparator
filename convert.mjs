import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import imageminAvif from 'imagemin-avif';
import fs from 'fs';
import path from 'path';

async function convertImages() {
  const inputDir = path.join(process.cwd(), 'input');
  const outputWebpDir = path.join(process.cwd(), 'output', 'webp');
  const outputAvifDir = path.join(process.cwd(), 'output', 'avif');

  [outputWebpDir, outputAvifDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  await imagemin([`${inputDir}/*.{jpg,jpeg,png}`], {
    destination: outputWebpDir,
    plugins: [
      imageminWebp({ quality: 75 })
    ]
  });
  console.log('WebP conversion complete.');

  await imagemin([`${inputDir}/*.{jpg,jpeg,png}`], {
    destination: outputAvifDir,
    plugins: [
      imageminAvif({ quality: 50 })
    ]
  });
  console.log('AVIF conversion complete');
}

convertImages().catch(console.error);