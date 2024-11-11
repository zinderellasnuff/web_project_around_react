import "../pages/index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React, { useContext, useEffect, useState } from "react";
import CurrentUserContext from "./CurrentUserContext";
import api from "../utils/Api";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const user = await api.getUserInfo(); // O el método adecuado
        setCurrentUser(user);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    }

    fetchUserInfo();
  }, []); // Dependencias vacías para que solo se ejecute una vez cuando el componente se monte

  useEffect(() => {
    api.getInitialCards().then((data) => {
      // Asegúrate de que cada tarjeta tenga la propiedad likes, incluso si está vacía
      const normalizedCards = data.map((card) => ({
        ...card,
        likes: Array.isArray(card.likes) ? card.likes : [], // Si no tiene likes, asigna un array vacío
      }));
      setCards(normalizedCards);
    });
  }, []);


  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const handleUpdateUser = (data) => {
    (async () => {
      await api
        .setUserInfo(data)
        .then((newData) => {
          setCurrentUser(newData);
          closeAllPopups();
        })
        .catch((error) => console.error(error));
    })();
  };

  const handleAddPlaceSubmit = async (data) => {
    try {
      const newData = await api.addNewCard(data);
      setCards((prevCards) => [newData, ...prevCards]);
      closeAllPopups();
    } catch (error) {
      console.error(error);
    }
  };

  function handleUpdateAvatar({ avatar }) {
    api.setUpdateAvatar(avatar)
      .then((updateUser) => {
        setCurrentUser(updateUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.error('Error actualizando el avatar: ', err);
      });
  }

  const handleCardLike = (card) => {
    const updatedCards = cards.map((c) => {
      if (c._id === card._id) {
        // Cambiar el estado de "likes" al hacer click
        const isLiked = c.likes.some((like) => like._id === currentUser._id);
        const updatedLikes = isLiked
          ? c.likes.filter((like) => like._id !== currentUser._id)
          : [...c.likes, currentUser]; // Añadir o eliminar al like
        return { ...c, likes: updatedLikes };
      }
      return c;
    });

    setCards(updatedCards);

    // Verifica si card.likes está definido, y si no lo está, asigna un array vacío
    //const likes = card.likes || [];
    //const isLiked = likes.some((like) => like._id === currentUser._id); // Verifica si el usuario ya dio like

    //const userId = currentUser._id; // El ID del usuario que da el like

    //api.changeLikeCardStatus(card._id, !isLiked, userId)
    //  .then(updatedCard => {
    // Actualizar el estado de las tarjetas con el card actualizado
    //    setCards(prevCards =>
    //      prevCards.map(c => c._id === updatedCard._id ? updatedCard : c)
    //    );
    //  })
    //  .catch((error) => console.error('Error al actualizar like:', error));
  };
  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);
      setCards((state) =>
        state.filter((currentCard) =>
          currentCard._id !== card._id
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar, handleAddPlaceSubmit }}>
      <div className="page">
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          handleCardClick={handleCardClick}
          selectedCard={selectedCard}
          closeAllPopups={closeAllPopups}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
