import React from 'react';
import { Briefcase, GraduationCap, Check } from 'lucide-react';

const About = () => {
    const skills = [
        "UI/UX Design",
        "Web Development",
        "Brand Identity",
        "Frontend",
        "Product Design",
        "Design Systems"
    ];

    return (
        <section id="about" className="section bg-gray-50 dark:bg-dark-secondary">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left Column */}
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
                            About Us
                        </h2>

                        <div className="space-y-4 mb-8">
                            <p className="text-gray-600 dark:text-dark-text-secondary">
                                Kita semua mulai dari titik yang beda-beda. Ada yang datang bawa mimpi
                                segede langit, ada yang masih ragu, ada juga yang belum tau mau ke mana.
                                Tapi langkah-langkah itu akhirnya ketemu di satu ruang kelas—tempat di
                                mana orang asing pelan-pelan jadi keluarga, disatukan rasa penasaran dan
                                keinginan buat sama-sama bikin sesuatu.
                            </p>

                            <p className="text-gray-600 dark:text-dark-text-secondary">
                                Di sini kita belajar lebih dari sekadar sintaks dan framework. Kita
                                belajar gimana rasanya gagal, nyoba lagi, bantu teman yang lagi kejebak
                                error, dan gimana kolaborasi bisa ngubah ide receh jadi sesuatu yang
                                berarti. Begadang bareng, presentasi deg-degan, sampe tawa kenceng tiap
                                fitur akhirnya jalan—semua itu ngajarin kita buat tahan banting dan
                                tumbuh bareng-bareng.
                            </p>

                            <p className="text-gray-600 dark:text-dark-text-secondary">
                                Kelas ini jadi tempat aman buat kita: ruang di mana ide lahir, salah
                                itu wajar, dan percaya diri dibangun pelan-pelan. Kita pulang bukan cuma
                                bawa skill, tapi juga kenangan, keluarga kecil, dan keberanian buat
                                terus berkarya—satu baris kode, satu langkah dalam hidup.
                            </p>
                        </div>

                        {/* Skills */}
                        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                            <h3 className="text-xl font-bold mb-6">Skills & Expertise</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {skills.map((skill, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-200">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Experience Card */}
                        <div className="card p-6">
                            <div className="flex items-start space-x-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Experience</h3>
                                    <p className="text-gray-600 dark:text-dark-text-secondary text-sm">
                                        3 tahun belajar, ngebangun, dan tumbuh bareng
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-4">
                                    <h4 className="font-bold">Perjalanan Kelas Software Engineering</h4>
                                    <p className="text-gray-600 dark:text-dark-text-secondary text-sm">
                                        SMKN 6 Pekanbaru • 2022 – 2025
                                    </p>
                                    <ul className="text-gray-600 dark:text-dark-text-secondary text-sm mt-2 space-y-1 list-disc ml-4">
                                        <li>
                                            Mulai bareng sebagai pemula—penuh harap, penasaran, kadang bingung,
                                            tapi selalu siap belajar.
                                        </li>
                                        <li>
                                            Bikin project bareng yang nguji kreativitas, kesabaran, dan cara
                                            kita kerja sebagai tim.
                                        </li>
                                        <li>
                                            Ketemu malam-malam panjang, kode yang ngeyel, dan deadline yang
                                            ngejar—tapi kita belajar buat saling nge-backup.
                                        </li>
                                        <li>
                                            Dari siswa biasa, pelan-pelan berubah jadi tim yang bisa ngubah
                                            ide jadi pengalaman digital yang hidup.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Education Card */}
                        <div className="card p-6">
                            <div className="flex items-start space-x-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                    <GraduationCap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Education</h3>
                                    <p className="text-gray-600 dark:text-dark-text-secondary text-sm">
                                        Pendidikan formal & perjalanan kita bareng
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-4">
                                    <h4 className="font-bold">SMKN 6 Pekanbaru – Rekayasa Perangkat Lunak</h4>
                                    <p className="text-gray-600 dark:text-dark-text-secondary text-sm">
                                        2022 – 2025
                                    </p>

                                    <ul className="text-gray-600 dark:text-dark-text-secondary text-sm mt-2 space-y-1 list-disc ml-4">
                                        <li>
                                            Masuk tahun 2022 dan mulai perjalanan tiga tahun penuh belajar,
                                            ketawa, dan eksplorasi.
                                        </li>
                                        <li>
                                            Wali kelas dari awal sampe akhir: <strong>Bu Rofiqoh, S.Pd</strong> —
                                            yang selalu jadi sosok penuntun, penyabar, dan percaya sama kita
                                            bahkan pas kita sendiri masih ragu.
                                        </li>
                                        <li>
                                            Ketua kelas: Kelas 10 — <strong>Rayhan Qolbi Rayandra</strong>;
                                            kelas 11 & 12 — <strong>Haris Adrian</strong>.
                                        </li>
                                        <li>
                                            Lulus tahun 2025, bawa pulang bukan cuma ilmu tapi juga cerita,
                                            keluarga, dan keberanian buat ngadepin dunia nyata.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
