const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// .env 読み込み（未読込なら）
if (!process.env.IMAGE_SAVE_BASE) {
   require('dotenv').config(); // 念のため
}

/**
 * 画像を保存（20KB未満に圧縮）＋年月日でフォルダ分け
 */
exports.saveImageToLocal = async (originalFilename, fileBuffer) => {
   const now = new Date();
   const yyyy = now.getFullYear();
   const mm = String(now.getMonth() + 1).padStart(2, '0');
   const dd = String(now.getDate()).padStart(2, '0');
   const timestamp = Date.now();

   const baseName = path.basename(originalFilename, path.extname(originalFilename));
   const safeName = `${timestamp}_${baseName.replace(/[^\w.-]/g, '')}.jpg`;

   const subdir = path.join(yyyy.toString(), mm, dd);

   const baseDir = process.env.IMAGE_SAVE_BASE || '/tmp/kusanone/img'; // fallback先
   const saveDir = path.join(baseDir, subdir);
   const fullPath = path.join(saveDir, safeName);

   try {
      fs.mkdirSync(saveDir, { recursive: true });

      let quality = 80;
      let compressedBuffer;

      while (quality > 10) {
         compressedBuffer = await sharp(fileBuffer)
            .jpeg({ quality, mozjpeg: true })
            .toBuffer();

         if (compressedBuffer.length < 20 * 1024) break;
         quality -= 10;
      }

      if (compressedBuffer.length >= 20 * 1024) {
         console.warn(`⚠️ 圧縮後も ${compressedBuffer.length} bytes：${safeName}`);
      }

      fs.writeFileSync(fullPath, compressedBuffer);

      return `/img/${yyyy}/${mm}/${dd}/${safeName}`;
   } catch (err) {
      console.error('❌ 画像保存エラー:', err);
      throw new Error('画像の保存に失敗しました');
   }
};
