import React from "react";

function Card({ card, onCardClick }) {
  const handleClick = () => {
    onCardClick(card);
  };

  return (
    <article className="element__article" onClick={handleClick} key={card.id}>
      <img
        src={card.link}
        alt={`imagen de ${card.name}`}
        className="element__img"
      />
      <button
        className="element__button-trash"
        aria-label="Eliminar tarjeta"
      ></button>
      <div className="element__data">
        <h2 className="element__title">{card.name}</h2>
        <p className="element__likes-count">{card.likes.length}</p>
        <button className="element__button-like" aria-label="Me gusta"></button>
      </div>
    </article>
  );
}

export default Card;
