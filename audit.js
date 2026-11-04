// deep-audit.js - Advanced Architecture, Logic & Performance Analysis
const fs = require('fs');
const path = require('path');

function analyzeNextProject() {
  const root = __dirname;
  const appDir = fs.existsSync(path.join(root, 'app')) 
    ? path.join(root, 'app') 
    : fs.existsSync(path.join(root, 'src/app')) 
    ? path.join(root, 'src/app') 
    : null;

  if (!appDir) {
    console.error('❌ Error: /app directory not found.');
    return;
  }

  let totalFiles = 0;
  let clientComponents = 0;
  let serverComponents = 0;
  let dynamicRoutes = [];
  let staticRoutes = [];
  let stateHooksCount = 0;
  let effectHooksCount = 0;
  let imageTagsCount = 0;
  let nextImageCount = 0;
  let hardcodedStringsCount = 0;
  let cachingStrategy = { revalidateFound: false, dynamicExportFound: false };

  function walkDirectory(dir, currentRoute = '') {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        if (item.name.startsWith('.')) continue;

        let routeSegment = item.name;
        let isDynamic = false;
        if (item.name.startsWith('[') && item.name.endsWith(']')) {
          isDynamic = true;
        }

        let nextRoute = path.join(currentRoute, routeSegment);
        walkDirectory(fullPath, nextRoute);
      } else if (item.isFile() && /\.(tsx|jsx|ts|js)$/.test(item.name)) {
        totalFiles++;
        const content = fs.readFileSync(fullPath, 'utf8');

        // 1. Client vs Server Algorithm Check
        const isClient = content.includes("'use client'") || content.includes('"use client"');
        if (isClient) {
          clientComponents++;
          // React Hooks Logic Analysis
          const stateMatches = content.match(/useState\(/g);
          const effectMatches = content.match(/useEffect\(/g);
          if (stateMatches) stateHooksCount += stateMatches.length;
          if (effectMatches) effectHooksCount += effectMatches.length;
        } else {
          serverComponents++;
        }

        // 2. Performance & Image Optimization Logic
        const imgTags = content.match(/<img\s/g);
        const nextImg = content.match(/<Image\s/g);
        if (imgTags) imageTagsCount += imgTags.length;
        if (nextImg) nextImageCount += nextImg.length;

        // 3. Dynamic Caching & SSG Algorithms
        if (content.includes('export const revalidate')) cachingStrategy.revalidateFound = true;
        if (content.includes("export const dynamic = 'force-dynamic'")) cachingStrategy.dynamicExportFound = true;

        // 4. Track Route Logic
        if (item.name.startsWith('page.')) {
          const routePath = currentRoute === '' ? '/' : `/${currentRoute.replace(/\\/g, '/')}`;
          if (routePath.includes('[')) {
            dynamicRoutes.push(routePath);
          } else {
            staticRoutes.push(routePath);
          }
        }
      }
    }
  }

  walkDirectory(appDir);

  const serverRatio = Math.round((serverComponents / (totalFiles || 1)) * 100);
  const clientRatio = Math.round((clientComponents / (totalFiles || 1)) * 100);

  // Print Analytical Results
  console.log('\n===============================================================');
  console.log('      NEXT.JS DEEP ARCHITECTURE & LOGIC ANALYSIS REPORT        ');
  console.log('===============================================================\n');

  console.log('📊 [1. ARCHITECTURE BALANCE & RENDER LOGIC]');
  console.log(` - Total Source Files:          ${totalFiles}`);
  console.log(` - Server Components (RSC):     ${serverComponents} (${serverRatio}%)`);
  console.log(` - Client Components:           ${clientComponents} (${clientRatio}%)`);
  console.log(` - React State Hooks (useState): ${stateHooksCount}`);
  console.log(` - Side-Effect Hooks (useEffect): ${effectHooksCount}`);

  console.log('\n⚡ [2. ASSET & IMAGE PERFORMANCE LOGIC]');
  console.log(` - Optimized Next.js <Image/>:   ${nextImageCount}`);
  console.log(` - Unoptimized standard <img>:  ${imageTagsCount} ${imageTagsCount > 0 ? '⚠️ (Action Needed)' : '✅'}`);

  console.log('\n🔁 [3. CACHING & DATA FETCHING LOGIC]');
  console.log(` - Revalidation Config (ISR):   ${cachingStrategy.revalidateFound ? '✅ Configured' : '⚠️ Not detected explicitly'}`);
  console.log(` - Force Dynamic Rendering:      ${cachingStrategy.dynamicExportFound ? '⚠️ Present (Forces Server Rendering)' : '✅ Not forcing dynamic'}`);

  console.log('\n🛣️ [4. ROUTE ARCHITECTURE]');
  console.log(` - Static Routes (${staticRoutes.length}):`, staticRoutes.join(', '));
  console.log(` - Dynamic Routes (${dynamicRoutes.length}):`, dynamicRoutes.join(', ') || 'None');

  console.log('\n===============================================================\n');
}

analyzeNextProject();