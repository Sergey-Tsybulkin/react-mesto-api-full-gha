const { ValidationError } = require('mongoose').Error;
const { CastError } = require('mongoose').Error;
const Card = require('../models/card');

const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getCards = (req, res, next) => {
  Card
    .find({})
    .populate(['owner', 'likes'])
    // .then((cards) => res.send({ data: cards }))
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { userId } = req.user;
  Card
    .create({ name, link, owner: userId })
    // .then((card) => res.status(201).send({ data: card }))
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(
          new BadRequestError(
            'Incorrect data was sent when creating a card',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { id: cardId } = req.params;
  const { userId } = req.user;
  Card
    .findById({
      _id: cardId,
    })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Data for the specified id was not found');
      }
      const { owner: cardOwnerId } = card;
      if (cardOwnerId.valueOf() !== userId) {
        throw new ForbiddenError('No access rights');
      }
      return Card.findByIdAndDelete(cardId);
    })
    .then((deletedCard) => {
      if (!deletedCard) {
        throw new NotFoundError('The card has already been deleted');
      }
      // res.send({ data: deletedCard });
      res.send(deletedCard);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.user;
  Card
    .findByIdAndUpdate(
      cardId,
      {
        $addToSet: {
          likes: userId,
        },
      },
      {
        new: true,
      },
    )
    .then((card) => {
      // if (card) return res.send({ data: card });
      if (card) return res.send(card);
      throw new NotFoundError('Card with specified id not found');
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(
          new BadRequestError(
            'Incorrect data sent when adding a like to a card',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports.deleteLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.user;
  Card
    .findByIdAndUpdate(
      cardId,
      {
        $pull: {
          likes: userId,
        },
      },
      {
        new: true,
      },
    )
    .then((card) => {
      // if (card) return res.send({ data: card });
      if (card) return res.send(card);
      throw new NotFoundError('Data for the specified id was not found');
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(
          new BadRequestError(
            'Incorrect data sent when unliking a card',
          ),
        );
      } else {
        next(err);
      }
    });
};
