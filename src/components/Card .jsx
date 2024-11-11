import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";


function Card({
  card,
  onCardClick,
  onCardDelete,
  onCardLike,
  isOwn,
  cardDeleteButtonClassName,
  cardLikeButtonClassName,
}) {
  const handleLikeClick = (e) => {
    e.stopPropagation(); // Prevenir que el clic se propague al hacer clic en "Me gusta"
    onCardLike(card); // Llamar a la función para manejar el like
  };

  const handleClick = () => {
    onCardClick(card); // Llamar a la función de clic en la tarjeta
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevenir que el clic se propague al hacer clic en "Eliminar"
    onCardDelete(card); // Llamar a la función para eliminar la tarjeta
  };

  return (
    <article className="element__article" onClick={handleClick}>
      <img
        src={card.link}
        alt={`Imagen de ${card.name}`}
        className="element__img"
      />
      {isOwn && (
        <button
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
          aria-label="Eliminar tarjeta"
        ></button>
      )}
      <div className="element__data">
        <h2 className="element__title">{card.name}</h2>
        <p className="element__likes-count">
          {card.likes?.length || 0} {/* Contar los likes o mostrar 0 si no tiene likes */}
        </p>
        <button
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
          aria-label="Me gusta"
        ></button>
      </div>
    </article>
  );
}

export default Card;
