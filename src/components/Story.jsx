import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Users, Target, Heart, Code } from 'lucide-react';

const Story = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <section id="story" className="section bg-white dark:bg-dark-secondary">
            <div className="container max-w-6xl border-x border-1 dark:border-slate-900 border-gray-100">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                        Our Story
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl ">
                        Dari 35 individu menjadi satu keluarga. Perjalanan tiga tahun penuh makna.
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                >
                    {[
                        { value: "35", label: "Individu", delay: 0 },
                        { value: "3", label: "Tahun", delay: 0.1 },
                        { value: "100+", label: "Kenangan", delay: 0.2 },
                        { value: "1", label: "Keluarga", delay: 0.3 }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            transition={{ delay: stat.delay }}
                            className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-xl"
                        >
                            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Story */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                        className="space-y-6"
                    >
                        <motion.div variants={fadeInUp}>
                            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                        <Users className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                                            Awal yang Berbeda, Tujuan yang Sama
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                            Tahun 2022, kami datang dengan latar belakang berbeda. Ada yang sudah akrab dengan kode,
                                            ada yang baru pertama kali melihat IDE. Tapi di kelas ini, kami belajar mulai dari nol bersama.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                        <Target className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                                            Perjalanan Menempa Karakter
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                            Tiga tahun bukan hanya tentang belajar coding. Ini tentang belajar berkolaborasi,
                                            menghadapi error bersama, dan menemukan solusi sebagai tim. Setiap project adalah
                                            cerita baru yang kami tulis bersama.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                        <Heart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                                            Dari Teman menjadi Keluarga
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                            Yang awalnya sekadar teman sekelas, perlahan menjadi keluarga. Support system yang
                                            saling menguatkan, membantu saat stuck, dan merayakan setiap pencapaian kecil.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Experience & Education */}
                    <div className="space-y-6">
                        {/* Experience Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                    <Briefcase className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Pengalaman Bersama
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        SMKN 6 Pekanbaru • 2022 – 2025
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Kami berkembang dari siswa biasa menjadi tim yang bisa menghidupkan ide digital.
                                    Menghadapi malam-malam panjang, error yang membandel, dan deadline bersama-sama.
                                </p>

                                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <h4 className="font-bold mb-3 text-gray-900 dark:text-white">
                                        Yang Kami Pelajari:
                                    </h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                Kerja tim dan kolaborasi efektif
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                Problem-solving dalam coding
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                Menghidupkan ide menjadi aplikasi
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Education Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                    <GraduationCap className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Pendidikan & Pertumbuhan
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Rekayasa Perangkat Lunak • SMKN 6 Pekanbaru
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Di bawah bimbingan Bu Rofiqoh, S.Pd, kami tak hanya belajar kode, tapi juga nilai-nilai
                                    kehidupan. Dari Rayhan Qolbi hingga Haris Adrian sebagai ketua kelas, kami tumbuh bersama.
                                </p>

                                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <div className="flex items-center justify-between text-sm">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Wali Kelas</p>
                                            <p className="text-gray-600 dark:text-gray-400">Bu Rofiqoh, S.Pd</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Ketua Kelas</p>
                                            <p className="text-gray-600 dark:text-gray-400">Haris Adrian</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Lulus</p>
                                            <p className="text-gray-600 dark:text-gray-400">2025</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Closing Statement */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center"
                >
                    <div className="inline-flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <Code className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-semibold">Warisan kami:</span> Bukan hanya baris kode, tapi cerita dan keluarga yang tak ternilai
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Story;