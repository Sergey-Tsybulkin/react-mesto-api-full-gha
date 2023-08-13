const router = require('express').Router();

const {
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
  deleteLikeCardValidation,
} = require('../validations/cardsValidation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
} = require('../controllers/cards');

// const {
//   getCards,
//   createCard,
//   deleteCard,
//   likeCard,
//   deleteLikeCard,
// } = require('../controllers/cards');

router.get('/', getCards); // Finding all cards
router.post('/', createCardValidation, createCard); // Create a card
router.delete('/:id', deleteCardValidation, deleteCard); // Delete a card
router.put('/:cardId/likes', likeCardValidation, likeCard); // Like the card
router.delete('/:cardId/likes', deleteLikeCardValidation, deleteLikeCard); // Removing a like from a card

module.exports = router;
