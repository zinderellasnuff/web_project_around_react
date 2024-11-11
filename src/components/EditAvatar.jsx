import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function EditAvatar({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const avatar = avatarInputRef.current.value;

    if (avatar) {
      onUpdateAvatar({
        avatar,
      });

    }
  }
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="avatar"
      title="Actualizar foto de perfil"
      isOpen={isOpen}
      onClose={onClose}
    >
      <input
        ref={avatarInputRef}
        type="url"
        id="avatar-url"
        className="popup__input"
        placeholder="Enlace de la nueva imagen"
        required
      />
    </PopupWithForm>
  )
}

export default EditAvatar;
