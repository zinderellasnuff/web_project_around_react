import React, { useContext, useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function NewCard({ isOpen, onClose, onAddPlaceSubmit }) {
  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else {
      setLink(value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlaceSubmit({
      name: title,
      link: link,
    });
  };


  return (
    <PopupWithForm
      name="card"
      title="Nueva Tarjeta"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="card-name" className="popup__label">
        Título
      </label>
      <input
        onChange={handleChange}
        type="text"
        id="card-name"
        className="popup__input"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        required
        value={title}
        name="title"
      />
      <label htmlFor="card-image" className="popup__label">
        URL de la imagen
      </label>
      <input
        onChange={handleChange}
        type="url"
        id="card-image"
        className="popup__input"
        placeholder="URL de la imagen"
        required
        value={link}
        name="link"
      />
    </PopupWithForm>
  )
}

export default NewCard;
