import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const avatarRef = React.useRef("");

  function handleChangeAvatar() {
    return avatarRef.current.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="ava"
      title="Обновить аватар"
      buttonText={onLoading ? `Сохранение` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading}
    >
      <input
        type="url"
        name="about"
        id="avatar-input"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на аватар"
        required
        ref={avatarRef}
        onChange={handleChangeAvatar}
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
