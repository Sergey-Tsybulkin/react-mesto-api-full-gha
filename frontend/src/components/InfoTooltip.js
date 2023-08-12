import React from "react";
import successImage from "../images/success-image.svg";
import unsuccessImage from "../images/fail-image.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup popup_type_auth ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__auth">
        <button
          id="success-close-button"
          type="button"
          className="popup__close"
          onClick={onClose}
        />
        <img
          className="popup__signup-image"
          src={`${isSuccess ? successImage : unsuccessImage}`}
          alt=""
        />
        <h2 className="popup__signup-title">{`${
          isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."
        }`}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
