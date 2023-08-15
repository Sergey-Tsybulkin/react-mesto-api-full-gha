import getResponseData from "./utils";
export const BASE_URL = "https://api.sereg1ns.nomoreparties.co";


export const register = (email, password) => {
  return fetch(`${BASE_URL}/sign-up`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then((res) => getResponseData(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/sign-in`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then((res) => getResponseData(res));
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    }
  }).then((res) => getResponseData(res));
};
