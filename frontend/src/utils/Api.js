import getResponseData from "./utils";

class Api {
  constructor(options) {
    // receive url server and headers
    this._headers = options.headers;
    this._url = options.baseUrl;
  }


  // request to server and get data profile
  getProfile() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => getResponseData(res))
  }

  // change profile info on server
  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name, //name = value name object (editProfile(data))
        about: data.about //about = value about object (editProfile(data))
      })
    }).then((res) => getResponseData(res))
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => getResponseData(res))
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then((res) => getResponseData(res))
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then((res) => getResponseData(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    }).then((res) => getResponseData(res))
  }

  // like/dislike
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${!isLiked ? 'DELETE' : 'PUT'}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    }).then((res) => getResponseData(res))
  }
}

const api = new Api({
  baseUrl: "https://api.sereg1ns.nomoreparties.co",
  // headers: {
  //   "Content-Type": "application/json",
  //   authorization: `Bearer ${localStorage.getItem("jwt")}`,
  // },
});

export default api;
