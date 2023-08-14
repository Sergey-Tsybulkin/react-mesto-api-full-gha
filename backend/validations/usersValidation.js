const { celebrate, Joi } = require('celebrate');
const config = require('../config');

const updateUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(config.URL_REGEX).required(),
  }),
});

const getUserIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const updateUserProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports = {
  updateUserProfileValidation,
  updateUserAvatarValidation,
  getUserIdValidation,
};
