import "../pages/index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React from "react";
import PopupWithForm from "./PopupWithForm";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="page">
      <Header />

      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        handleCardClick={handleCardClick}
        selectedCard={selectedCard}
        closeAllPopups={closeAllPopups}
      />

      <PopupWithForm
        name="profile"
        title="Editar Perfil"
        isOpen={isEditProfilePopupOpen}
        isClose={closeAllPopups}
      >
        <label for="popup-name" className="popup__label">
          Nombre
        </label>
        <input
          type="text"
          id="popup-name"
          name="name"
          className="popup__input"
          required
          minlength="2"
          maxlength="40"
          placeholder="Nombre"
        />
        <label for="popup-about" className="popup__label">
          Sobre mí
        </label>
        <input
          type="text"
          id="popup-about"
          name="about"
          className="popup__input"
          required
          minlength="2"
          maxlength="200"
          placeholder="Sobre mí"
        />
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        title="Actualizar foto de perfil"
        isOpen={isEditAvatarPopupOpen}
        isClose={closeAllPopups}
      >
        <input
          type="url"
          id="avatar-url"
          className="popup__input"
          placeholder="Enlace de la nueva imagen"
          required
        />
      </PopupWithForm>

      <PopupWithForm
        name="card"
        title="Nueva Tarjeta"
        isOpen={isAddPlacePopupOpen}
        isClose={closeAllPopups}
      >
        <label for="card-name" className="popup__label">
          Título
        </label>
        <input
          type="text"
          id="card-name"
          className="popup__input"
          placeholder="Título"
          minlength="2"
          maxlength="30"
          required
        />
        <label for="card-image" className="popup__label">
          URL de la imagen
        </label>
        <input
          type="url"
          id="card-image"
          className="popup__input"
          placeholder="URL de la imagen"
          required
        />
      </PopupWithForm>
      <Footer />
    </div>
  );
}

export default App;
