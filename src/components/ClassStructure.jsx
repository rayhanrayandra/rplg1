import { motion } from 'framer-motion';
import { Users, Shield, Award, Calendar, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const ClassStructure = () => {
    const [expandedPeriod, setExpandedPeriod] = useState(2025);

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
                    level: "Tim Inti",
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
                            name: "Dea Amelia",
                            position: "Bendahara",
                            icon: Users,
                            color: "bg-purple-100 dark:bg-purple-900/30"
                        }
                    ]
                },

                {
                    level: "Anggota",
                    members: [
                        { name: "Ahmad Fikri", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Apandi", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Arya Ariri", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Arya Yudha Pramudya", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Chelsea", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Dea Angel", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Deswita Young Mei", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Diraz Oktora", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Fadil Naik", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Fikri Jaya Saputra", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Gandawa Ripo Rajashiddiq", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Haris Adrian Pratama", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Idris Khoidir", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Lisna Wati Lase", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
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
                }
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
                    level: "Tim Inti",
                    members: [
                        {
                            name: "Haris Adrian",
                            position: "Ketua Kelas",
                            icon: Users,
                            color: "bg-purple-100 dark:bg-purple-900/30"
                        },
                        {
                            name: "Supadil",
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
                            name: "Dea Amelia",
                            position: "Bendahara",
                            icon: Users,
                            color: "bg-purple-100 dark:bg-purple-900/30"
                        }
                    ]
                },

                {
                    level: "Anggota",
                    members: [
                        { name: "Apandi", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Arya Ariri", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Arya Yudha Pramudya", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Chelsea", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Dea Angel", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Deswita Young Mei", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Fadil Naik", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Fikri Jaya Saputra", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Gandawa Ripo Rajashiddiq", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Haris Adrian Pratama", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Idris Khoidir", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Lisna Wati Lase", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
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
                    level: "Tim Inti",
                    members: [
                        {
                            name: "Haris Adrian",
                            position: "Ketua Kelas",
                            icon: Users,
                            color: "bg-purple-100 dark:bg-purple-900/30"
                        },
                        {
                            name: "Supadil",
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
                        }
                    ]
                },

                {
                    level: "Anggota",
                    members: [
                        { name: "Apandi", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Arya Ariri", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Arya Yudha Pramudya", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Chelsea", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Dea Amelya", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Dea Angel", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Deswita Young Mei", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Fadil Naik", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Fikri Jaya Saputra", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Gandawa Ripo Rajashiddiq", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Haris Adrian Pratama", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Idris Khoidir", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Lisna Wati Lase", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
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
                }
            ]
        }
    };

    const periods = [2023, 2024, 2025];

    const togglePeriod = (year) => {
        setExpandedPeriod(expandedPeriod === year ? null : year);
    };

    return (
        <section id="class_structure" className="section bg-white dark:bg-dark-secondary border-b border-gray-200 dark:border-gray-800 min-h-screen border-t">
            <div className="container max-w-4xl mx-auto px-4 sm:px-6">
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                        Struktur Kelas
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                        Perjalanan struktur kelas dari tahun ke tahun
                    </p>
                </motion.div>

                {/* Timeline Period Selector */}
                <div className="flex justify-center gap-2 sm:gap-4 mb-8">
                    {periods.map((year) => (
                        <button
                            key={year}
                            onClick={() => setExpandedPeriod(year)}
                            className={`px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 ${expandedPeriod === year
                                ? 'bg-black text-white dark:bg-gray-600 dark:text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm font-medium">{year}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Active Period Content */}
                {expandedPeriod && periodsData[expandedPeriod] && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        {/* Period Header */}
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-1">
                                {periodsData[expandedPeriod].title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {periodsData[expandedPeriod].description}
                            </p>
                        </div>

                        {/* Structure Cards with Internal Scroll */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {periodsData[expandedPeriod].structure.map((level, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="card p-4 flex flex-col"
                                >
                                    <div className="mb-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                                        <h4 className="font-bold text-sm text-gray-700 dark:text-gray-300">
                                            {level.level}
                                        </h4>
                                    </div>

                                    {/* Scrollable Members List */}
                                    <div
                                        className="space-y-3 flex-1 overflow-y-auto pr-1 max-h-48"
                                        style={{
                                            scrollbarWidth: 'thin',
                                            scrollbarColor: '#cbd5e0 transparent'
                                        }}
                                    >
                                        <div className="space-y-3 pr-1">
                                            {level.members.map((member, memberIndex) => {
                                                const Icon = member.icon;
                                                return (
                                                    <div
                                                        key={memberIndex}
                                                        className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                                    >
                                                        <div className={`${member.color} w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0`}>
                                                            <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-sm truncate">
                                                                {member.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                                                                {member.position}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Custom Scrollbar Styles */}
                                    <style jsx>{`
                                        div[class*="overflow-y-auto"]::-webkit-scrollbar {
                                            width: 4px;
                                        }
                                        div[class*="overflow-y-auto"]::-webkit-scrollbar-track {
                                            background: transparent;
                                            border-radius: 4px;
                                        }
                                        div[class*="overflow-y-auto"]::-webkit-scrollbar-thumb {
                                            background-color: #cbd5e0;
                                            border-radius: 4px;
                                        }
                                        .dark div[class*="overflow-y-auto"]::-webkit-scrollbar-thumb {
                                            background-color: #4b5563;
                                        }
                                    `}</style>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Mobile Accordion View */}
                <div className="lg:hidden mt-6 space-y-4">
                    {periods.map((year) => (
                        <motion.div
                            key={year}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: year === 2023 ? 0.1 : year === 2024 ? 0.2 : 0.3 }}
                            className="card overflow-hidden"
                        >
                            <button
                                onClick={() => togglePeriod(year)}
                                className="w-full p-3 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span className="font-medium text-sm">{periodsData[year].title}</span>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedPeriod === year ? 'rotate-180' : ''}`} />
                            </button>

                            {expandedPeriod === year && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="px-3 pb-3"
                                >
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                        {periodsData[year].description}
                                    </p>
                                    <div className="space-y-3">
                                        {periodsData[year].structure.map((level, index) => (
                                            <div key={index} className="space-y-2">
                                                <h5 className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                    {level.level}
                                                </h5>
                                                <div
                                                    className="space-y-1 max-h-32 overflow-y-auto pr-2"
                                                    style={{
                                                        scrollbarWidth: 'thin',
                                                        scrollbarColor: '#cbd5e0 transparent'
                                                    }}
                                                >
                                                    {level.members.map((member, memberIndex) => {
                                                        const Icon = member.icon;
                                                        return (
                                                            <div key={memberIndex} className="flex items-center gap-2 text-xs py-1">
                                                                <div className={`${member.color} w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0`}>
                                                                    <Icon className="w-3 h-3" />
                                                                </div>
                                                                <span className="font-medium truncate flex-1">{member.name}</span>
                                                                <span className="text-gray-500 text-xs truncate">• {member.position}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClassStructure;