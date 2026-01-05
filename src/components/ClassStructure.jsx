import { motion, AnimatePresence } from 'framer-motion';
import { Users, Shield, Award, Calendar } from 'lucide-react';
import { useState } from 'react';

const ClassStructure = () => {
    const [activeYear, setActiveYear] = useState(2025);

    const periods = [2023, 2024, 2025];

    const periodsData = {
        2023: {
            title: "Kelas 10 (2022-2023)",
            description: "Tahun awal penuh penasaran dan penyesuaian",
            structure: [
                {
                    level: "Wali Kelas",
                    members: [
                        {
                            name: "Bu Rofiqoh, S.Pd",
                            position: "Wali Kelas",
                            icon: Shield,
                            color: "bg-blue-100 dark:bg-blue-900/30"
                        }
                    ]
                },

                {
                    level: "Siswa",
                    members: [
                        {
                            name: "Rayhan Qolbi Rayandra",
                            position: "Ketua Kelas",
                            icon: Users,
                            color: "bg-purple-100 dark:bg-purple-900/30"
                        },
                        {
                            name: "Ricky Sandiko",
                            position: "Wakil Ketua Kelas",
                            icon: Users,
                            color: "bg-purple-100 dark:bg-purple-900/30"
                        },
                        {
                            name: "Maharani Syafitri",
                            position: "Sekretaris",
                            icon: Users,
                            color: "bg-purple-100 dark:bg-purple-900/30"
                        },
                        {
                            name: "Dea Amellya",
                            position: "Bendahara",
                            icon: Users,
                            color: "bg-purple-100 dark:bg-purple-900/30"
                        },
                        { name: "Ahmad Fikri", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Apandi", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Arya Ariri", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Arya Yudha Pramudya", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Chelsea", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Dea Enjel", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Deswita Young Mei", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Diraz Oktora", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Fadil Naik", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Fikri Jaya Saputra", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Gandawa Ripo Rajashiddiq", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Haris Adrian Pratama", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Idris Khoidir", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Lisnawati Lase", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Loren Valerie", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Dimas Drajat Mangkuwijaya", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Dimas Esa Anugrah", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Surya Fadillah AlMutaqim", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Luthfiandra Damareysa Wahyudin", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Raafi", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Wildan", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Supadil", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Nadia Aulia Rahmi", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Putri Melati", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Raihan Andriyas Prama", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Renaldi Pratama", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Rifky Fadillah", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Sonia Husni", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Teguh Destriansyah", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Wahyu Rahmatullah", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Yusuf Hendrawan", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" }
                    ]
                },

            ]
        },
        2024: {
            title: "Kelas 11 (2023-2024)",
            description: "Tahun pertengahan, mulai fokus pada skill dan project",
            structure: [
                {
                    level: "Wali Kelas",
                    members: [
                        {
                            name: "Bu Rofiqoh, S.Pd",
                            position: "Wali Kelas",
                            icon: Shield,
                            color: "bg-blue-100 dark:bg-blue-900/30"
                        }
                    ]
                },

                {
                    level: "Siswa",
                    members: [
                        {
                            name: "Haris Adrian",
                            position: "Ketua Kelas",
                            icon: Users,
                            color: "bg-purple-100 dark:bg-purple-900/30"
                        },
                        {
                            name: "Muhammad Supadil",
                            position: "Wakil Ketua Kelas",
                            icon: Users,
                            color: "bg-purple-100 dark:bg-purple-900/30"
                        },
                        {
                            name: "Maharani Syafitri",
                            position: "Sekretaris",
                            icon: Users,
                            color: "bg-purple-100 dark:bg-purple-900/30"
                        },
                        {
                            name: "Dea Amellya",
                            position: "Bendahara",
                            icon: Users,
                            color: "bg-purple-100 dark:bg-purple-900/30"
                        },
                        { name: "Apandi", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Arya Ariri", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Arya Yudha Pramudya", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Chelsea", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Dea Enjel", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Deswita Young Mei", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Fadil Naik", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Fikri Jaya Saputra", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Gandawa Ripo Rajashiddiq", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Haris Adrian Pratama", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Idris Khoidir", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Lisnawati Lase", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Loren Valerie", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Dimas Drajat Mangkuwijaya", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Dimas Esa Anugrah", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Surya Fadillah AlMutaqim", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Luthfiandra Damareysa Wahyudin", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Raafi", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Wildan", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Supadil", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Nadia Aulia Rahmi", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Putri Melati", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Raihan Andriyas Prama", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Rayhan Qolbi Rayandra", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Renaldi Pratama", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Ricky Sandiko", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Rifky Fadillah", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Sonia Husni", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Teguh Destriansyah", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Wahyu Rahmatullah", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Yusuf Hendrawan", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" }
                    ]
                }
            ]
        },
        2025: {
            title: "Kelas 12 (2024-2025)",
            description: "Tahun akhir, fokus pada persiapan kelulusan dan masa depan",
            structure: [
                {
                    level: "Wali Kelas",
                    members: [
                        {
                            name: "Bu Rofiqoh, S.Pd",
                            position: "Wali Kelas",
                            icon: Shield,
                            color: "bg-blue-100 dark:bg-blue-900/30"
                        }
                    ]
                },

                {
                    level: "Siswa",
                    members: [
                        {
                            name: "Haris Adrian",
                            position: "Ketua Kelas",
                            icon: Users,
                            color: "bg-purple-100 dark:bg-purple-900/30"
                        },
                        {
                            name: "Muhammad Supadil",
                            position: "Wakil Ketua Kelas",
                            icon: Users,
                            color: "bg-purple-100 dark:bg-purple-900/30"
                        },
                        {
                            name: "Maharani Syafitri",
                            position: "Sekretaris",
                            icon: Users,
                            color: "bg-purple-100 dark:bg-purple-900/30"
                        },
                        {
                            name: "Nadia Aulia Rahmi",
                            position: "Bendahara",
                            icon: Users,
                            color: "bg-purple-100 dark:bg-purple-900/30"
                        },
                        { name: "Apandi", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Arya Ariri", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Arya Yudha Pramudya", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Chelsea", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Dea Amellya", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Dea Enjel", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Deswita Young Mei", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Fadil Naik", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Fikri Jaya Saputra", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Gandawa Ripo Rajashiddiq", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Haris Adrian Pratama", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Idris Khoidir", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Lisnawati Lase", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Loren Valerie", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Dimas Esa Anugrah", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Surya Fadillah AlMutaqim", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Luthfiandra Damareysa Wahyudin", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Raafi", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Wildan", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Muhammad Supadil", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Nadia Aulia Rahmi", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Putri Melati", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Raihan Andriyas Prama", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Rayhan Qolbi Rayandra", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Renaldi Pratama", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Ricky Sandiko", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Rifky Fadillah", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Sonia Husni", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Teguh Destriansyah", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Wahyu Rahmatullah", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Yusuf Hendrawan", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" }
                    ]
                },
            ]
        }
    };

    const data = periodsData[activeYear];

    return (
        <section
            id="class_structure"
            className="min-h-screen bg-white dark:bg-dark-secondary border-y border-gray-200 dark:border-gray-800"
        >
            <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-16">

                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl font-bold">Struktur Kelas</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Perjalanan organisasi kelas dari tahun ke tahun
                    </p>
                </motion.header>

                {/* Period Selector */}
                <div className="flex justify-center gap-2 sm:gap-4 mb-12">
                    {periods.map((year) => (
                        <button
                            key={year}
                            onClick={() => setActiveYear(year)}
                            aria-pressed={activeYear === year}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${activeYear === year
                                    ? 'bg-black text-white dark:bg-gray-700'
                                    : 'bg-gray-100 dark:bg-slate-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {year}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Active Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeYear}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35 }}
                        className="space-y-8"
                    >
                        {/* Title */}
                        <div className="text-center">
                            <h3 className="text-xl font-semibold">{data.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {data.description}
                            </p>
                        </div>

                        {/* Structure */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.structure.map((level, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.08 }}
                                    className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-card p-5 flex flex-col"
                                >
                                    <h4 className="text-sm text-center font-semibold mb-4 text-gray-700 dark:text-gray-300">
                                        {level.level}
                                    </h4>

                                    <div className="space-y-3 overflow-y-auto max-h-64 pr-1"
                                        style={{
                                            scrollbarWidth: 'thin',
                                            scrollbarColor: '#cbd5e0 transparent'
                                        }}>
                                        {level.members.map((member, i) => {
                                            const Icon = member.icon;
                                            return (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                                                >
                                                    <div className={`${member.color} w-9 h-9 rounded-full flex items-center justify-center`}>
                                                        <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium truncate">{member.name}</p>
                                                        <p className="text-xs text-gray-500 truncate">{member.position}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default ClassStructure;