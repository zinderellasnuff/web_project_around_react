# web_project_around_react

Este proyecto es una aplicación de React que permite a los usuarios visualizar, agregar, editar y eliminar tarjetas con imágenes, así como interactuar con otras funcionalidades de perfil y avatar. La aplicación incluye varios componentes y utiliza una API para gestionar datos de usuario y tarjetas.

## Tecnologías utilizadas
- **React**: Biblioteca de JavaScript para construir la interfaz de usuario.
- **Context API**: Para manejar el estado del usuario en la aplicación.
- **API personalizada**: Para obtener y actualizar la información del usuario y las tarjetas.

## Estructura del proyecto
- `App.js`: Componente principal de la aplicación que controla el estado global y renderiza otros componentes.
- `Header.js`: Componente que contiene la cabecera de la aplicación.
- `Main.js`: Componente que maneja el contenido principal y las tarjetas.
- `Footer.js`: Componente que contiene el pie de página.
- `EditAvatarPopup.js`: Popup para editar el avatar del usuario.
- `EditProfilePopup.js`: Popup para editar el perfil del usuario.
- `AddPlacePopup.js`: Popup para agregar una nueva tarjeta.
- `CurrentUserContext.js`: Contexto de usuario actual para manejar datos de usuario en toda la aplicación.
- `Api.js`: Módulo que contiene métodos para interactuar con la API del backend.

## Funcionalidades principales

### Obtener y actualizar datos del usuario
La aplicación utiliza `fetchUserInfo` dentro de `useEffect` para obtener la información del usuario actual al cargar la aplicación y actualizarla cuando sea necesario. El `CurrentUserContext` permite que los datos del usuario estén disponibles en varios componentes.

### Manejo de tarjetas
- **Visualización de tarjetas**: Las tarjetas se obtienen de la API con `getInitialCards`.
- **Like y unlike de tarjetas**: La función `handleCardLike` permite a los usuarios dar like o quitarlo.
- **Eliminar tarjetas**: La función `handleCardDelete` permite a los usuarios eliminar una tarjeta propia.

### Popups
Cada popup permite realizar una acción específica:
- **Editar Avatar**: Cambia el avatar del usuario.
- **Editar Perfil**: Actualiza el nombre y la descripción del perfil del usuario.
- **Agregar nueva tarjeta**: Permite agregar una tarjeta con una imagen y un título.

## Instalación y configuración

1. Clona este repositorio:
    ```bash
    git clone https://github.com/zinderellasnuff/web_project_around_react.git
    ```
