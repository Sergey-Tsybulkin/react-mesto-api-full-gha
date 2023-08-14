const { ValidationError } = require('mongoose').Error;
const { CastError } = require('mongoose').Error;
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getUsers = (_, res, next) => {
  User
    .find({})
    .then((users) => res.send(users))
    .catch(next);
};

const findUserById = (id) => User.findById(id).then((user) => {
  if (user) {
    return user;
  }
  throw new NotFoundError('User with specified _id not found');
});

module.exports.getUserId = (req, res, next) => {
  const { id } = req.params;
  findUserById(id)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof CastError) {
        next(
          new BadRequestError(
            'Incorrect data passed when searching for a user',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports.getCurrentUserInfo = (req, res, next) => {
  const { userId } = req.user;
  findUserById(userId)
    .then((user) => res.send(user))
    .catch(next);
};

const updateUserProfileData = (userId, data) => User.findByIdAndUpdate(userId, data, {
  new: true,
  runValidators: true,
}).then((user) => {
  if (user) {
    return user;
  }
  throw new NotFoundError('User with specified _id not found');
}).catch((err) => {
  if (err instanceof ValidationError) {
    throw new BadRequestError('Incorrect data sent when updating information');
  }
  throw err;
});

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { userId } = req.user;

  updateUserProfileData(userId, { name, about })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { userId } = req.user;

  updateUserProfileData(userId, { avatar })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};
