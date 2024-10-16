import buttonEdit from "../images/profile__button-edit.svg";
import React, { useEffect } from "react";
import api from "../utils/Api";
import Card from "./Card ";
import ImagePopup from "./ImagePopup";

function Main({
  onEditProfileClick,
  onEditAvatarClick,
  onAddPlaceClick,
  handleCardClick,
  selectedCard,
  closeAllPopups,
}) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => console.error(err));
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={userAvatar}
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
            <h5 className="profile__info-name">{userName}</h5>
            <button
              className="profile__info-button"
              aria-label="Editar perfil"
              onClick={onEditProfileClick}
            ></button>
          </div>
          <p className="profile__info-subtitle">{userDescription}</p>
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
        {cards.map((card) => (
          <Card key={card.id} card={card} onCardClick={handleCardClick} />
        ))}
      </div>

      <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />

      {/*<-- Popup para actualizar la foto de perfil -->*/}

      {/*<!-- Popup para editar el perfil -->*/}

      {/*<!-- Popup para añadir nueva tarjeta -->*/}
    </main>
  );
}

export default Main;
