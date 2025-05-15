const db = require('./db');

exports.insertActivity = async (data) => {
  const [result] = await db.execute(`
    INSERT INTO activities (
      title, comment, date, start_time, end_time, locations,
      delete_key, agree, activities, photo_path, browser_id, ip_address
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    data.title,
    data.comment,
    data.date,
    data.start_time,
    data.end_time,
    JSON.stringify(data.locations), // ← ここを変更
    data.delete_key,
    data.agree,
    JSON.stringify(data.activities),
    data.photo_path || null,
    data.browser_id,
    data.ip_address
  ]);

  return result;
};
