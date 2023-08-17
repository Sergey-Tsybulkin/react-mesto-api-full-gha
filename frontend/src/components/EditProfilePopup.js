import React, { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import useForm from '../hooks/useForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading  }) {
  const currentUser = useContext(CurrentUserContext);
  const { enteredValues, errors, handleChange, isFormValid, resetForm } = useForm();

  // user data will be use in components after download
  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: enteredValues.name,
      about: enteredValues.about,
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
      isDisabled={!isFormValid}>
      <input
        type="text"
        name="name"
        id="name-input"
        // className="popup__input popup__input_type_name"
        className={errors.name ? 'popup__input popup__input_type_name popup__input_type_error' : "popup__input popup__input_type_name"}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={enteredValues.name || ''}
        onChange={handleChange} />
      <span className="popup__input-error name-input-error">{errors.name}</span>
      <input
        type="text"
        name="about"
        id="about-input"
        // className="popup__input popup__input_type_job"
        className={errors.about ? 'popup__input popup__input_type_job popup__input_type_error' : "popup__input popup__input_type_job"}
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        value={enteredValues.about || ''}
        onChange={handleChange} />
      <span className="popup__input-error about-input-error">{errors.about}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
