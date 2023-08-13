import checkResponse from "./utils";

class Api {
  constructor(options) {
    // receive url server and headers
    this._headers = options.headers;
    this._url = options.baseUrl;
  }


  // request to server and get data profile
  getProfile() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => checkResponse(res));
  }

  // change profile info on server
  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name, //name = value name object (editProfile(data))
        about: data.about, //about = value about object (editProfile(data))
      }),
    }).then((res) => checkResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => checkResponse(res));
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => checkResponse(res));
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => checkResponse(res));
  }

  // like/dislike
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${!isLiked ? "DELETE" : "PUT"}`,
      headers: this._headers,
    }).then((res) => checkResponse(res));
  }
}

const api = new Api({
  baseUrl: "https://api.sereg1ns.nomoreparties.co",
  headers: {
    authorization: "e5cf9ce5-83ea-4919-bb56-96280137220a",
    "Content-Type": "application/json",
  },
});

export default api;
