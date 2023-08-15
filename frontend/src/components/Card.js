import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `elements__trash ${
    isOwn ? "elements__trash_show" : "elements__trash_hide"
  }`;

  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = `elements__like-button ${
    isLiked ? "elements__like-button_disabled" : ""
  }`;

  function handleCardClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="elements__element">
      <img
        className="elements__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>

      <div className="elements__info">
        <h2 className="elements__caption hide-text">{card.name}</h2>
        <div className="elements__like-section">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="elements__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
export default Card;
