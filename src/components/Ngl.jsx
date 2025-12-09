import { useState, useEffect, useRef } from 'react';
import {
    Linkedin, Github, Dribbble, MessageCircle,
    Heart, Calendar, User, ChevronLeft,
    ChevronRight, Send, Smile, Lock, Shield
} from 'lucide-react';

const Ngl = () => {
    const [formData, setFormData] = useState({
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [activeSlide, setActiveSlide] = useState(0);
    const [showForm, setShowForm] = useState(true);
    const [messageCount, setMessageCount] = useState(0);
    const carouselRef = useRef(null);

    // Dummy data untuk carousel
    const nglMessages = [
        {
            id: 1,
            message: "Selamat buat kita semua yang udah bertahan sampai akhir! Awalnya bingung banget coding, sekarang udah bisa bikin aplikasi sendiri. Gak nyangka perjalanan 3 tahun bisa ngubah hidup gini.",
            likes: 42,
            timestamp: "2 jam lalu",
            category: "inspirasi",
            emoji: "🎉"
        },
        {
            id: 2,
            message: "Inget gak pas pertama kali belajar HTML? Error mulu, frustasi banget. Sekarang liat hasil project akhir, worth it semua struggle-nya!",
            likes: 38,
            timestamp: "5 jam lalu",
            category: "kenangan",
            emoji: "😅"
        },
        {
            id: 3,
            message: "Makasih buat teman-teman yang selalu bantu pas aku stuck. Gak ada yang bisa aku bayar back kecuali doa dan semoga sukses selalu!",
            likes: 56,
            timestamp: "1 hari lalu",
            category: "terimakasih",
            emoji: "🙏"
        },
        {
            id: 4,
            message: "Project akhir kita emang epic banget! Dari ide receh jadi aplikasi yang benar-benar dipake. Proud of us!",
            likes: 47,
            timestamp: "2 hari lalu",
            category: "bangga",
            emoji: "🔥"
        },
        {
            id: 5,
            message: "Masih inget pas presentasi sambil gemeteran? Sekarang udah lebih pede ngomong di depan umum. Growth!",
            likes: 33,
            timestamp: "3 hari lalu",
            category: "pertumbuhan",
            emoji: "📈"
        },
        {
            id: 6,
            message: "Semoga kita semua bisa ketemu lagi di dunia kerja. Tetap jaga silaturahmi ya teman-teman!",
            likes: 61,
            timestamp: "1 minggu lalu",
            category: "harapan",
            emoji: "🤝"
        }
    ];

    const categories = [
        { id: 'all', label: 'Semua', color: 'bg-gray-100 dark:bg-gray-800' },
        { id: 'kenangan', label: 'Kenangan', color: 'bg-blue-100 dark:bg-blue-900/30' },
        { id: 'terimakasih', label: 'Terima Kasih', color: 'bg-green-100 dark:bg-green-900/30' },
        { id: 'inspirasi', label: 'Inspirasi', color: 'bg-purple-100 dark:bg-purple-900/30' },
        { id: 'bangga', label: 'Bangga', color: 'bg-yellow-100 dark:bg-yellow-900/30' },
        { id: 'harapan', label: 'Harapan', color: 'bg-pink-100 dark:bg-pink-900/30' }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
        // Update character count
        if (e.target.id === 'message') {
            setMessageCount(e.target.value.length);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.message.trim()) return;

        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 800));

        // Reset form
        setSubmitMessage("Pesanmu sudah mendarat! 😎");
        setFormData({ subject: '', message: '' });
        setMessageCount(0);
        setIsSubmitting(false);
        setShowForm(false);

        // Auto show form after 3 seconds
        setTimeout(() => {
            setShowForm(true);
            setTimeout(() => setSubmitMessage(''), 500);
        }, 3000);
    };

    const nextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % nglMessages.length);
    };

    const prevSlide = () => {
        setActiveSlide((prev) => (prev - 1 + nglMessages.length) % nglMessages.length);
    };

    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 6000);
        return () => clearInterval(interval);
    }, [activeSlide]);

    // Touch/swipe support for mobile
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        let startX = 0;
        let endX = 0;

        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
        };

        const handleTouchEnd = (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        };

        const handleSwipe = () => {
            const threshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    nextSlide(); // Swipe left
                } else {
                    prevSlide(); // Swipe right
                }
            }
        };

        carousel.addEventListener('touchstart', handleTouchStart);
        carousel.addEventListener('touchend', handleTouchEnd);

        return () => {
            carousel.removeEventListener('touchstart', handleTouchStart);
            carousel.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    const formatMessage = (text) => {
        return text.split('\n').map((line, i) => (
            <span key={i}>
                {line}
                {i < text.split('\n').length - 1 && <br />}
            </span>
        ));
    };

    return (
        <section id="ngl" className="section bg-primary-light dark:bg-dark-secondary">
            <div className="container px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Title - Mobile Optimized */}
                    <div className="text-center mb-8 sm:mb-12">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                                <MessageCircle className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                                NGL Zone
                            </h2>
                            <span className="text-xl">😶‍🌫️</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text-secondary max-w-md mx-auto px-4">
                            Mau curhat, confess, atau cuma kirim pesan random?
                            Santai aja—semuanya aman dan anonim ✨
                        </p>
                    </div>

                    {/* Mobile: Single Column View */}
                    <div className="lg:hidden space-y-6">
                        {/* Security Info */}
                        <div className="card p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                    <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm">100% Anonim</h3>
                                    <p className="text-xs text-gray-500">Tidak ada data yang disimpan</p>
                                </div>
                            </div>
                        </div>

                        {/* Carousel First on Mobile */}
                        <div className="card p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-4 bg-blue-500 rounded-full"></div>
                                    <h3 className="font-bold text-sm">Pesan Terbaru</h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={prevSlide} className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button onClick={nextSlide} className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Carousel */}
                            <div ref={carouselRef} className="overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900/50 p-4 touch-pan-y">
                                <div className="transition-transform duration-300 ease-out"
                                    style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                                    <div className="flex">
                                        {nglMessages.map((msg) => (
                                            <div key={msg.id} className="w-full flex-shrink-0 px-2">
                                                <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                                                    <div className="flex items-start gap-3 mb-3">
                                                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                            <User className="w-4 h-4 text-gray-500" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs font-medium">Anonim #{msg.id}</span>
                                                                <span className="text-xl">{msg.emoji}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                                <Calendar className="w-3 h-3" />
                                                                <span>{msg.timestamp}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                                        {msg.message}
                                                    </p>
                                                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${categories.find(c => c.id === msg.category)?.color}`}>
                                                            {msg.category}
                                                        </span>
                                                        <div className="flex items-center gap-3">
                                                            <button className="flex items-center gap-1 text-xs text-gray-500">
                                                                <Heart className="w-3 h-3" />
                                                                <span>{msg.likes}</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Dots */}
                            <div className="flex justify-center gap-1.5 mt-4">
                                {nglMessages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveSlide(index)}
                                        className={`w-1.5 h-1.5 rounded-full transition-all ${index === activeSlide ? 'bg-blue-500 w-4' : 'bg-gray-300 dark:bg-gray-700'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Mobile Form */}
                        <div className={`transition-all duration-300 ${showForm ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                            <div className="card p-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <Send className="w-4 h-4 text-blue-500" />
                                    <h3 className="font-bold text-sm">Kirim Pesanmu</h3>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <input
                                            type="text"
                                            id="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                                            placeholder="Judul (optional)"
                                        />
                                    </div>
                                    <div className="relative">
                                        <textarea
                                            id="message"
                                            rows={3}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent resize-none"
                                            placeholder="Tulis pesan anonimmu di sini..."
                                            required
                                        />
                                        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                                            {messageCount}/500
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Lock className="w-3 h-3" />
                                            <span>Aman & Anonim</span>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !formData.message.trim()}
                                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-medium disabled:opacity-50"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-1.5">
                                                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Mengirim
                                                </span>
                                            ) : 'Kirim 🚀'}
                                        </button>
                                    </div>
                                </form>

                                {submitMessage && (
                                    <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg text-xs text-center animate-pulse">
                                        {submitMessage}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Stats */}
                        <div className="card p-4">
                            <div className="grid grid-cols-3 gap-3 text-center">
                                <div>
                                    <div className="text-lg font-bold">{nglMessages.length}</div>
                                    <div className="text-xs text-gray-500">Pesan</div>
                                </div>
                                <div>
                                    <div className="text-lg font-bold">{nglMessages.reduce((a, b) => a + b.likes, 0)}</div>
                                    <div className="text-xs text-gray-500">Likes</div>
                                </div>
                                <div>
                                    <div className="text-lg font-bold">100%</div>
                                    <div className="text-xs text-gray-500">Anonim</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop: Two Column Layout */}
                    <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left Column - Form */}
                        <div className={`transition-all duration-500 ${showForm ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="card p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                                        <Send className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Kirim Pesan</h3>
                                        <p className="text-sm text-gray-500">Anonim • Aman • Private</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium">
                                            Judul (optional)
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm"
                                            placeholder="Misal: 'Pengen nanya sesuatu'"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="message" className="text-sm font-medium">
                                                Pesan kamu *
                                            </label>
                                            <span className="text-xs text-gray-500">{messageCount}/500 karakter</span>
                                        </div>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm resize-none"
                                            placeholder="Tulis apa pun di sini..."
                                            maxLength={500}
                                            required
                                        />
                                    </div>

                                    <div className="flex items-center justify-between pt-3">
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1.5">
                                                <Lock className="w-4 h-4" />
                                                <span>Aman</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <User className="w-4 h-4" />
                                                <span>Anonim</span>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !formData.message.trim()}
                                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Mengirim...
                                                </span>
                                            ) : 'Kirim Sekarang 🚀'}
                                        </button>
                                    </div>
                                </form>

                                {submitMessage && (
                                    <div className="mt-6 p-4 rounded-lg text-center bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-800 dark:text-green-300 text-sm">
                                        {submitMessage}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Carousel */}
                        <div>
                            <div className="card p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                                            <MessageCircle className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Pesan Terbaru</h3>
                                            <p className="text-sm text-gray-500">Scroll untuk lihat lebih banyak</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={prevSlide} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button onClick={nextSlide} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Carousel Container */}
                                <div className="relative" ref={carouselRef}>
                                    <div className="overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 p-6">
                                        <div className="transition-transform duration-500 ease-out"
                                            style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                                            <div className="flex">
                                                {nglMessages.map((msg) => (
                                                    <div key={msg.id} className="w-full flex-shrink-0 px-4">
                                                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                                                            <div className="flex items-start gap-4 mb-4">
                                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                                                                    <User className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex items-center justify-between">
                                                                        <div>
                                                                            <div className="text-sm font-medium">Anonim #{msg.id}</div>
                                                                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                                                <Calendar className="w-3 h-3" />
                                                                                <span>{msg.timestamp}</span>
                                                                            </div>
                                                                        </div>
                                                                        <span className="text-2xl">{msg.emoji}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                                {formatMessage(msg.message)}
                                                            </p>
                                                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                                                                <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${categories.find(c => c.id === msg.category)?.color}`}>
                                                                    #{msg.category}
                                                                </span>
                                                                <div className="flex items-center gap-4">
                                                                    <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                                                                        <Heart className="w-4 h-4" />
                                                                        <span className="text-sm">{msg.likes}</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Dots & Stats */}
                                <div className="mt-6 space-y-4">
                                    <div className="flex justify-center gap-2">
                                        {nglMessages.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setActiveSlide(index)}
                                                className={`w-2 h-2 rounded-full transition-all ${index === activeSlide ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-6' : 'bg-gray-300 dark:bg-gray-700'}`}
                                            />
                                        ))}
                                    </div>

                                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 rounded-lg">
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div>
                                                <div className="text-lg font-bold">{nglMessages.length}</div>
                                                <div className="text-xs text-gray-500">Total Pesan</div>
                                            </div>
                                            <div>
                                                <div className="text-lg font-bold">{nglMessages.reduce((a, b) => a + b.likes, 0)}</div>
                                                <div className="text-xs text-gray-500">Total Likes</div>
                                            </div>
                                            <div>
                                                <div className="text-lg font-bold">100%</div>
                                                <div className="text-xs text-gray-500">Anonim</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Links - Desktop Only */}
                    <div id='connect' className="hidden lg:block text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Follow perkembangan kita di media sosial
                        </p>
                        <div className="flex justify-center gap-6">
                            <a className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hover:scale-110">
                                <Linkedin size={20} />
                            </a>
                            <a className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hover:scale-110">
                                <Dribbble size={20} />
                            </a>
                            <a className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hover:scale-110">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Ngl;