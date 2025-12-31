import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const Journey = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.1 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) controls.start("visible");
    }, [isInView, controls]);

    const projects = [
        {
            id: 1,
            title: "Pertama Kali Memakai Seragam Putih Abu-Abu",
            description: "Momen awal perjalanan—seragam baru, wajah-wajah baru, dan rasa gugup yang pelan-pelan berubah jadi semangat. Hari ketika semuanya dimulai dan cerita besar mulai ditulis.",
            image: "/assets/Journey/putih_abu.webp",
            year: "2023",
        },
        {
            id: 2,
            title: "Menari — Energi, Kekompakan, dan Tawa",
            description:
                "Latihan berjam-jam, gerakan yang hampir nggak sinkron, sampai akhirnya tampil penuh percaya diri. Sebuah pengalaman yang nyatuin banyak kepala jadi satu irama.",
            image: "/assets/Journey/nari.webp",
            year: "2023",
        },
        {
            id: 3,
            title: "Bukber — Meja Panjang, Cerita Panjang",
            description:
                "Saat lapar, capek, dan cerita sehari-hari akhirnya ketemu di satu meja. Momen hangat yang selalu jadi alasan buat kumpul lagi dan lagi.",
            image: "/assets/Journey/bukber.webp",
            year: "2024",
        },
        {
            id: 4,
            title: "IMTAQ — Menenangkan Diri di Tengah Kesibukan",
            description:
                "Waktu untuk refleksi, hening, dan saling menguatkan. Duduk bersama, belajar bersama, dan mengingat bahwa perjalanan ini bukan cuma soal nilai, tapi juga hati.",
            image: "/assets/Journey/imtaq.webp",
            year: "2025",
        },
        {
            id: 5,
            title: "Nonton Bareng — Tertawa dan Riuh Tanpa Batas",
            description:
                "Dari teriak bareng sampai komentar receh yang bikin suasana pecah. Nobar jadi salah satu momen sederhana yang justru paling ngena dan bikin akrab.",
            image: "/assets/Journey/nobar.webp",
            year: "2025",
        },

    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const imageVariants = {
        hidden: {
            opacity: 0,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.1
            }
        },
        hover: {
            scale: 1.03,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    const contentVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.2
            }
        }
    };

    return (
        
        <section id="journey" className="section bg-white dark:bg-dark-secondary relative border-y border-gray-200 dark:border-gray-800" ref={containerRef}>
            <div className="container">
                <motion.div className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { type: "spring", stiffness: 100, damping: 15 }
                        }
                    }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Our Journey</h2>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-dark-text-secondary px-4">
                        Timeline yang takkan mungkin dapat terulang kembali.
                    </p>
                </motion.div>

                <motion.div
                    className="space-y-16 sm:space-y-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            variants={itemVariants}
                            className={`
                                flex flex-col items-center gap-6 sm:gap-8
                                ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
                            `}
                        >
                            {/* Image Container – Instant Photo Style */}
                            <motion.div
                                className="w-full md:w-6/12 lg:w-5/12"
                                variants={imageVariants}
                            >
                                <motion.div
                                    className="
                                                relative mx-auto max-w-sm border border-1 border-gray-200
                                                bg-neutral-100 dark:bg-neutral-400 dark:border-gray-900
                                                rounded-sm px-4 pt-4 pb-10
                                                shadow-[0_20px_45px_rgba(0,0,0,0.25)]
                                                dark:shadow-[0_25px_60px_rgba(0,0,0,0.65)]
                                            "
                                    style={{
                                        rotate: index % 2 === 0 ? -2 : 2
                                    }}
                                    transition={{ type: "spring", stiffness: 120, damping: 14 }}
                                >

                                    {/* Foto */}
                                    <div className="relative overflow-hidden">
                                        <motion.img
                                            src={project.image}
                                            alt={project.title}
                                            className="
                                                    w-full h-48 sm:h-64 object-cover
                                                    dark:brightness-75 dark:contrast-110
                                                    "
                                            transition={{ duration: 0.4 }}
                                        />

                                        {/* Vignette – Dark mode only */}
                                        <div
                                            className="
                                                    pointer-events-none
                                                    absolute inset-0
                                                    hidden dark:block
                                                    "
                                            style={{
                                                background:
                                                    "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)",
                                            }}
                                        />
                                    </div>


                                    {/* Caption / Year */}
                                    <div className="absolute bottom-3 left-0 w-full text-center">
                                        <p className="text-xs text-gray-600 dark:text-gray-800 tracking-wider">
                                            {project.year}
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>




                            {/* Content - Mobile: bawah, Desktop: samping */}
                            <motion.div
                                className="w-full md:w-6/12 lg:w-7/12 px-4 sm:px-0"
                                variants={contentVariants}
                            >
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <motion.div
                                            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm sm:text-base font-medium"
                                            initial={{ rotate: 0 }}
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {index + 1}
                                        </motion.div>
                                        <motion.h3
                                            className="text-lg sm:text-xl md:text-2xl font-bold"
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                        >
                                            {project.title}
                                        </motion.h3>
                                    </div>

                                    <motion.p
                                        className="text-sm sm:text-base text-gray-600 dark:text-dark-text-secondary leading-relaxed"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {project.description}
                                    </motion.p>

                                    {/* Divider - hanya di desktop */}
                                    <motion.div
                                        className="hidden md:block pt-4 border-t border-gray-100 dark:border-gray-800"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                    />

                                    {/* Mobile divider */}
                                    <div className="md:hidden pt-3 border-t border-gray-100 dark:border-gray-800" />
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div className="hidden md:block mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <motion.p className="text-gray-500 dark:text-gray-400 text-sm"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                        Scroll for more
                    </motion.p>
                    <motion.div className="w-6 h-1 bg-gray-300 dark:bg-gray-700 mx-auto mt-2 rounded-full"
                        animate={{ scaleX: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Journey;
