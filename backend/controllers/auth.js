const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// const someSecretKey = '$2b$10$GWl4u9KstqG57OdgUooKUO1o9hkH9lvXFMOAqpF04j.Pg9H5M9DRS';


const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.registrationUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      const { _id } = user;
      return res.status(201).send({
        email,
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        throw new ConflictError(
          'Already have user with this datas',
        );
      }
      throw new BadRequestError(
        'User data incorrect',
      );
    })
    .catch(next);
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User
    .findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      const token = jwt.sign({ userId }, config.someSecretKey, { expiresIn: '7d' });
      return res.send({ token });
      })
      .catch(() => {
        next(new UnauthorizedError('Wrong email or password'));
    })
};
