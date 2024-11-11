import buttonEdit from "../images/profile__button-edit.svg";
import React, { useContext, useEffect, useState } from "react";
import ImagePopup from "./ImagePopup";
import Card from "./Card "
import CurrentUserContext from "../contexts/CurrentUserContext";

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
          // Verificar si el propietario de la tarjeta es el usuario actual
          const isOwn = card.owner === currentUser._id;
          console.log(isOwn);
          // Verificar si la tarjeta ya está "liked" por el usuario
          const isLiked = card && card.likes && card.likes.some((like) => like._id === currentUser._id);

          // Definir las clases para los botones de "delete" y "like"
          const cardDeleteButtonClassName = `element__button-trash ${isOwn ? 'element__button-trash_visible' : 'element__button-trash_hidden'}`;
          const cardLikeButtonClassName = `element__button-like ${isLiked ? 'element__button-like-active' : ''}`;
          console.log(cardDeleteButtonClassName)

          console.log("card.owner._id:", card.owner._id);
          console.log("currentUser._id:", currentUser._id);
          console.log("card:", card);
          // Retornar el componente Card con las props necesarias
          return (
            <Card
              key={card._id} // Usar _id como la key para cada tarjeta
              card={card}
              onCardClick={handleCardClick} // Manejador del clic en la tarjeta (para ver detalles)
              onCardLike={onCardLike} // Función para manejar el like
              onCardDelete={onCardDelete} // Función para manejar el delete
              cardLikeButtonClassName={cardLikeButtonClassName} // Clases para el botón de like
              cardDeleteButtonClassName={cardDeleteButtonClassName} // Clases para el botón de delete
              isOwn={isOwn} // Indicador si la tarjeta es del usuario actual
            />
          );
        })}
      </div>


      <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />
    </main>
  );
}

export default Main;
