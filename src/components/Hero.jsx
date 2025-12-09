const Hero = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="section pt-20 min-h-screen flex items-center">
            <div className="container">
                <div className="max-w-4xl">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight mb-6">
                        <span className="block">In the echoes of</span>
                        <span className="block">yesterday's dreams,</span>
                        <span className="block text-gray-400 dark:text-dark-text-accent">
                            tomorrow takes shape.
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-600 dark:text-dark-text-secondary mb-8 max-w-2xl">
                        Every line of code carries a story, every design holds a memory.
                        Turning moments into timeless digital experiences.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => scrollToSection('work')}
                            className="btn btn-secondary"
                        >
                            Get Experiences
                        </button>
                        {/* <button
                            onClick={() => scrollToSection('contact')}
                            className="btn btn-secondary"
                        >
                            Get in Touch
                        </button> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;