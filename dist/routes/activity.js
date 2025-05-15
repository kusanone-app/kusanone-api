const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const { activitySchema, validateBody } = require('../middleware/validate');

router.post('/register', validateBody(activitySchema), activityController.registerActivity);

module.exports = router;
