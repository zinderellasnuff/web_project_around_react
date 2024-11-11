class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // Obtener información del usuario
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Establecer la información del usuario
  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  // Obtener listado de tarjetas
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Actualizar información del usuario
  updateUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about }),
    }).then(this._checkResponse);
  }

  // Agregar una nueva tarjeta
  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  // Eliminar una tarjeta
  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Añadir "me gusta" a una tarjeta
  likeCard(_id, userId) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({ userId }), // Enviar el ID del usuario
    }).then(this._checkResponse);
  }

  unlikeCard(_id, userId) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({ userId }), // Enviar el ID del usuario
    }).then(this._checkResponse);
  }

  // Cambiar el estado de "me gusta" de una tarjeta
  changeLikeCardStatus(_id, isLiked, userId) {
    if (isLiked) {
      return this.likeCard(_id, userId);
    } else {
      return this.unlikeCard(_id, userId);
    }
  }


  // Actualizar el avatar del usuario
  setUpdateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "6cd6e144-d49d-46d4-b04b-c07cd75377a8",
    "Content-Type": "application/json",
  },
});

export default api;
