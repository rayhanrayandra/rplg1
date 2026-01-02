const Hero = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Tambahkan list lebih lengkap
    const techList = [
        "React", "Next.js", "TailwindCSS", "Node.js", "Express",
        "Git", "Docker", "MySQL", "MongoDB", "PostgreSQL",
        "Laravel", "PHP", "TypeScript", "JavaScript", "Jest",
    ];

    // Gandakan list supaya marquee seamless
    const marqueeList = [...techList, ...techList, ...techList, ...techList];

    return (
        <>
            <section
                id="home"
                className="section relative overflow-hidden pt-20 min-h-screen flex items-center"
            >
                {/* Background Dot Pattern - Clean dengan opacity rendah */}
                <div className="absolute inset-0 -z-10">
                    <div 
                        className="w-full h-full bg-[radial-gradient(circle,_#9999_1px,_transparent_2px)] 
                        dark:bg-[radial-gradient(circle,_#333_1px,_transparent_2px)]"
                        style={{
                            backgroundSize: '20px 20px',
                            backgroundPosition: '0 0'
                        }}
                    />
                    
                    {/* Overlay gradien halus */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/50 
                        dark:via-black/20 dark:to-black/40" />
                </div>

                <div className="container relative">
                    <div className="max-w-4xl center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin leading-tight mb-6">
                            <span className="block">Ini cerita kami</span>
                            <span className="block">tentang mimpi, belajar, dan tumbuh.</span>
                            <span className="block text-gray-400 dark:text-dark-text-accent">
                                Yuk, ikut sebentar.
                            </span>
                        </h1>

                        <p className="text-xl sm:text-xl text-gray-600 dark:text-dark-text-secondary mb-8 max-w-2xl font-thin">
                            Setiap baris kode nyimpen cerita, tiap desain ninggalin jejak.
                            Ngerangkai momen kecil jadi pengalaman digital yang lebih
                            dari sekadar layar.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => scrollToSection("story")}
                                className="btn btn-primary outline-none dark:outline-1 dark:outline-secondary-light"
                            >
                                Lihat Cerita
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            
            <div className="sticky bottom-0 left-0 w-full overflow-hidden py-4 
                bg-white dark:bg-black
                border-y border-gray-400/20 dark:border-gray-600/30">

                {/* Fade kiri kanan */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-24 
                  bg-gradient-to-r from-white dark:from-black to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-24 
                  bg-gradient-to-l from-white dark:from-black to-transparent" />

                {/* Track */}
                <div className="flex w-fit animate-marquee">
                    {marqueeList.map((item, i) => (
                        <span
                            key={i}
                            className="mx-7 font-normal tracking-wide 
                   text-[clamp(0.75rem,2vw,1.25rem)] 
                   whitespace-nowrap opacity-80 hover:opacity-100 transition"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Hero;