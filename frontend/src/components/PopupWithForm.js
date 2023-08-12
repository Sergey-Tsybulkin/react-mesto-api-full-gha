import React from "react";

function PopupWithForm({
  name,
  title,
  children,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  onLoading,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      id="popup-edit"
    >
      <div className="popup__container">
        <form
          name={name}
          className="popup__edit popup__edit_type_edit center"
          noValidate
          onSubmit={onSubmit}
        >
          <h3 className="popup__heading">{title}</h3>
          {children}
          <button
            type="submit"
            className={`popup__save ${onLoading ? "form__button-save_loading" : ""}`}
          >
            {buttonText}
          </button>
        </form>
        <button
          id="edit-close-button"
          type="button"
          className="popup__close popup__close_type_edit"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
