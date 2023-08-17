import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const { enteredValues, errors, handleChange, isFormValid, resetForm } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: enteredValues.avatar
    });
  }

  useEffect(() => {
    resetForm()
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      name="ava"
      title="Обновить аватар"
      buttonText={onLoading ? `Сохранение` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading}
      isDisabled={!isFormValid}
    >
      <input
        type="url"
        name="avatar"
        id="avatar-input"
        // className="popup__input popup__input_type_link popup__input_type_error"
        className={errors.avatar ? 'popup__input popup__input_type_link popup__input_type_error' : "popup__input popup__input_type_link"}
        placeholder="Ссылка на аватар"
        required
        value={enteredValues.avatar || ''}
        onChange={handleChange} />
      <span className="popup__input-error avatar-input-error">{errors.avatar}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
