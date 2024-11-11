import logo from "../images/logo.png";

function Header() {
  return (
    <>
      <header className="header">
        <img
          src={logo}
          className="header__logo"
          alt="Logotipo de nuestra página"
        />
        <hr className="header__line" />
      </header>
    </>
  );
}

export default Header;
