import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // user data will be use in components after download
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  // renew state
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // send values of components to external
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={onLoading ? `Сохранение` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading}
    >
      <input
        type="text"
        name="name"
        id="name-input"
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        type="text"
        name="about"
        id="about-input"
        className="popup__input popup__input_type_job"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        value={description || ""}
        onChange={handleChangeDescription}
      />
      <span className="popup__input-error about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
