import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const Journey = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.1 });

    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const projects = [
        {
            id: 1,
            title: "Pentas Seni — Merayakan Kreativitas Tanpa Batas",
            description: "Sebuah perjalanan penuh tawa, sorak, dan cahaya panggung. Momen ketika semua orang menunjukkan bakat terbaiknya—menari, menyanyi, drama, hingga spontanitas yang nggak direncanakan tapi justru paling dikenang. Sebuah malam di mana rasa bangga dan kebersamaan terasa nyata",
            image: "/images/pentas_seni.jpg",
            year: "2022",
        },
        {
            id: 2,
            title: "Health & Fitness App",
            description: "A friendly fitness tracking app designed to help users manage routines and progress easily. Features workout plans, progress tracking, and community features.",
            image: "/images/fitness.jpg",
            year: "2022",
        },
        {
            id: 3,
            title: "Analytics Dashboard",
            description: "A clean and powerful dashboard for visualizing metrics, trends, and business performance. Real-time data visualization with interactive charts.",
            image: "/images/dashboard.jpg",
            year: "2022",
        },
        {
            id: 4,
            title: "Brand Identity System",
            description: "Complete brand identity: logo, color system, typography, and scalable design components. Created for a tech startup's rebranding initiative.",
            image: "/images/brand.jpg",
            year: "2021",
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
        <section
            id="journey"
            className="section bg-white dark:bg-dark-secondary relative"
            ref={containerRef}
        >
            <div className="container">
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 15
                            }
                        }
                    }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                        Project Journey
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-dark-text-secondary px-4">
                        A curated collection of my recent work and explorations.
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
                            {/* Image Container - Mobile: atas, Desktop: kiri/kanan */}
                            <motion.div
                                className="w-full md:w-6/12 lg:w-5/12"
                                variants={imageVariants}
                                whileHover="hover"
                            >
                                <div className="relative px-2 sm:px-0">
                                    {/* Polaroid-like frame effect - lebih simple di mobile */}
                                    <div className="hidden sm:block absolute -inset-3 sm:-inset-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transform rotate-1"></div>
                                    <div className="hidden sm:block absolute -inset-1 sm:-inset-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transform -rotate-1"></div>

                                    {/* Main image */}
                                    <div className="relative overflow-hidden rounded-lg sm:rounded-xl shadow-sm sm:shadow-md">
                                        <motion.img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-48 sm:h-64 md:h-72 object-cover"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.3 }}
                                        />

                                        {/* Year tag */}
                                        <motion.div
                                            className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2 py-1 sm:px-3 sm:py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            {project.year}
                                        </motion.div>
                                    </div>
                                </div>
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

                {/* Decorative element - hanya di desktop */}
                <motion.div
                    className="hidden md:block mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <motion.p
                        className="text-gray-500 dark:text-gray-400 text-sm"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut"
                        }}
                    >
                        Scroll for more
                    </motion.p>
                    <motion.div
                        className="w-6 h-1 bg-gray-300 dark:bg-gray-700 mx-auto mt-2 rounded-full"
                        animate={{ scaleX: [0.5, 1, 0.5] }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Journey;