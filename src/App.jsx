import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Story from './components/Story';
import Footer from './components/Footer';
import Journey from './components/Journey';
import Ngl from './components/Ngl';
import ClassStructure from './components/ClassStructure';
import Gallery from './components/Gallery';
import Connect from './components/Connect';


function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <Hero />
          <Story />
          <ClassStructure />
          <Journey />
          <Gallery />
          {/* <Connect /> */}
          <Ngl />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;