function Navbar() {
  return (
    <>
      <nav className="sticky navbar">
        <div className="brand  display__logo">
          <a href="#top" className="nav__link">
            {" "}
            <span className="logo">RPLG1</span>
          </a>
        </div>

        <input type="checkbox" id="nav" className="hidden" />
        <label for="nav" className="nav__open">
          <i></i>
          <i></i>
          <i></i>
        </label>
        <div className="nav">
          <ul className="nav__items">
            <li className="nav__item">
              <a href="#home" className="nav__link">
                Home
              </a>
            </li>
            <li className="nav__item">
              <a href="#about" className="nav__link">
                About
              </a>
            </li>
            <li className="nav__item">
              <a href="#portfolio" className="nav__link">
                Portfolio
              </a>
            </li>
            <li className="nav__item">
              <a href="#contact" className="nav__link">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
