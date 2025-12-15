import Hero from '../components/public/Hero';
import Story from '../components/public/Story';
import ClassStructure from '../components/public/ClassStructure';
import Journey from '../components/public/Journey';
import Gallery from '../components/public/Gallery';
import Ngl from '../components/public/Ngl';
import Footer from '../components/public/Footer';
import Navigation from '../components/public/Navigation';

const PublicPage = () => {
    return (
        <div className="min-h-screen snap-y snap-proximity scroll-smooth">
            <Navigation />
            <main>
                <Hero />
                <Story />
                <ClassStructure />
                <Journey />
                <Gallery />
                <Ngl />
            </main>
            <Footer />
        </div>
    );
};

export default PublicPage;

