import { motion } from 'framer-motion';
import { Users, Shield, Award, Calendar, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const ClassStructure = () => {
    const [expandedPeriod, setExpandedPeriod] = useState(2025); // Default expanded untuk 2025

    const periodsData = {
        2023: {
            title: "Kelas 10 (2022-2023)",
            description: "Tahun awal penuh penasaran dan penyesuaian",
            structure: [
                {
                    level: "Wali Kelas",
                    members: [
                        { name: "Bu Rofiqoh, S.Pd", position: "Wali Kelas", icon: Shield, color: "bg-blue-100 dark:bg-blue-900/30" }
                    ]
                },
                {
                    level: "Ketua Kelas",
                    members: [
                        { name: "Rayhan Qolbi Rayandra", position: "Ketua Kelas", icon: Users, color: "bg-purple-100 dark:bg-purple-900/30" }
                    ]
                },
                {
                    level: "Anggota",
                    members: [
                        { name: "Haris Adrian", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" },
                        { name: "Siswa Lainnya", position: "Anggota", icon: Award, color: "bg-gray-100 dark:bg-gray-800" }
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
                        { name: "Bu Rofiqoh, S.Pd", position: "Wali Kelas", icon: Shield, color: "bg-blue-100 dark:bg-blue-900/30" }
                    ]
                },
                {
                    level: "Ketua Kelas",
                    members: [
                        { name: "Haris Adrian", position: "Ketua Kelas", icon: Users, color: "bg-purple-100 dark:bg-purple-900/30" }
                    ]
                },
                {
                    level: "Tim Inti",
                    members: [
                        { name: "Rayhan Qolbi", position: "Sekretaris", icon: Award, color: "bg-green-100 dark:bg-green-900/30" },
                        { name: "Anggota 1", position: "Bendahara", icon: Award, color: "bg-green-100 dark:bg-green-900/30" },
                        { name: "Anggota 2", position: "Koordinator", icon: Award, color: "bg-yellow-100 dark:bg-yellow-900/30" }
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
                        { name: "Bu Rofiqoh, S.Pd", position: "Wali Kelas", icon: Shield, color: "bg-blue-100 dark:bg-blue-900/30" }
                    ]
                },
                {
                    level: "Ketua Kelas",
                    members: [
                        { name: "Haris Adrian", position: "Ketua Kelas", icon: Users, color: "bg-purple-100 dark:bg-purple-900/30" }
                    ]
                },
                {
                    level: "Tim Inti",
                    members: [
                        { name: "Sekretaris", position: "Sekretaris", icon: Award, color: "bg-green-100 dark:bg-green-900/30" },
                        { name: "Bendahara", position: "Bendahara", icon: Award, color: "bg-green-100 dark:bg-green-900/30" },
                        { name: "Koord. Acara", position: "Event", icon: Award, color: "bg-yellow-100 dark:bg-yellow-900/30" },
                        { name: "Koord. IT", position: "IT", icon: Award, color: "bg-yellow-100 dark:bg-yellow-900/30" }
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
        <section id="hierarchy" className="section bg-white dark:bg-dark-secondary border-b border-gray-200 dark:border-gray-800">
            <div className="container max-w-4xl mx-auto">
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
                                ? 'bg-blue-500 text-white'
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

                        {/* Structure Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {periodsData[expandedPeriod].structure.map((level, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="card p-4"
                                >
                                    <div className="mb-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                                        <h4 className="font-bold text-sm text-gray-700 dark:text-gray-300">
                                            {level.level}
                                        </h4>
                                    </div>

                                    <div className="space-y-3">
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
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Mobile Accordion View (fallback) */}
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
                                                <div className="space-y-1">
                                                    {level.members.map((member, memberIndex) => (
                                                        <div key={memberIndex} className="flex items-center gap-2 text-xs">
                                                            <div className={`${member.color} w-6 h-6 rounded-full flex items-center justify-center`}>
                                                                {member.name.charAt(0)}
                                                            </div>
                                                            <span className="font-medium">{member.name}</span>
                                                            <span className="text-gray-500">• {member.position}</span>
                                                        </div>
                                                    ))}
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