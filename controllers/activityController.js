const { normalizeLocation } = require('../utils/location');
const activityModel = require('../models/activityModel');

exports.registerActivity = async (req, res) => {
  try {
    const data = req.validated;
    const ipAddress = req.ip;

    const normalizedLocations = Array.isArray(data.locations)
      ? normalizeLocation(data.locations).filter(loc => loc !== null)
      : [];

    if (normalizedLocations.length === 0) {
      return res.status(400).json({ success: false, error: '緯度・経度が不正です' });
    }

    // ✅ ここで画像保存（非同期） ← 修正済み
    let photoPath = null;
    if (data.photo_base64 && data.photo_filename) {
      const buffer = Buffer.from(data.photo_base64, 'base64');
      photoPath = await saveImageToLocal(data.photo_filename, buffer);
    }

    // DB登録処理
    const result = await activityModel.insertActivity({
      ...data,
      locations: JSON.stringify(normalizedLocations),
      ip_address: ipAddress,
      photo_path: photoPath,
    });

    res.status(200).json({ success: true, id: result.insertId });
  } catch (err) {
    console.error('登録エラー:', err);
    res.status(500).json({ success: false, error: '登録に失敗しました' });
  }
};
