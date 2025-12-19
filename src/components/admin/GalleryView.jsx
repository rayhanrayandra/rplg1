import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
    Search, X, Filter,
    Calendar, Users, MapPin,
    ChevronLeft, ChevronRight, Maximize2,
    Download, Edit, Trash2, MoreVertical
} from 'lucide-react';

const GalleryView = () => {
    // State management
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9); // 3x3 grid
    const [showFilter, setShowFilter] = useState(false);
    const [selectedForAction, setSelectedForAction] = useState(null);

    // Categories data
    const categories = [
        { id: 'all', label: 'Semua', count: 24 },
        { id: 'project', label: 'Proyek', count: 8 },
        { id: 'event', label: 'Acara', count: 7 },
        { id: 'daily', label: 'Harian', count: 6 },
        { id: 'class', label: 'Kelas', count: 2 },
        { id: 'graduation', label: 'Kelulusan', count: 1 },
        { id: 'activity', label: 'Aktivitas', count: 0 },
        { id: 'casual', label: 'Kasual', count: 0 },
    ];

    // Gallery items data
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
            image: "/gallery/presentasi.jpg",
            uploadedBy: "Admin",
            uploadDate: "15 Mar 2025 14:30",
            tags: ["presentasi", "project", "kelas12"]
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
            image: "/gallery/study-tour.jpg",
            uploadedBy: "Admin",
            uploadDate: "10 Feb 2025 10:15",
            tags: ["study-tour", "industri", "teknologi"]
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
            image: "/gallery/workshop.jpg",
            uploadedBy: "Admin",
            uploadDate: "5 Jan 2025 09:00",
            tags: ["workshop", "design", "ui-ux"]
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
            image: "/gallery/makan-siang.jpg",
            uploadedBy: "Admin",
            uploadDate: "20 Des 2024 12:45",
            tags: ["makan-siang", "teman", "quality-time"]
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
            image: "/gallery/coding.jpg",
            uploadedBy: "Admin",
            uploadDate: "12 Des 2024 16:20",
            tags: ["coding", "marathon", "lomba"]
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
            image: "/gallery/foto-kelas.jpg",
            uploadedBy: "Admin",
            uploadDate: "5 Des 2024 11:30",
            tags: ["foto", "kelas", "akhir-tahun"]
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
            image: "/gallery/diskusi.jpg",
            uploadedBy: "Admin",
            uploadDate: "25 Nov 2024 13:15",
            tags: ["diskusi", "brainstorming", "kelompok"]
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
            image: "/gallery/praktikum.jpg",
            uploadedBy: "Admin",
            uploadDate: "18 Nov 2024 08:45",
            tags: ["praktikum", "hardware", "troubleshooting"]
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
            image: "/gallery/game-night.jpg",
            uploadedBy: "Admin",
            uploadDate: "10 Nov 2024 19:30",
            tags: ["game", "malam", "refreshing"]
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
            image: "/gallery/lomba.jpg",
            uploadedBy: "Admin",
            uploadDate: "5 Nov 2024 15:10",
            tags: ["persiapan", "lomba", "coding"]
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
            image: "/gallery/outbond.jpg",
            uploadedBy: "Admin",
            uploadDate: "28 Okt 2024 07:00",
            tags: ["outbond", "team-building", "alam"]
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
            image: "/gallery/coffee-break.jpg",
            uploadedBy: "Admin",
            uploadDate: "20 Okt 2024 10:30",
            tags: ["coffee", "istirahat", "ngobrol"]
        },
    ];

    // Filter items based on category and search query
    const filteredItems = galleryItems.filter(item => {
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
            return false;
        }
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return item.title.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.location.toLowerCase().includes(query) ||
                item.tags.some(tag => tag.toLowerCase().includes(query));
        }
        return true;
    });

    // Pagination calculations
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    // Update current page when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);

    // Modal functions
    const handleImageClick = (item) => {
        setSelectedImage(item);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setSelectedForAction(null);
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

    // Pagination controls
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Admin actions
    const handleDelete = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus item ini?')) {
            console.log('Delete item:', id);
            setSelectedForAction(null);
            // Implement actual delete logic here
        }
    };

    const handleEdit = (item) => {
        console.log('Edit item:', item);
        setSelectedForAction(null);
        // Implement edit logic here
    };

    const handleDownload = (item) => {
        console.log('Download item:', item);
        setSelectedForAction(null);
        // Implement download logic here
    };

    return (
        <section id="gallery" className="section bg-white dark:bg-dark-secondary py-8 lg:py-12 ">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-8 lg:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
                        Gallery Momen
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
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
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        {/* Search Bar */}
                        <div className="flex-1 w-full">
                            <div className="relative max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari momen, lokasi, atau tag..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base text-gray-900 dark:text-white"
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
                        </div>

                        {/* Category Filter and Stats */}
                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center w-full lg:w-auto">
                            {/* Mobile Filter Toggle */}
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                <Filter className="w-4 h-4" />
                                <span>Kategori</span>
                                <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                                    {categories.find(c => c.id === selectedCategory)?.count || 0}
                                </span>
                            </button>

                            {/* Category Filter - Desktop */}
                            <div className="hidden lg:flex flex-wrap gap-2">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedCategory === category.id
                                            ? 'bg-blue-500 text-white shadow-md'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        {category.label}
                                        <span className="ml-1.5 px-1.5 py-0.5 bg-white/20 dark:bg-black/20 rounded text-xs">
                                            {category.count}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Menampilkan <span className="font-semibold text-gray-700 dark:text-gray-300">{currentItems.length}</span> dari{' '}
                                <span className="font-semibold text-gray-700 dark:text-gray-300">{filteredItems.length}</span> momen
                            </div>
                        </div>
                    </div>

                    {/* Category Filter - Mobile */}
                    {showFilter && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                            <div className="flex flex-wrap gap-2">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => {
                                            setSelectedCategory(category.id);
                                            setShowFilter(false);
                                        }}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium ${selectedCategory === category.id
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                            }`}
                                    >
                                        {category.label} ({category.count})
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                    {currentItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="group relative"
                        >
                            {/* Admin Action Menu */}
                            <div className="absolute top-3 right-3 z-20">
                                <div className="relative">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedForAction(selectedForAction === item.id ? null : item.id);
                                        }}
                                        className="p-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 shadow-sm"
                                    >
                                        <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    </button>

                                    {selectedForAction === item.id && (
                                        <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-30">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEdit(item);
                                                }}
                                                className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                            >
                                                <Edit className="w-4 h-4" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDownload(item);
                                                }}
                                                className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                            >
                                                <Download className="w-4 h-4" />
                                                Download
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(item.id);
                                                }}
                                                className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Hapus
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div
                                className="card overflow-hidden cursor-pointer h-full"
                                onClick={() => handleImageClick(item)}
                            >
                                {/* Image Container */}
                                <div className="relative overflow-hidden">
                                    <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Category Badge */}
                                        <div className="absolute top-3 left-3 z-10">
                                            <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-medium">
                                                {categories.find(c => c.id === item.category)?.label}
                                            </span>
                                        </div>

                                        {/* Tags */}
                                        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
                                            {item.tags.slice(0, 2).map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded text-xs text-white"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                            {item.tags.length > 2 && (
                                                <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded text-xs text-white">
                                                    +{item.tags.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-bold text-sm sm:text-base line-clamp-1 text-gray-900 dark:text-white">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                            <Calendar className="w-3 h-3" />
                                            <span>{item.date}</span>
                                        </div>
                                    </div>

                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                                        {item.description}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                <span className="truncate max-w-[100px]">{item.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="w-3 h-3" />
                                                <span>{item.people} orang</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span>❤️ {item.likes}</span>
                                            <span>💬 {item.comments}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* No Results Message */}
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

                {/* Pagination */}
                {filteredItems.length > itemsPerPage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800"
                    >
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Halaman <span className="font-semibold text-gray-700 dark:text-gray-300">{currentPage}</span> dari{' '}
                            <span className="font-semibold text-gray-700 dark:text-gray-300">{totalPages}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className={`p-2 rounded-lg ${currentPage === 1
                                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNumber;
                                    if (totalPages <= 5) {
                                        pageNumber = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNumber = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNumber = totalPages - 4 + i;
                                    } else {
                                        pageNumber = currentPage - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNumber}
                                            onClick={() => goToPage(pageNumber)}
                                            className={`w-10 h-10 flex items-center justify-center rounded-lg ${currentPage === pageNumber
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className={`p-2 rounded-lg ${currentPage === totalPages
                                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredItems.length)} dari {filteredItems.length} item
                        </div>
                    </motion.div>
                )}

                {/* Image Modal */}
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
                        onClick={closeModal}
                    >
                        <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={e => e.stopPropagation()}>
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute -top-10 right-0 z-10 p-2 text-white hover:text-gray-300"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Navigation Buttons */}
                            <button
                                onClick={goToPrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 z-10"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={goToNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 z-10"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>

                            {/* Modal Content */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden h-full flex flex-col">
                                {/* Image Section */}
                                <div className="flex-1 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 relative min-h-[300px]">
                                    {/* Placeholder for image */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-5xl mb-4 opacity-50">🖼️</div>
                                            <p className="text-gray-700 dark:text-gray-400 font-medium">{selectedImage.title}</p>
                                        </div>
                                    </div>

                                    {/* Fullscreen Button */}
                                    <button
                                        onClick={() => window.open(selectedImage.image, '_blank')}
                                        className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20"
                                    >
                                        <Maximize2 className="w-5 h-5" />
                                    </button>

                                    {/* Admin Actions in Modal */}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <button
                                            onClick={() => handleDownload(selectedImage)}
                                            className="p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20"
                                            title="Download"
                                        >
                                            <Download className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleEdit(selectedImage)}
                                            className="p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20"
                                            title="Edit"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(selectedImage.id)}
                                            className="p-2 bg-red-500/20 backdrop-blur-sm rounded-lg text-red-300 hover:bg-red-500/30"
                                            title="Hapus"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div className="p-6 flex-shrink-0">
                                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{selectedImage.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedImage.description}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                                                {categories.find(c => c.id === selectedImage.category)?.label}
                                            </span>
                                            <span className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                                                #{selectedImage.id}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Tanggal</p>
                                                <p className="text-sm font-medium">{selectedImage.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Lokasi</p>
                                                <p className="text-sm font-medium">{selectedImage.location}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-gray-400" />
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Orang</p>
                                                <p className="text-sm font-medium">{selectedImage.people} orang</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 flex items-center justify-center">❤️</div>
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Suka</p>
                                                <p className="text-sm font-medium">{selectedImage.likes} likes</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="mb-6">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Tags:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedImage.tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-800">
                                        <div>
                                            <p className="text-xs">Diunggah oleh: <span className="font-medium">{selectedImage.uploadedBy}</span></p>
                                            <p className="text-xs">Pada: {selectedImage.uploadDate}</p>
                                        </div>
                                        <button
                                            onClick={closeModal}
                                            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
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

export default GalleryView;