import React, { useState, useContext } from "react";
import Popup from "./Popup"; // Asegúrate de importar el Popup correctamente
import ImagePopup from "./ImagePopup";
import Card from "./Card ";
import CurrentUserContext from "../contexts/CurrentUserContext";
import buttonEdit from "../images/profile__button-edit.svg";

function Main({
                onEditProfileClick,
                onEditAvatarClick,
                onAddPlaceClick,
                handleCardClick,
                selectedCard,
                closeAllPopups,
                cards,
                onCardLike,
                onCardDelete,
              }) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  // Estado para abrir/cerrar el popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Función para abrir el popup
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Función para cerrar el popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Manejo de envío del formulario del popup
  const handlePopupSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para procesar el formulario
    closePopup();
  };

  return (
      <main className="content">
        <section className="profile">
          <div className="profile__avatar">
            <img
                src={currentUser.avatar}
                alt="Foto de Perfil"
                className="profile__image"
            />
            <div
                className="profile__avatar-edit-icon"
                onClick={onEditAvatarClick}
            >
              <img src={buttonEdit} alt="Editar foto de perfil" />
            </div>
          </div>

          <div className="profile__info">
            <div className="profile__info-content">
              <h5 className="profile__info-name">{currentUser.name}</h5>
              <button
                  className="profile__info-button"
                  aria-label="Editar perfil"
                  onClick={onEditProfileClick}
              ></button>
            </div>
            <p className="profile__info-subtitle">{currentUser.about}</p>
          </div>

          <div className="profile__container">
            <button
                className="profile__button-add"
                aria-label="Añadir tarjeta"
                onClick={onAddPlaceClick}
            ></button>
          </div>
        </section>

        <div className="elements__container">
          {cards.map((card) => {
            const isOwn = card.owner === currentUser._id;
            const isLiked = card && card.likes && card.likes.some((like) => like._id === currentUser._id);

            const cardDeleteButtonClassName = `element__button-trash ${isOwn ? 'element__button-trash_visible' : 'element__button-trash_hidden'}`;
            const cardLikeButtonClassName = `element__button-like ${isLiked ? 'element__button-like-active' : ''}`;

            return (
                <Card
                    key={card._id}
                    card={card}
                    onCardClick={handleCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                    cardLikeButtonClassName={cardLikeButtonClassName}
                    cardDeleteButtonClassName={cardDeleteButtonClassName}
                    isOwn={isOwn}
                />
            );
          })}
        </div>

        {/* Aquí incluyes el Popup */}
        <Popup
            name="profile"
            title="Editar Perfil"
            isOpen={isPopupOpen}
            onClose={closePopup}
            onSubmit={handlePopupSubmit}
        >
          <input type="text" name="name" placeholder="Nombre" />
          <input type="text" name="about" placeholder="Acerca de mí" />
        </Popup>

        <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />
      </main>
  );
}

export default Main;
