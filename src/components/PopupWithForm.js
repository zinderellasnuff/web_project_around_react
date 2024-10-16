import { Children } from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type-${props.name} ${
        props.isOpen ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__content">
        <button className="popup__close-button" onClick={props.isClose}>
          &times;
        </button>
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form" name={`${props.name}-form`} noValidate>
          {props.children}
          <button type="submit" className="popup__button">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
