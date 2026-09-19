/**
 * optimize-images.cjs
 * =====================
 * سكربت ضغط وتحويل الصور إلى WebP
 *
 * يقوم هذا السكربت بـ:
 *  1. تحويل جميع الصور (PNG / JPG / JPEG / GIF) إلى WebP
 *  2. حذف الملفات الأصلية
 *  3. تحديث جميع مراجع الصور في ملفات الكود (TSX / TS / CSS / HTML) تلقائياً
 *
 * الاستخدام:
 *   node scripts/optimize-images.cjs
 *
 * خيارات اختيارية:
 *   --quality=80      جودة WebP (افتراضي: 82)
 *   --dry-run         معاينة التغييرات بدون تطبيقها
 *   --skip-gif        تخطي ملفات GIF (كبيرة/متحركة)
 */

"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

// ─── إعداد ─────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, "..");
const IMAGES_DIR = path.join(ROOT, "public", "images");
const SRC_DIR = path.join(ROOT, "src");
const INDEX_HTML = path.join(ROOT, "index.html");

// قراءة المعاملات من سطر الأوامر
const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const SKIP_GIF = args.includes("--skip-gif");
const QUALITY_ARG = args.find((a) => a.startsWith("--quality="));
const QUALITY = QUALITY_ARG ? parseInt(QUALITY_ARG.split("=")[1], 10) : 82;

// امتدادات يتم تحويلها
const CONVERTIBLE_EXTS = new Set([".png", ".jpg", ".jpeg", ".gif"]);
// امتدادات ملفات الكود التي سيتم البحث فيها
const CODE_EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".html", ".json"]);

// ─── مساعدات ────────────────────────────────────────────────────────────────

function log(msg, color) {
  if (color) process.stdout.write(color + msg + "\x1b[0m\n");
  else console.log(msg);
}
const green  = (m) => log(m, "\x1b[32m");
const yellow = (m) => log(m, "\x1b[33m");
const cyan   = (m) => log(m, "\x1b[36m");
const red    = (m) => log(m, "\x1b[31m");
const bold   = (m) => log(m, "\x1b[1m");
const dim    = (m) => log(m, "\x1b[2m");

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

function walkDir(dir, filelist) {
  filelist = filelist || [];
  if (!fs.existsSync(dir)) return filelist;
  var entries = fs.readdirSync(dir, { withFileTypes: true });
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(full, filelist);
    else filelist.push(full);
  }
  return filelist;
}

function detectConverter() {
  try { require.resolve("sharp"); return "sharp"; } catch (e) {}
  var r = spawnSync("cwebp", ["-version"], { encoding: "utf8" });
  if (r.status === 0) return "cwebp";
  return null;
}

// ─── تحويل الصور ─────────────────────────────────────────────────────────────

async function convertImages(converter) {
  var allFiles = walkDir(IMAGES_DIR);
  var toConvert = allFiles.filter(function(f) {
    var ext = path.extname(f).toLowerCase();
    if (!CONVERTIBLE_EXTS.has(ext)) return false;
    if (SKIP_GIF && ext === ".gif") return false;
    return true;
  });

  if (toConvert.length === 0) { yellow("لا توجد صور للتحويل."); return new Map(); }

  bold("\n📸 تحويل " + toConvert.length + " صورة إلى WebP (جودة: " + QUALITY + "%)...\n");

  var renamedMap = new Map();
  var totalSaved = 0;

  for (var i = 0; i < toConvert.length; i++) {
    var filePath = toConvert[i];
    var ext = path.extname(filePath).toLowerCase();
    var isGif = ext === ".gif";
    var webpPath = filePath.replace(/\.[^.]+$/, ".webp");

    var oldRel = "/" + path.relative(path.join(ROOT, "public"), filePath).replace(/\\/g, "/");
    var newRel = "/" + path.relative(path.join(ROOT, "public"), webpPath).replace(/\\/g, "/");

    var oldSize = fs.statSync(filePath).size;

    if (DRY_RUN) {
      dim("  [dry-run] " + path.basename(filePath) + " → " + path.basename(webpPath));
      renamedMap.set(oldRel, newRel);
      continue;
    }

    try {
      if (converter === "sharp") {
        var sharp = require("sharp");
        var pipeline = sharp(filePath, { animated: isGif });
        pipeline = pipeline.webp({ quality: QUALITY, effort: 4, smartSubsample: true });
        await pipeline.toFile(webpPath);
      } else {
        var result = spawnSync("cwebp", ["-q", String(QUALITY), filePath, "-o", webpPath], { encoding: "utf8" });
        if (result.status !== 0) throw new Error(result.stderr || "cwebp failed");
      }

      var newSize = fs.statSync(webpPath).size;
      var saved = oldSize - newSize;
      var pct = ((saved / oldSize) * 100).toFixed(1);
      totalSaved += saved;
      try { fs.unlinkSync(filePath); } catch (delErr) { yellow("  ⚠ تحويل نجح لكن تعذّر حذف الأصل (ربما مقفول): " + path.basename(filePath)); }

      green("  ✓ " + path.basename(filePath) + " → " + path.basename(webpPath) +
            "  (" + formatBytes(oldSize) + " → " + formatBytes(newSize) + ", وفّر " + pct + "%)");
      renamedMap.set(oldRel, newRel);
    } catch (err) {
      red("  ✗ فشل تحويل " + path.basename(filePath) + ": " + err.message);
    }
  }

  if (!DRY_RUN && totalSaved > 0) {
    bold("\n💾 إجمالي المساحة الموفّرة: " + formatBytes(totalSaved) + "\n");
  }

  return renamedMap;
}

// ─── تحديث مراجع الكود ───────────────────────────────────────────────────────

function updateCodeRefs(renamedMap) {
  if (renamedMap.size === 0) return;
  bold("🔄 تحديث مراجع الصور في ملفات الكود...\n");

  var codeFiles = walkDir(SRC_DIR).concat([INDEX_HTML]).filter(function(f) {
    return CODE_EXTS.has(path.extname(f).toLowerCase());
  });

  var totalFilesChanged = 0;
  var totalReplacements = 0;

  for (var i = 0; i < codeFiles.length; i++) {
    var filePath = codeFiles[i];
    var content = fs.readFileSync(filePath, "utf8");
    var changed = false;
    var fileReplacements = 0;

    renamedMap.forEach(function(newPath, oldPath) {
      var escapedOld = oldPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      var regex = new RegExp(escapedOld, "g");
      var occurrences = (content.match(regex) || []).length;
      if (occurrences > 0) {
        content = content.replace(regex, newPath);
        changed = true;
        fileReplacements += occurrences;
        totalReplacements += occurrences;
      }
    });

    if (changed) {
      var relFile = path.relative(ROOT, filePath).replace(/\\/g, "/");
      if (DRY_RUN) {
        yellow("  [dry-run] " + relFile + " (" + fileReplacements + " تغيير)");
      } else {
        fs.writeFileSync(filePath, content, "utf8");
        cyan("  ✎ " + relFile + "  ← " + fileReplacements + " مرجع محدّث");
      }
      totalFilesChanged++;
    }
  }

  if (totalFilesChanged === 0) yellow("  لم يُعثر على مراجع تحتاج تحديث.");
  else bold("\n✅ تم تحديث " + totalReplacements + " مرجع في " + totalFilesChanged + " ملف.\n");
}

// ─── الرئيسية ─────────────────────────────────────────────────────────────────

async function main() {
  bold("\n═══════════════════════════════════════════════════");
  bold("   🖼  مُحسِّن الصور — WebP Optimizer");
  bold("═══════════════════════════════════════════════════\n");

  if (DRY_RUN) yellow("⚠  وضع المعاينة (dry-run) — لن يُطبَّق أي تغيير فعلي\n");

  var converter = detectConverter();
  if (!converter) {
    red("❌ لم يُعثر على أداة تحويل.");
    red("   الحل: ثبّت sharp بتشغيل:\n");
    red("   npm install --save-dev sharp\n");
    process.exit(1);
  }
  cyan("🔧 أداة التحويل: " + converter + "\n");

  var renamedMap = await convertImages(converter);
  updateCodeRefs(renamedMap);

  if (renamedMap.size > 0) {
    bold("📋 ملخص التحويلات:\n");
    renamedMap.forEach(function(newPath, oldPath) {
      dim("  " + oldPath + "  →  " + newPath);
    });
  }

  if (DRY_RUN) yellow("\n⚠  هذا كان وضع المعاينة. شغّل بدون --dry-run لتطبيق التغييرات.\n");
  else green("\n🎉 اكتمل التحسين بنجاح!\n");
}

main().catch(function(err) {
  red("\n❌ خطأ غير متوقع: " + err.message);
  console.error(err);
  process.exit(1);
});

