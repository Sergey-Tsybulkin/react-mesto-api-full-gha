import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content center">
      <section className="profile center">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
          <button
            type="button"
            className="profile__avatar-button"
            id="avatar-button"
            onClick={() => {
              onEditAvatar(true);
            }}
          ></button>
        </div>
        <div className="profile__edit-avatar"></div>
        <div className="profile__info">
          <h1 className="profile__title hide-text">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={() => {
              onEditProfile(true);
            }}
          ></button>
          <p className="profile__subtitle hide-text">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button profile__type profile__type_add-button"
          type="button"
          onClick={() => {
            onAddPlace(true);
          }}
        ></button>
      </section>

      <section className="center">
        <ul className="elements">
        {cards.toString().slice(0).reverse().map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
