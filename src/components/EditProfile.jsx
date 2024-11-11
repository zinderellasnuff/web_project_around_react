import React, { useContext, useEffect, useRef, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./Popup";

function EditProfile({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "")
    }
  }, [currentUser])

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else {
      setDescription(value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });

  };

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="profile"
      title="Editar Perfil"
      isOpen={isOpen}
      onClose={onClose}
    >
      <label htmlFor="popup-name" className="popup__label">
        Nombre
      </label>
      <input
        onChange={handleChange}
        type="text"
        id="popup-name"
        name="name"
        className="popup__input"
        required
        minLength="3"
        maxLength="20"
        placeholder="Nombre"
      />
      <label htmlFor="popup-about" className="popup__label">
        Sobre mí
      </label>
      <input
        onChange={handleChange}
        type="text"
        id="popup-about"
        name="about"
        className="popup__input"
        required
        minLength="3"
        maxLength="100"
        placeholder="Sobre mí"
      />
    </PopupWithForm>
  );
}

export default EditProfile
