import { motion } from 'framer-motion';
import { useState } from 'react';
import {
    Search, Filter, X,
    Calendar, Users, MapPin,
    Heart, MessageCircle, Share2,
    ChevronLeft, ChevronRight, Maximize2
} from 'lucide-react';

const Gallery = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'all', label: 'Semua', count: 24 },
        { id: 'class', label: 'Kelas', count: 8 },
        { id: 'activity', label: 'Aktivitas', count: 7 },
        { id: 'project', label: 'Proyek', count: 6 },
        { id: 'event', label: 'Acara', count: 2 },
        { id: 'other', label: 'Lainnya', count: 1 },
    ];

    const galleryItems = [
        {
            id: 1,
            title: "Presentasi Project Akhir",
            description: "Momen presentasi project akhir kelas 12 dengan penuh semangat",
            category: "project",
            date: "15 Mar 2025",
            location: "Lab Komputer",
            people: 28,
            likes: 42,
            comments: 12,
            image: "/gallery/presentasi.jpg"
        },
        {
            id: 2,
            title: "Study Tour ke Tech Company",
            description: "Kunjungan industri ke perusahaan teknologi ternama",
            category: "event",
            date: "10 Feb 2025",
            location: "Jakarta",
            people: 25,
            likes: 56,
            comments: 8,
            image: "/gallery/study-tour.jpg"
        },
        {
            id: 3,
            title: "Workshop UI/UX Design",
            description: "Sesi workshop design thinking bersama mentor",
            category: "event",
            date: "5 Jan 2025",
            location: "Ruang Multimedia",
            people: 30,
            likes: 38,
            comments: 5,
            image: "/gallery/workshop.jpg"
        },
        {
            id: 4,
            title: "Makan Siang Bersama",
            description: "Quality time bareng teman-teman kelas",
            category: "daily",
            date: "20 Des 2024",
            location: "Kantin Sekolah",
            people: 15,
            likes: 67,
            comments: 15,
            image: "/gallery/makan-siang.jpg"
        },
        {
            id: 5,
            title: "Coding Session",
            description: "Sesi coding marathon untuk persiapan lomba",
            category: "project",
            date: "12 Des 2024",
            location: "Lab RPL",
            people: 10,
            likes: 45,
            comments: 7,
            image: "/gallery/coding.jpg"
        },
        {
            id: 6,
            title: "Foto Kelas Akhir Tahun",
            description: "Foto bersama sebelum libur semester",
            category: "graduation",
            date: "5 Des 2024",
            location: "Aula Sekolah",
            people: 32,
            likes: 89,
            comments: 23,
            image: "/gallery/foto-kelas.jpg"
        },
        {
            id: 7,
            title: "Diskusi Kelompok",
            description: "Brainstorming ide untuk project kelompok",
            category: "daily",
            date: "25 Nov 2024",
            location: "Perpustakaan",
            people: 6,
            likes: 34,
            comments: 4,
            image: "/gallery/diskusi.jpg"
        },
        {
            id: 8,
            title: "Praktikum Hardware",
            description: "Praktikum merakit dan troubleshooting komputer",
            category: "project",
            date: "18 Nov 2024",
            location: "Lab Hardware",
            people: 20,
            likes: 41,
            comments: 6,
            image: "/gallery/praktikum.jpg"
        },
        {
            id: 9,
            title: "Game Night",
            description: "Malam game untuk refreshing setelah ujian",
            category: "casual",
            date: "10 Nov 2024",
            location: "Ruang Kelas",
            people: 18,
            likes: 72,
            comments: 18,
            image: "/gallery/game-night.jpg"
        },
        {
            id: 10,
            title: "Persiapan Lomba",
            description: "Latihan intensif untuk lomba coding nasional",
            category: "project",
            date: "5 Nov 2024",
            location: "Lab Komputer",
            people: 8,
            likes: 39,
            comments: 5,
            image: "/gallery/lomba.jpg"
        },
        {
            id: 11,
            title: "Outbond Class",
            description: "Kegiatan team building di alam terbuka",
            category: "event",
            date: "28 Okt 2024",
            location: "Bumi Perkemahan",
            people: 30,
            likes: 94,
            comments: 28,
            image: "/gallery/outbond.jpg"
        },
        {
            id: 12,
            title: "Coffee Break",
            description: "Istirahat sambil ngobrol ringan",
            category: "daily",
            date: "20 Okt 2024",
            location: "Taman Sekolah",
            people: 12,
            likes: 51,
            comments: 9,
            image: "/gallery/coffee-break.jpg"
        },
    ];

    const filteredItems = galleryItems.filter(item => {
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
            return false;
        }
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return item.title.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.location.toLowerCase().includes(query);
        }
        return true;
    });

    const handleImageClick = (item) => {
        setSelectedImage(item);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const goToNext = () => {
        const currentIndex = galleryItems.findIndex(item => item.id === selectedImage.id);
        const nextIndex = (currentIndex + 1) % galleryItems.length;
        setSelectedImage(galleryItems[nextIndex]);
    };

    const goToPrev = () => {
        const currentIndex = galleryItems.findIndex(item => item.id === selectedImage.id);
        const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        setSelectedImage(galleryItems[prevIndex]);
    };

    return (
        <section id="gallery" className="section bg-white dark:bg-dark-secondary relative border-y border-gray-200 dark:border-gray-800 dark:bg-dark">
            <div className="container">
                <motion.div
                    className="text-center mb-8 lg:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                        Gallery Momen
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto">
                        Kumpulan kenangan dan momen berharga selama perjalanan kita bersama
                    </p>
                </motion.div>

                {/* Filter Section */}
                <motion.div
                    className="mb-6 lg:mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        {/* Search Bar */}
                        <div className="relative w-full sm:w-auto">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari momen..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    <X className="w-4 h-4 text-gray-400" />
                                </button>
                            )}
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedCategory === category.id
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {category.label}
                                    <span className="ml-1 opacity-75">({category.count})</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {filteredItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="group cursor-pointer"
                            onClick={() => handleImageClick(item)}>
                            <div className="card overflow-hidden">
                                {/* Image Container */}
                                <div className="relative overflow-hidden">
                                    <div className="aspect-square bg-gray-200 dark:bg-gray-800 relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Category Badge */}
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-medium">
                                                {categories.find(c => c.id === item.category)?.label}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-bold text-sm sm:text-base line-clamp-1">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Calendar className="w-3 h-3" />
                                            <span>{item.date}</span>
                                        </div>
                                    </div>

                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text-secondary line-clamp-2 mb-3">
                                        {item.description}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                <span>{item.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="w-3 h-3" />
                                                <span>{item.people} orang</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <p className="text-gray-500 dark:text-gray-400">
                            Tidak ada momen yang ditemukan. Coba kategori lain atau kata kunci berbeda.
                        </p>
                    </motion.div>
                )}

                {/* Image Modal */}
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center p-4 bg-black/90"
                        onClick={closeModal}
                    >
                        <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute -top-10 right-0 p-2 text-white hover:text-gray-300"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Navigation Buttons */}
                            <button
                                onClick={goToPrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={goToNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>

                            {/* Fullscreen Button */}
                            <button
                                onClick={() => window.open(selectedImage.image, '_blank')}
                                className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20"
                            >
                                <Maximize2 className="w-5 h-5" />
                            </button>

                            {/* Modal Content */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
                                <div className="aspect-video bg-gray-900 relative">
                                    {/* Placeholder for image */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <p className="text-white/50">[Image: {selectedImage.title}]</p>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
                                            <p className="text-gray-600 dark:text-dark-text-secondary">
                                                {selectedImage.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                                                {categories.find(c => c.id === selectedImage.category)?.label}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm">{selectedImage.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm">{selectedImage.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm">{selectedImage.people} orang</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <p>Momen #{selectedImage.id} dari koleksi gallery</p>
                                        <button
                                            onClick={closeModal}
                                            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                                        >
                                            Tutup
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Gallery;
