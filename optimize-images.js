// @ts-check
/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGE_DIRS = [
    'public/img/project',
    'public/img/projects',
    'public/img/Logo'
];

const MAX_WIDTH = 1920;
const QUALITY = 85;

async function optimizeImage(inputPath, outputPath) {
    try {
        const stats = fs.statSync(inputPath);
        const sizeInMB = stats.size / (1024 * 1024);
        
        console.log(`Processing: ${path.basename(inputPath)} (${sizeInMB.toFixed(2)}MB)`);
        
        const image = sharp(inputPath);
        const metadata = await image.metadata();
        
        // Resize if too large
        let pipeline = image;
        if (metadata.width && metadata.width > MAX_WIDTH) {
            pipeline = pipeline.resize(MAX_WIDTH, null, {
                withoutEnlargement: true,
                fit: 'inside'
            });
        }
        
        // Convert to WebP with optimization
        await pipeline
            .webp({ quality: QUALITY, effort: 6 })
            .toFile(outputPath);
        
        const newStats = fs.statSync(outputPath);
        const newSizeInMB = newStats.size / (1024 * 1024);
        const savings = ((stats.size - newStats.size) / stats.size * 100).toFixed(1);
        
        console.log(`  ✓ Saved: ${newSizeInMB.toFixed(2)}MB (${savings}% reduction)`);
        
        return true;
    } catch (error) {
        console.error(`  ✗ Error processing ${inputPath}:`, error.message);
        return false;
    }
}

async function processDirectory(dir) {
    if (!fs.existsSync(dir)) {
        console.log(`Directory not found: ${dir}, skipping...`);
        return;
    }
    
    console.log(`\nProcessing directory: ${dir}`);
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) continue;
        
        const ext = path.extname(file).toLowerCase();
        if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
        
        // Skip if already optimized (has .webp version)
        const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        if (fs.existsSync(webpPath)) {
            console.log(`  ⊘ Skipping ${file} (WebP already exists)`);
            continue;
        }
        
        await optimizeImage(filePath, webpPath);
    }
}

async function main() {
    console.log('🖼️  Starting image optimization...\n');
    console.log(`Target: Convert to WebP, max width ${MAX_WIDTH}px, quality ${QUALITY}%\n`);
    
    for (const dir of IMAGE_DIRS) {
        await processDirectory(dir);
    }
    
    console.log('\n✅ Image optimization complete!');
    console.log('\n💡 Next steps:');
    console.log('   1. Update code to use .webp versions');
    console.log('   2. Consider removing original large files after testing');
    console.log('   3. Add <picture> elements with fallbacks for browser compatibility');
}

main().catch(console.error);
