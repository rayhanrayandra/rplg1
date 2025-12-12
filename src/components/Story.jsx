import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Users, Target, Heart, Code } from 'lucide-react';

const Story = () => {
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
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.3
            }
        },
        hover: {
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    return (
        <section id="story" className="section bg-white dark:bg-dark-secondary border-t border-gray-200 dark:border-gray-800">
            <div className="container">
                <motion.div
                    className="grid lg:grid-cols-2 gap-8 lg:gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {/* Left Column - Story & Journey */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        {/* Header */}
                        <div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                                Our Story
                            </h2>
                            <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
                                Dari 35 individu menjadi satu keluarga. Dari baris kode pertama hingga project hidup.
                            </p>
                        </div>

                        {/* Story */}
                        <div className="space-y-4">
                            <motion.div
                                className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800"
                                variants={itemVariants}
                                whileHover={{ x: 5 }}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-gray-200 dark:bg-gray-800 rounded-lg">
                                        <Users className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">Awal yang Berbeda</h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Tahun 2022, kami datang dengan latar belakang berbeda. Ada yang sudah akrab dengan kode,
                                    ada yang baru pertama kali melihat IDE. Tapi di kelas ini, kami belajar mulai dari nol bersama.
                                </p>
                            </motion.div>

                            <motion.div
                                className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800"
                                variants={itemVariants}
                                whileHover={{ x: 5 }}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-gray-200 dark:bg-gray-800 rounded-lg">
                                        <Target className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">Perjalanan Bersama</h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Tiga tahun bukan hanya tentang belajar coding. Ini tentang belajar berkolaborasi,
                                    menghadapi error bersama, dan menemukan solusi sebagai tim. Setiap project adalah
                                    cerita baru yang kami tulis bersama.
                                </p>
                            </motion.div>

                            <motion.div
                                className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800"
                                variants={itemVariants}
                                whileHover={{ x: 5 }}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-gray-200 dark:bg-gray-800 rounded-lg">
                                        <Heart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">Keluarga Koding</h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Yang awalnya sekadar teman sekelas, perlahan menjadi keluarga. Support system yang
                                    saling menguatkan, membantu saat stuck, dan merayakan setiap pencapaian kecil.
                                </p>
                            </motion.div>

                            <motion.div
                                className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800"
                                variants={itemVariants}
                                whileHover={{ x: 5 }}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-gray-200 dark:bg-gray-800 rounded-lg">
                                        <Code className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">Warisan yang Kami Bawa</h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Lulus bukan berarti akhir. Setiap baris kode yang kami tulis, setiap project yang
                                    kami buat, adalah warisan yang akan terus hidup. Kami pulang bukan hanya dengan ijazah,
                                    tapi dengan cerita dan keluarga yang tak ternilai.
                                </p>
                            </motion.div>
                            {/* Quick Stats */}
                            <motion.div
                                className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
                                variants={itemVariants}
                            >
                                <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Dalam Angka</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">3</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Tahun</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">35</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Individu</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">1</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Keluarga</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Column - Experience & Education */}
                    <div className="space-y-6">
                        {/* Experience Card */}
                        <motion.div
                            className="card p-6"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <motion.div
                                    className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0"
                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Briefcase className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                                </motion.div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Experience</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        3 tahun belajar, membangun, dan tumbuh bersama
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">
                                        Perjalanan Kelas Software Engineering
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                        SMKN 6 Pekanbaru • 2022 – 2025
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-2">
                                            <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Mulai bersama sebagai pemula—penuh harap, penasaran, dan siap belajar.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Membangun project bersama yang menguji kreativitas dan kerja tim.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Menghadapi malam-malam panjang, error yang membandel, dan deadline.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Berkembang dari siswa biasa menjadi tim yang bisa menghidupkan ide digital.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Education Card */}
                        <motion.div
                            className="card p-6"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <motion.div
                                    className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0"
                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <GraduationCap className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                                </motion.div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Education</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Pendidikan formal dan perjalanan kami bersama
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">
                                        SMKN 6 Pekanbaru – Rekayasa Perangkat Lunak
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                        2022 – 2025
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-2">
                                            <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Memulai perjalanan tiga tahun penuh belajar, eksplorasi, dan pertumbuhan.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Wali kelas: <strong>Bu Rofiqoh, S.Pd</strong> — penuntun, penyabar, dan
                                                selalu percaya pada kami.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Ketua kelas: 10 — <strong>Rayhan Qolbi Rayandra</strong>; 11 & 12 — <strong>Haris Adrian</strong>.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Lulus tahun 2025 dengan membawa ilmu, cerita, dan keberanian untuk dunia nyata.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Story;