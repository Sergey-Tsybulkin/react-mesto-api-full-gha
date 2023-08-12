export const editButton = document.querySelector('.profile__edit-button');
export const formEditProfile = document.querySelector('.popup__edit_type_edit');
export const popupFormAdd = document.querySelector('.popup__edit_type_add');
export const buttonAvatar = document.querySelector('.profile__avatar-button');
export const formAvatar = document.querySelector('.update-avatar');
export const addButton = document.querySelector('.profile__type_add-button');
export const nameInput = formEditProfile.querySelector('#name-input');
export const aboutInput = formEditProfile.querySelector('#about-input');

export const cardConfig = {
  formSelector: '.popup__edit',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_type_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};
