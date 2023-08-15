import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const { enteredValues, errors, handleChange, isFormValid, resetForm } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: enteredValues.title,
      link: enteredValues.link
    });
  }

  useEffect(() => {
    resetForm()
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      name="photo"
      title="Новое место"
      buttonText={onLoading ? `Сохранение` : `Создать`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading}
      isDisabled={!isFormValid}>
      <input
        type="text"
        name="name"
        id="heading-input"
        className="popup__input popup__input_type_title"
////////////////////
////////////////////

        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={enteredValues.title || ''}
        onChange={handleChange} />
      <span className="popup__input-error heading-input-error">{errors.title}</span>
      <input
        type="url"
        name="about"
        id="link-input"
        className="popup__input popup__input_type_link"
        ////////////////////////////////////////
        placeholder="Ссылка на картинку"
        required
        value={enteredValues.link || ''}
        onChange={handleChange} />
      <span className="popup__input-error link-input-error">{errors.link}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
