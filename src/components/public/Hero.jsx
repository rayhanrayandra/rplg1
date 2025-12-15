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
        "Laravel", "PHP", "TypeScript", "JavaScript", "Jest", "React", "Next.js", "TailwindCSS", "Node.js", "Express",
        "Git", "Docker", "MySQL", "MongoDB", "PostgreSQL",
        "Laravel", "PHP", "TypeScript", "JavaScript", "Jest", "React", "Next.js", "TailwindCSS", "Node.js", "Express",
        "Git", "Docker", "MySQL", "MongoDB", "PostgreSQL",
        "Laravel", "PHP", "TypeScript", "JavaScript", "Jest",
    ];

    // Gandakan list supaya marquee seamless
    const marqueeList = [...techList, ...techList];

    return (
        <section
            id="home"
            className="section relative overflow-hidden pt-20 min-h-screen flex items-center"
        >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 -z-10 opacity-30">
                <div className="w-full h-full bg-[linear-gradient(to_right,#999_1px,transparent_1px),linear-gradient(to_bottom,#999_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#444_1px,transparent_1px),linear-gradient(to_bottom,#444_1px,transparent_1px)] bg-[size:40px_40px]" />
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
                            onClick={() => scrollToSection("story")}
                            className="btn btn-primary outline-none dark:outline-1 dark:outline-secondary-light dark:outline-2"
                        >
                            Lihat Cerita
                        </button>
                    </div>
                </div>

                {/* Marquee Fixed Bottom */}
                <div className="fixed bottom-0 left-0 w-full overflow-hidden py-4 bg-white/60 dark:bg-black/40 backdrop-blur-md border-t border-gray-200/40 dark:border-gray-700/40 z-10">
                    {/* Fade kiri - kanan */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white dark:from-black to-transparent" />
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white dark:from-black to-transparent" />

                    <div className="flex items-center gap-14 animate-marquee whitespace-nowrap opacity-80 hover:opacity-100 transition">
                        {marqueeList.map((item, i) => (
                            <span key={i} className="font-normal tracking-wide text-[clamp(0.75rem,2vw,1.25rem)]">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
