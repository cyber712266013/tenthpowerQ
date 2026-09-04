const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const logoPath = path.resolve(__dirname, '../public/icons/app_logo.png');
const logoData = fs.readFileSync(logoPath).toString('base64');

const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      background: #090e17;
      font-family: 'Tajawal', 'IBM Plex Sans Arabic', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    /* Luxury Background Elements */
    .bg-gradient {
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(circle at 50% 28%, rgba(212, 175, 55, 0.22) 0%, transparent 60%),
        radial-gradient(circle at 15% 20%, rgba(25, 45, 80, 0.5) 0%, transparent 50%),
        radial-gradient(circle at 85% 80%, rgba(25, 45, 80, 0.5) 0%, transparent 50%),
        linear-gradient(145deg, #070b12 0%, #0d1522 50%, #080c14 100%);
    }

    .grid-overlay {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(212, 175, 55, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(212, 175, 55, 0.05) 1px, transparent 1px);
      background-size: 40px 40px;
      mask-image: radial-gradient(circle at 50% 50%, black 45%, transparent 85%);
      -webkit-mask-image: radial-gradient(circle at 50% 50%, black 45%, transparent 85%);
    }

    .border-frame {
      position: absolute;
      inset: 22px;
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 20px;
      pointer-events: none;
    }

    .corner-accent {
      position: absolute;
      width: 24px;
      height: 24px;
      border-color: #D4AF37;
      border-style: solid;
      pointer-events: none;
    }
    .corner-tl { top: 20px; left: 20px; border-width: 3px 0 0 3px; border-top-left-radius: 20px; }
    .corner-tr { top: 20px; right: 20px; border-width: 3px 3px 0 0; border-top-right-radius: 20px; }
    .corner-bl { bottom: 20px; left: 20px; border-width: 0 0 3px 3px; border-bottom-left-radius: 20px; }
    .corner-br { bottom: 20px; right: 20px; border-width: 0 3px 3px 0; border-bottom-right-radius: 20px; }

    /* Content Container */
    .card-content {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      width: 100%;
      max-width: 1120px;
      padding: 30px;
    }

    .logo-container {
      position: relative;
      margin-bottom: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-glow {
      position: absolute;
      width: 180px;
      height: 180px;
      background: radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%);
      border-radius: 50%;
      filter: blur(20px);
    }

    .logo-img {
      width: 145px;
      height: 145px;
      object-fit: contain;
      position: relative;
      filter: drop-shadow(0 12px 25px rgba(0, 0, 0, 0.7));
    }

    .company-title {
      font-size: 46px;
      font-weight: 800;
      letter-spacing: -0.5px;
      line-height: 1.25;
      margin-bottom: 12px;
      background: linear-gradient(135deg, #FFFFFF 0%, #FAF8F2 40%, #E5C365 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .tagline {
      font-size: 24px;
      font-weight: 500;
      color: #E2D7B7;
      margin-bottom: 30px;
      letter-spacing: 0.2px;
      text-shadow: 0 2px 10px rgba(0,0,0,0.5);
    }

    /* Badges / Pillars */
    .services-row {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 34px;
    }

    .badge {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(212, 175, 55, 0.35);
      padding: 10px 24px;
      border-radius: 999px;
      font-size: 18px;
      font-weight: 600;
      color: #F5ECD2;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    /* Footer Info Bar */
    .footer-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 86%;
      padding-top: 22px;
      border-top: 1px solid rgba(212, 175, 55, 0.25);
    }

    .footer-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 18px;
      color: #A0ABC0;
      font-weight: 500;
    }

    .footer-item strong {
      color: #E5C365;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <div class="bg-gradient"></div>
  <div class="grid-overlay"></div>
  <div class="border-frame"></div>
  <div class="corner-accent corner-tl"></div>
  <div class="corner-accent corner-tr"></div>
  <div class="corner-accent corner-bl"></div>
  <div class="corner-accent corner-br"></div>

  <div class="card-content">
    <div class="logo-container">
      <div class="logo-glow"></div>
      <img src="data:image/png;base64,${logoData}" class="logo-img" alt="شعار القوة العاشرة" />
    </div>

    <h1 class="company-title">مؤسسة القوة العاشرة للمقاولات والتجارة العامة</h1>
    <p class="tagline">إبداع الزجاج والألمنيوم .. ودقة المقاولات العامة</p>

    <div class="services-row">
      <div class="badge">🏢 واجهات زجاجية واستركشر</div>
      <div class="badge">🛡️ زجاج سكريت وديكورات</div>
      <div class="badge">🪟 أنظمة ألمنيوم ومطابخ</div>
      <div class="badge">🏗️ مقاولات عامة وتشطيبات</div>
    </div>

    <div class="footer-bar">
      <div class="footer-item">
        <span>📍</span>
        <span>المملكة العربية السعودية — <strong>الرياض</strong></span>
      </div>
      <div class="footer-item">
        <span>✨</span>
        <span>الكتالوج الإلكتروني الرسمي والمعرض</span>
      </div>
    </div>
  </div>
</body>
</html>`;

const previewHtmlPath = path.resolve(__dirname, '../public/og-preview.html');
fs.writeFileSync(previewHtmlPath, html, 'utf8');
console.log('og-preview.html generated at:', previewHtmlPath);

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outPng = path.resolve(__dirname, '../public/og-image.png');
const fileUrl = 'file:///' + previewHtmlPath.split(path.sep).join('/');

const cmd = `"${edgePath}" --headless --disable-gpu --screenshot="${outPng}" --window-size=1200,630 --hide-scrollbars "${fileUrl}"`;
console.log('Running screenshot command...');
execSync(cmd);
console.log('Screenshot completed! File saved at:', outPng);
