function Popup({ name, title, children, isOpen, onClose, onSubmit }) {
  return (
    <div
      className={`popup popup_type-${name} ${isOpen ? "popup_is-opened" : ""}`}
    >
      <div className="popup__content">
        <button
          className="popup__close-button"
          onClick={onClose}
          aria-label="Cerrar"
        >
          &times;
        </button>
        <h3 className="popup__title">{title}</h3>
        <form
          onSubmit={onSubmit}
          className="popup__form"
          name={`${name}-form`}
          noValidate
        >
          {children}
          <button type="submit" className="popup__button">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Popup;
