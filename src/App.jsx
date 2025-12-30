import { ThemeProvider } from './contexts/ThemeContext';
import Hero from './components/Hero';
import Story from './components/Story';
import ClassStructure from './components/ClassStructure';
import Journey from './components/Journey';
import Ngl from './components/Ngl';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen snap-y snap-proximity scroll-smooth">
        <Navigation />
        <main>
          <Hero />
          <Story />
          <ClassStructure />
          <Journey />
          <Ngl />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;

