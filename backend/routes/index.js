const router = require('express').Router();
const auth = require('../middlewares/auth');
const signInRouter = require('./signin');
const signUpRouter = require('./signup');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');

// Routes for Authentication
router.use('/', signInRouter);
router.use('/', signUpRouter);

router.use(auth);

// Routes for users
router.use('/users', usersRouter);

// Routes for cards
router.use('/cards', cardsRouter);

// Handling non-existent routes
router.use((req, res, next) => next(new NotFoundError('The page at the requested URL does not exist')));

module.exports = router;
