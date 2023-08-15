import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  // renew state
  function handleChangeName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangeUrl(e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // sent values of components to external
    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  useEffect(() => {
    setPlaceName("");
    setPlaceLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="photo"
      title="Новое место"
      buttonText={onLoading ? `Сохранение` : `Создать`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading}
    >
      <input
        type="text"
        name="name"
        id="heading-input"
        className="popup__input popup__input_type_title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={placeName}
        onChange={handleChangeName}
      />
      <span className="popup__input-error heading-input-error"></span>
      <input
        type="url"
        name="about"
        id="link-input"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        required
        value={placeLink}
        onChange={handleChangeUrl}
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
