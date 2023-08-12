import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_image ${card.link ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <img src={card.link} alt={card.name} className="popup__opened-image" />
        <h3 className="popup__opened-title">{card.name}</h3>
        <button
          id="image-close-button"
          type="button"
          className="popup__close popup__close_type_image"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
