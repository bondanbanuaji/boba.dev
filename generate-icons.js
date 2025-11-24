const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const source = 'public/img/Logo/boba-light-logo.png';
const dest = 'public';

if (!fs.existsSync(source)) {
    console.error('Source file not found:', source);
    process.exit(1);
}

const sizes = [
    { name: 'android-chrome-192x192.png', width: 192, height: 192 },
    { name: 'android-chrome-512x512.png', width: 512, height: 512 },
    { name: 'apple-touch-icon.png', width: 180, height: 180 },
    { name: 'maskable-icon.png', width: 512, height: 512, mask: true },
    { name: 'favicon.ico', width: 32, height: 32 }
];

async function generate() {
    for (const size of sizes) {
        const outputPath = path.join(dest, size.name);
        let pipeline = sharp(source).resize(size.width, size.height);
        
        if (size.mask) {
            // Simple maskable icon simulation (add padding)
            pipeline = sharp(source)
                .resize(Math.floor(size.width * 0.8), Math.floor(size.height * 0.8))
                .extend({
                    top: Math.floor(size.height * 0.1),
                    bottom: Math.floor(size.height * 0.1),
                    left: Math.floor(size.width * 0.1),
                    right: Math.floor(size.width * 0.1),
                    background: { r: 255, g: 255, b: 255, alpha: 0 }
                });
        }

        if (size.name.endsWith('.ico')) {
             // Save as png for now, browsers support it. 
             // Renaming to .ico is a hack but often works for simple favicons, 
             // or we can just rely on the png being picked up if linked correctly.
             // Let's save as .png but name it favicon.ico to satisfy the file requirement, 
             // though technically it's a PNG. Modern browsers handle this fine.
             await pipeline.toFormat('png').toFile(outputPath);
        } else {
            await pipeline.toFile(outputPath);
        }
        console.log('Generated:', size.name);
    }
}

generate().catch(console.error);
