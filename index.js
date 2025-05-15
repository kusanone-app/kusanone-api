const dotenv = require('dotenv');
dotenv.config({
  path: process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development'
});

console.log('🌐 BASE_URL:', process.env.BASE_URL);

const express = require('express');
const cookieParser = require('cookie-parser');
const activityRoutes = require('./routes/activity');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ルーティング
app.use('/activity', activityRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
