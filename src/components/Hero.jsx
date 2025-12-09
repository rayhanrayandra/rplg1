const Hero = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="section relative overflow-hidden pt-20 min-h-screen flex items-center">

            {/* Background Grid Pattern */}
            <div className="absolute inset-0 -z-10 opacity-20 dark:opacity-25">
                <div
                    className="w-full h-full bg-[linear-gradient(to_right,#ccc_1px,transparent_1px),linear-gradient(to_bottom,#ccc_1px,transparent_1px)] 
                               bg-[size:40px_40px]"
                />
            </div>

            <div className="container relative">
                <div className="max-w-4xl">

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight mb-6">
                        <span className="block">Ini cerita kami</span>
                        <span className="block">tentang mimpi, belajar, dan tumbuh.</span>
                        <span className="block text-gray-400 dark:text-dark-text-accent">
                            Yuk, ikut sebentar.
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-600 dark:text-dark-text-secondary mb-8 max-w-2xl">
                        Setiap baris kode nyimpen cerita, tiap desain ninggalin jejak.
                        Ngerangkai momen kecil jadi pengalaman digital yang lebih
                        dari sekadar layar.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => scrollToSection('work')}
                            className="btn btn-secondary"
                        >
                            Lihat Pengalaman
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
