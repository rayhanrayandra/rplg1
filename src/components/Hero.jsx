import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
    SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiExpress,
    SiGit, SiDocker, SiMysql, SiMongodb, SiPostgresql,
    SiLaravel, SiPhp, SiTypescript, SiJavascript, SiJest
} from "react-icons/si";

const Hero = () => {
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    /* ================= RESPONSIVE ================= */
    const [isMobile, setIsMobile] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const check = () => {
            setIsMobile(window.innerWidth < 640);
            setPrefersReducedMotion(
                window.matchMedia("(prefers-reduced-motion: reduce)").matches
            );
        };

        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const marqueeDuration = prefersReducedMotion
        ? 0
        : isMobile
            ? 75
            : 45;

    /* ================= TECH ================= */
    const techList = [
        { name: "React", icon: SiReact },
        { name: "Next.js", icon: SiNextdotjs },
        { name: "TailwindCSS", icon: SiTailwindcss },
        { name: "Node.js", icon: SiNodedotjs },
        { name: "Express", icon: SiExpress },
        { name: "Git", icon: SiGit },
        { name: "Docker", icon: SiDocker },
        { name: "MySQL", icon: SiMysql },
        { name: "MongoDB", icon: SiMongodb },
        { name: "PostgreSQL", icon: SiPostgresql },
        { name: "Laravel", icon: SiLaravel },
        { name: "PHP", icon: SiPhp },
        { name: "TypeScript", icon: SiTypescript },
        { name: "JavaScript", icon: SiJavascript },
        { name: "Jest", icon: SiJest },
    ];

    const marqueeList = [...techList, ...techList, ...techList, ...techList];

    /* ================= ANIMATION ================= */
    const container = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.18 } },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <section
            id="home"
            className="relative min-h-screen pt-24 pb-28 flex items-center overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div
                    className="w-full h-full bg-[radial-gradient(circle,_#9999_1px,_transparent_2px)]
          dark:bg-[radial-gradient(circle,_#333_1px,_transparent_2px)]"
                    style={{ backgroundSize: "20px 20px" }}
                />
                <div
                    className="absolute inset-0 bg-gradient-to-b
          from-transparent via-white/30 to-white/50
          dark:via-black/20 dark:to-black/40"
                />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6">
                <motion.div
                    className="max-w-4xl"
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin leading-tight mb-8"
                        variants={container}
                    >
                        <motion.span className="block" variants={item}>
                            Ini cerita kami.
                        </motion.span>
                        <motion.span className="block" variants={item}>
                            tentang mimpi, belajar,
                        </motion.span>
                        <motion.span className="block mb-6" variants={item}>
                            dan tumbuh.
                        </motion.span>
                        <motion.span
                            className="block text-gray-400 dark:text-gray-500"
                            variants={item}
                        >
                            Yuk, ikut sebentar.
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        className="max-w-2xl text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 font-thin"
                        variants={item}
                    >
                        Setiap baris kode menyimpan cerita, setiap desain meninggalkan jejak.
                        Kami merangkai momen kecil menjadi pengalaman digital yang bermakna.
                    </motion.p>

                    <motion.button
                        onClick={() => scrollToSection("story")}
                        className="btn btn-primary px-8 py-3 text-lg border dark:border-white"
                        variants={item}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Lihat Cerita
                    </motion.button>
                </motion.div>
            </div>

            {/* ================= MARQUEE ================= */}
            <div
                className="absolute bottom-0 left-0 w-full overflow-hidden
        py-1.5 sm:py-3
        bg-gradient-to-t from-white/95 via-white/90 to-white/95
        dark:from-black/95 dark:via-black/90 dark:to-black/95
        border-t border-gray-300/30 dark:border-gray-700/30"
            >
                {/* Fade */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-20 sm:w-24
          bg-gradient-to-r from-white/95 dark:from-black/95 to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-20 sm:w-24
          bg-gradient-to-l from-white/95 dark:from-black/95 to-transparent" />

                <motion.div
                    className="flex items-center w-max will-change-transform"
                    animate={prefersReducedMotion ? { x: 0 } : { x: ["0%", "-50%"] }}
                    transition={
                        prefersReducedMotion
                            ? {}
                            : { duration: marqueeDuration, repeat: Infinity, ease: "linear" }
                    }
                >
                    {marqueeList.map((tech, i) => (
                        <div key={i} className="flex items-center">
                            <div
                                className={`
                  flex items-center gap-1.5 sm:gap-2
                  px-3 sm:px-6
                  py-1
                  rounded-md transition
                  hover:bg-gray-100/50 dark:hover:bg-gray-800/50
                `}
                            >
                                <tech.icon className="text-xs sm:text-lg text-gray-500 dark:text-gray-400" />
                                <span className="text-[10px] sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                                    {tech.name}
                                </span>
                            </div>

                            {i < marqueeList.length - 1 && (
                                <div className="px-1.5 sm:px-3">
                                    <div className="w-px h-2.5 sm:h-4 bg-gray-300/50 dark:bg-gray-600/50" />
                                </div>
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
