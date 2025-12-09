import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Check } from 'lucide-react';

const About = () => {
    const skills = [
        "UI/UX Design",
        "Web Development",
        "Internet Of Thinks",
        "Desktop App",
        "3D Design",
        "Backend Engineering"
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
        <section id="about" className="section bg-white dark:bg-dark-secondary border-t border-gray-200 dark:border-gray-800">
            <div className="container">
                <motion.div
                    className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {/* Left Column - Mobile: atas, Desktop: kiri */}
                    <motion.div variants={itemVariants}>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8">
                            About Us
                        </h2>

                        <div className="space-y-4 mb-6 lg:mb-8">
                            <motion.p
                                className="text-sm sm:text-base text-gray-600 dark:text-dark-text-secondary leading-relaxed"
                                variants={itemVariants}
                            >
                                Kita semua mulai dari titik yang beda-beda. Ada yang datang bawa mimpi
                                segede langit, ada yang masih ragu, ada juga yang belum tau mau ke mana.
                                Tapi langkah-langkah itu akhirnya ketemu di satu ruang kelas—tempat di
                                mana orang asing pelan-pelan jadi keluarga, disatukan rasa penasaran dan
                                keinginan buat sama-sama bikin sesuatu.
                            </motion.p>

                            <motion.p
                                className="text-sm sm:text-base text-gray-600 dark:text-dark-text-secondary leading-relaxed"
                                variants={itemVariants}
                            >
                                Di sini kita belajar lebih dari sekadar sintaks dan framework. Kita
                                belajar gimana rasanya gagal, nyoba lagi, bantu teman yang lagi kejebak
                                error, dan gimana kolaborasi bisa ngubah ide receh jadi sesuatu yang
                                berarti. Begadang bareng, presentasi deg-degan, sampe tawa kenceng tiap
                                fitur akhirnya jalan—semua itu ngajarin kita buat tahan banting dan
                                tumbuh bareng-bareng.
                            </motion.p>

                            <motion.p
                                className="text-sm sm:text-base text-gray-600 dark:text-dark-text-secondary leading-relaxed"
                                variants={itemVariants}
                            >
                                Kelas ini jadi tempat aman buat kita: ruang di mana ide lahir, salah
                                itu wajar, dan percaya diri dibangun pelan-pelan. Kita pulang bukan cuma
                                bawa skill, tapi juga kenangan, keluarga kecil, dan keberanian buat
                                terus berkarya—satu baris kode, satu langkah dalam hidup.
                            </motion.p>
                        </div>

                        {/* Skills */}
                        <motion.div
                            className="pt-6 lg:pt-8 border-t border-gray-200 dark:border-gray-800"
                            variants={itemVariants}
                        >
                            <h3 className="text-lg sm:text-xl font-bold mb-4 lg:mb-6">Skills & Expertise</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                                {skills.map((skill, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center space-x-3"
                                        variants={itemVariants}
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <motion.div
                                            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0"
                                            whileHover={{ scale: 1.2, rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600 dark:text-green-400" />
                                        </motion.div>
                                        <span className="text-sm sm:text-base text-gray-700 dark:text-gray-200 truncate">
                                            {skill}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Mobile: bawah, Desktop: kanan */}
                    <div className="space-y-6 lg:space-y-8">
                        {/* Experience Card */}
                        <motion.div
                            className="card p-4 sm:p-5 lg:p-6"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
                                <motion.div
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0"
                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                                </motion.div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg sm:text-xl font-bold mb-1 truncate">Experience</h3>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text-secondary">
                                        3 tahun belajar, ngebangun, dan tumbuh bareng
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 lg:space-y-4">
                                <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-3 lg:pl-4">
                                    <h4 className="font-bold text-sm sm:text-base">Perjalanan Kelas Software Engineering</h4>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text-secondary mt-1">
                                        SMKN 6 Pekanbaru • 2022 – 2025
                                    </p>
                                    <ul className="text-xs sm:text-sm text-gray-600 dark:text-dark-text-secondary mt-2 space-y-1.5 list-disc ml-4">
                                        <li className="leading-relaxed">
                                            Mulai bareng sebagai pemula—penuh harap, penasaran, kadang bingung,
                                            tapi selalu siap belajar.
                                        </li>
                                        <li className="leading-relaxed">
                                            Bikin project bareng yang nguji kreativitas, kesabaran, dan cara
                                            kita kerja sebagai tim.
                                        </li>
                                        <li className="leading-relaxed">
                                            Ketemu malam-malam panjang, kode yang ngeyel, dan deadline yang
                                            ngejar—tapi kita belajar buat saling nge-backup.
                                        </li>
                                        <li className="leading-relaxed">
                                            Dari siswa biasa, pelan-pelan berubah jadi tim yang bisa ngubah
                                            ide jadi pengalaman digital yang hidup.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Education Card */}
                        <motion.div
                            className="card p-4 sm:p-5 lg:p-6"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
                                <motion.div
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0"
                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                                </motion.div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg sm:text-xl font-bold mb-1 truncate">Education</h3>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text-secondary">
                                        Pendidikan formal & perjalanan kita bareng
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 lg:space-y-4">
                                <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-3 lg:pl-4">
                                    <h4 className="font-bold text-sm sm:text-base">SMKN 6 Pekanbaru – Rekayasa Perangkat Lunak</h4>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text-secondary mt-1">
                                        2022 – 2025
                                    </p>

                                    <ul className="text-xs sm:text-sm text-gray-600 dark:text-dark-text-secondary mt-2 space-y-1.5 list-disc ml-4">
                                        <li className="leading-relaxed">
                                            Masuk tahun 2022 dan mulai perjalanan tiga tahun penuh belajar,
                                            ketawa, dan eksplorasi.
                                        </li>
                                        <li className="leading-relaxed">
                                            Wali kelas dari awal sampe akhir: <strong>Bu Rofiqoh, S.Pd</strong> —
                                            yang selalu jadi sosok penuntun, penyabar, dan percaya sama kita
                                            bahkan pas kita sendiri masih ragu.
                                        </li>
                                        <li className="leading-relaxed">
                                            Ketua kelas: Kelas 10 — <strong>Rayhan Qolbi Rayandra</strong>;
                                            kelas 11 & 12 — <strong>Haris Adrian</strong>.
                                        </li>
                                        <li className="leading-relaxed">
                                            Lulus tahun 2025, bawa pulang bukan cuma ilmu tapi juga cerita,
                                            keluarga, dan keberanian buat ngadepin dunia nyata.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;