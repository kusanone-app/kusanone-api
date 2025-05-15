const Joi = require('joi');

const activitySchema = Joi.object({
  title: Joi.string().max(255).required(),
  comment: Joi.string().allow('').max(1000),
  date: Joi.string().isoDate().required(),
  start_time: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
  end_time: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),

  // ✅ locations配列に変更
  locations: Joi.array()
    .items(Joi.string().pattern(/^[-+]?\d{1,3}\.\d+,\s*[-+]?\d{1,3}\.\d+$/))
    .min(1)
    .max(5)
    .required(),

  delete_key: Joi.string().max(255).required(),
  agree: Joi.boolean().valid(true).required(),
  browser_id: Joi.string().max(255).required(),
  activities: Joi.array().items(Joi.string()).min(1).required(),

  photo_base64: Joi.string().base64().optional(),
  photo_filename: Joi.string().optional(),
});


function validateBody(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map(d => d.message);
      return res.status(400).json({ success: false, errors: messages });
    }
    req.validated = value;
    next();
  };
}

module.exports = {
  activitySchema,
  validateBody
};
