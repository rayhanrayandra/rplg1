import './App.css'
import Navbar from './components/navbar'
import Home from './components/home'
import About from './components/about'
import Portfolio from './components/portfolio'
import Contact from './components/contact'
import Footer from './components/footer'
import Header from './components/header'

function App() {

  return (
    <>
    <div className="snap-scroll">
    <Header />
    <Navbar />
    <Home />
    <About />
    <Portfolio />
    <Contact />
    <Footer />
    </div>
    </>
  )
}

export default App;
