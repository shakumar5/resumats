/**
 * Generate OG image as PNG (1200x630) for social sharing.
 * Run with: node scripts/generate-og-image.mjs
 */
import sharp from 'sharp';

const width = 1200;
const height = 630;

// Create an SVG with the OG design, then convert to PNG
const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#eff6ff;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#ffffff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#eff6ff;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  
  <!-- Logo area -->
  <rect x="540" y="120" width="56" height="56" rx="12" fill="#2563eb"/>
  <text x="600" y="155" font-family="Arial, sans-serif" font-size="28" fill="white" text-anchor="middle" dominant-baseline="middle">📄</text>
  
  <!-- Title -->
  <text x="600" y="240" font-family="Arial, sans-serif" font-size="52" font-weight="bold" fill="#111827" text-anchor="middle">Online Resume ATS</text>
  
  <!-- Subtitle -->
  <text x="600" y="310" font-family="Arial, sans-serif" font-size="28" fill="#2563eb" text-anchor="middle">Beat the ATS. Land More Interviews.</text>
  
  <!-- Description -->
  <text x="600" y="380" font-family="Arial, sans-serif" font-size="22" fill="#6b7280" text-anchor="middle">Free ATS Score Checker • Cover Letter Generator</text>
  <text x="600" y="415" font-family="Arial, sans-serif" font-size="22" fill="#6b7280" text-anchor="middle">Keyword Analyzer • Domain Converter</text>
  
  <!-- Badges -->
  <rect x="370" y="470" width="140" height="40" rx="20" fill="#dcfce7" stroke="#86efac" stroke-width="1"/>
  <text x="440" y="496" font-family="Arial, sans-serif" font-size="16" fill="#166534" text-anchor="middle">100% Free</text>
  
  <rect x="530" y="470" width="140" height="40" rx="20" fill="#dbeafe" stroke="#93c5fd" stroke-width="1"/>
  <text x="600" y="496" font-family="Arial, sans-serif" font-size="16" fill="#1e40af" text-anchor="middle">No Sign-up</text>
  
  <rect x="690" y="470" width="140" height="40" rx="20" fill="#f3e8ff" stroke="#c4b5fd" stroke-width="1"/>
  <text x="760" y="496" font-family="Arial, sans-serif" font-size="16" fill="#6b21a8" text-anchor="middle">Private</text>
  
  <!-- URL -->
  <text x="600" y="575" font-family="Arial, sans-serif" font-size="20" fill="#9ca3af" text-anchor="middle">onlineresumats.com</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ quality: 90 })
  .toFile('public/og-image.png');

console.log('✅ Generated public/og-image.png (1200x630)');
