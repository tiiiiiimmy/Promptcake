const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 48, 128];
const inputFile = path.join(__dirname, '../public/icons/icon.svg');
const outputDir = path.join(__dirname, '../public/icons');

async function generateIcons() {
  try {
    for (const size of sizes) {
      await sharp(inputFile)
        .resize(size, size)
        .png()
        .toFile(path.join(outputDir, `icon${size}.png`));
      console.log(`Generated ${size}x${size} icon`);
    }
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons(); 