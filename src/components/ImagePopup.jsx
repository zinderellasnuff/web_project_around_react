function ImagePopup({ selectedCard, onClose }) {
  return (
    <div className={`modal ${selectedCard ? "modal_is-opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
        <img
          className="modal__image"
          src={selectedCard ? selectedCard.link : ""}
          alt={selectedCard ? `imagen de ${selectedCard.name}` : ""}
        />
        <p className="modal__caption">
          {selectedCard ? selectedCard.name : ""}
        </p>
      </div>
    </div>
  );
}

export default ImagePopup;
