function Navbar() {
    return( 
        <>
        <header className="header">
        <h1>Header</h1>
    </header>
    
    <nav className="sticky navbar">
        <div className="brand  display__logo">
            <a href="#top" className="nav__link"> <span className="logo">RPLG1</span></a>
        </div>
    
        <input type="checkbox" id="nav" className="hidden" />
        <label for="nav" className="nav__open"><i></i><i></i><i></i></label>
        <div className="nav">
            <ul className="nav__items">
                <li className="nav__item"><a href="#home" className="nav__link">Home</a></li>
                <li className="nav__item"><a href="#about" className="nav__link">About</a></li>
                <li className="nav__item"><a href="#portfolio" className="nav__link">Portfolio</a></li>
                <li className="nav__item"><a href="#contact" className="nav__link">Contact</a></li>
            </ul>
        </div>
    </nav>
    
    <main>
        <section className="home">
            <div id="home">
                <h1>Home</h1>
            </div>
        </section>
        <section className="about">
            <div id="about">
                <h1>About</h1>
            </div>
        </section>
        <section className="portfolio">
            <div id="portfolio">
                <h1>Portfolio</h1>
            </div>
        </section>
        <section className="contact">
            <div id="contact">
                <h1>Contact</h1>
            </div>
        </section>
    </main>
    
    <footer className="footer">
        <h1>Footer</h1>
    </footer>
    </>
     )
}

export default Navbar;
