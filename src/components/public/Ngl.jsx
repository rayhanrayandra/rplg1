import { useState, useEffect, useRef } from 'react';
import {
    MessageCircle, Heart, Calendar, User,
    ChevronLeft, ChevronRight, Send, Lock,
    Shield, AlertCircle, Instagram
} from 'lucide-react';

const Ngl = () => {
    // State untuk form
    const [formData, setFormData] = useState({
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [activeSlide, setActiveSlide] = useState(0);
    const [showForm, setShowForm] = useState(true);
    const [messageCount, setMessageCount] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('auto');

    // State untuk data dari API
    const [nglMessages, setNglMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalStats, setTotalStats] = useState({
        totalMessages: 0,
        totalLikes: 0,
        messagesToday: 0
    });

    // State untuk rate limiting
    const [rateLimitInfo, setRateLimitInfo] = useState({
        remaining: 5,
        isLimited: false,
        resetTime: null
    });

    // State untuk tracking likes
    const [likedMessages, setLikedMessages] = useState(new Set());

    // State untuk carousel control
    const [isCarouselHovered, setIsCarouselHovered] = useState(false);
    const [isCarouselTouched, setIsCarouselTouched] = useState(false);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);

    // Refs untuk intervals
    const carouselRef = useRef(null);
    const slideIntervalRef = useRef(null);
    const refreshIntervalRef = useRef(null);

    // Kategori yang lengkap
    const categories = [
        { id: 'all', label: 'Semua', icon: '📦', color: 'bg-gray-100 dark:bg-gray-800' },
        { id: 'kenangan', label: 'Kenangan', icon: '📚', color: 'bg-blue-100 dark:bg-blue-900/30' },
        { id: 'terimakasih', label: 'Terima Kasih', icon: '🙏', color: 'bg-green-100 dark:bg-green-900/30' },
        { id: 'inspirasi', label: 'Inspirasi', icon: '💡', color: 'bg-purple-100 dark:bg-purple-900/30' },
        { id: 'bangga', label: 'Bangga', icon: '🌟', color: 'bg-yellow-100 dark:bg-yellow-900/30' },
        { id: 'harapan', label: 'Harapan', icon: '🌈', color: 'bg-pink-100 dark:bg-pink-900/30' },
        { id: 'lucu', label: 'Lucu', icon: '😂', color: 'bg-orange-100 dark:bg-orange-900/30' },
        { id: 'sedih', label: 'Sedih', icon: '😢', color: 'bg-indigo-100 dark:bg-indigo-900/30' },
        { id: 'semangat', label: 'Semangat', icon: '🔥', color: 'bg-red-100 dark:bg-red-900/30' },
        { id: 'pujian', label: 'Pujian', icon: '🏆', color: 'bg-teal-100 dark:bg-teal-900/30' },
        { id: 'curhat', label: 'Curhat', icon: '💬', color: 'bg-cyan-100 dark:bg-cyan-900/30' },
        { id: 'nasehat', label: 'Nasehat', icon: '🎯', color: 'bg-emerald-100 dark:bg-emerald-900/30' },
        { id: 'kerjasama', label: 'Kerjasama', icon: '🤝', color: 'bg-violet-100 dark:bg-violet-900/30' },
        { id: 'prestasi', label: 'Prestasi', icon: '⭐', color: 'bg-amber-100 dark:bg-amber-900/30' },
        { id: 'auto', label: 'Auto Deteksi', icon: '🔍', color: 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30' }
    ];

    // ================ AUTO-REFRESH SYSTEM ================

    // Setup auto-refresh setiap 30 detik
    const setupAutoRefresh = () => {
        // Hapus interval sebelumnya jika ada
        if (refreshIntervalRef.current) {
            clearInterval(refreshIntervalRef.current);
        }

        // Setup interval baru setiap 30 detik
        refreshIntervalRef.current = setInterval(() => {
            console.log('🔄 Auto-refresh triggered');
            fetchMessages();
            fetchStats();
            checkRateLimit();
        }, 30000); // 30 detik
    };

    // Hentikan auto-refresh
    const stopAutoRefresh = () => {
        if (refreshIntervalRef.current) {
            clearInterval(refreshIntervalRef.current);
            refreshIntervalRef.current = null;
        }
    };

    // ================ CAROUSEL FUNCTIONS ================

    const startAutoSlide = () => {
        if (slideIntervalRef.current) {
            clearInterval(slideIntervalRef.current);
        }

        if (nglMessages.length > 1 && !isCarouselHovered && !isCarouselTouched) {
            slideIntervalRef.current = setInterval(() => {
                setActiveSlide(prev => (prev + 1) % nglMessages.length);
            }, 5000);
        }
    };

    const stopAutoSlide = () => {
        if (slideIntervalRef.current) {
            clearInterval(slideIntervalRef.current);
            slideIntervalRef.current = null;
        }
    };

    const nextSlide = () => {
        if (nglMessages.length > 0) {
            setActiveSlide((prev) => (prev + 1) % nglMessages.length);
            restartAutoSlideAfterDelay();
        }
    };

    const prevSlide = () => {
        if (nglMessages.length > 0) {
            setActiveSlide((prev) => (prev - 1 + nglMessages.length) % nglMessages.length);
            restartAutoSlideAfterDelay();
        }
    };

    const restartAutoSlideAfterDelay = () => {
        stopAutoSlide();
        setTimeout(() => {
            if (!isCarouselHovered && !isCarouselTouched) {
                startAutoSlide();
            }
        }, 10000);
    };

    // ================ TOUCH/SWIPE FUNCTIONS ================

    const handleTouchStart = (e) => {
        setIsCarouselTouched(true);
        stopAutoSlide();
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        setIsCarouselTouched(false);

        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        setTouchStartX(0);
        setTouchEndX(0);

        setTimeout(() => {
            if (!isCarouselHovered) {
                startAutoSlide();
            }
        }, 5000);
    };

    const handleMouseEnter = () => {
        setIsCarouselHovered(true);
        stopAutoSlide();
    };

    const handleMouseLeave = () => {
        setIsCarouselHovered(false);
        setTimeout(() => {
            if (!isCarouselTouched) {
                startAutoSlide();
            }
        }, 1000);
    };

    // ================ DETEKSI KATEGORI ================

    const detectCategory = (message, subject = '') => {
        const text = (message + ' ' + subject).toLowerCase();
        const categoryKeywords = {
            'kenangan': ['inget', 'kenangan', 'dulu', 'masa lalu', 'pasti ingat', 'zaman dulu'],
            'terimakasih': ['terima kasih', 'makasih', 'thank you', 'thanks', 'terimakasih'],
            'inspirasi': ['inspirasi', 'motivasi', 'semangat', 'never give up', 'pantang menyerah'],
            'bangga': ['bangga', 'proud', 'hebat', 'keren', 'mantap', 'luar biasa'],
            'harapan': ['harapan', 'semoga', 'sukses', 'masa depan', 'kedepannya', 'amin'],
            'lucu': ['lucu', 'ngakak', 'ketawa', 'humor', 'gokil', 'wkwk', 'haha'],
            'sedih': ['sedih', 'kecewa', 'menyakitkan', 'sakit hati', 'pilu', 'haru'],
            'semangat': ['semangat', 'spirit', 'fight', 'ayo', 'gas', 'lets go'],
            'pujian': ['pujian', 'komplimen', 'hebat', 'bagus', 'sempurna', 'excellent'],
            'curhat': ['curhat', 'cerita', 'share', 'ceritain', 'curcol', 'venting'],
            'nasehat': ['nasehat', 'saran', 'tips', 'masukan', 'rekomendasi', 'anjuran'],
            'kerjasama': ['kerjasama', 'kolaborasi', 'teamwork', 'bareng-bareng', 'bersama'],
            'prestasi': ['prestasi', 'pencapaian', 'achievement', 'hasil', 'juara', 'menang']
        };

        const categoryScores = {};
        for (const [category, keywords] of Object.entries(categoryKeywords)) {
            let score = 0;
            keywords.forEach(keyword => {
                if (text.includes(keyword)) {
                    score += 1;
                    if (keyword.length > 3) score += 0.5;
                }
            });
            if (score > 0) categoryScores[category] = score;
        }

        const sortedCategories = Object.entries(categoryScores)
            .sort(([, a], [, b]) => b - a);

        return sortedCategories.length > 0 && sortedCategories[0][1] >= 0.5
            ? sortedCategories[0][0]
            : 'all';
    };

    // ================ API CALL FUNCTIONS ================

    const callEdgeFunction = async (functionName, data = {}) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${functionName}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
                    },
                    body: JSON.stringify(data)
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error calling ${functionName}:`, error);
            throw error;
        }
    };

    // Fetch messages dari Edge Function
    const fetchMessages = async () => {
        try {
            setLoading(true);
            const result = await callEdgeFunction('get-messages', { limit: 50 });

            if (result.success) {
                const formattedData = result.data.map(msg => ({
                    ...msg,
                    timestamp: formatTimeAgo(msg.created_at),
                    likes: msg.likes || 0,
                    subject: msg.subject || 'Anonim',
                    category: msg.category || 'all',
                    emoji: msg.emoji || getRandomEmoji()
                }));
                setNglMessages(formattedData);
            } else {
                setNglMessages(getFallbackMessages());
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
            setNglMessages(getFallbackMessages());
        } finally {
            setLoading(false);
        }
    };

    // Fetch stats dari Edge Function
    const fetchStats = async () => {
        try {
            const result = await callEdgeFunction('get-stats');
            if (result.success) {
                setTotalStats(result.data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    // Check rate limit
    const checkRateLimit = async () => {
        try {
            const result = await callEdgeFunction('check-rate-limit');
            if (result.success) {
                setRateLimitInfo(result.data);
            }
        } catch (error) {
            console.error('Error checking rate limit:', error);
        }
    };

    // ================ LOCAL STORAGE FUNCTIONS ================

    const loadLikedMessages = () => {
        try {
            const likedMessagesSet = new Set();

            // Coba baca dari localStorage
            const storedLikes = localStorage.getItem('ngl_liked_messages');

            if (storedLikes) {
                try {
                    const parsedLikes = JSON.parse(storedLikes);
                    if (Array.isArray(parsedLikes)) {
                        parsedLikes.forEach(msgId => likedMessagesSet.add(msgId));
                    }
                } catch (error) {
                    console.error('Error parsing liked messages:', error);
                    // Jika error parsing, hapus data yang corrupt
                    localStorage.removeItem('ngl_liked_messages');
                }
            } else {
                // Coba migrate dari format lama
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith('ngl_like_')) {
                        const messageId = key.replace('ngl_like_', '');
                        likedMessagesSet.add(messageId);
                        localStorage.removeItem(key); // Hapus format lama
                    }
                }
                // Simpan ke format baru
                saveLikedMessages(likedMessagesSet);
            }

            setLikedMessages(likedMessagesSet);
        } catch (error) {
            console.error('Error loading liked messages:', error);
        }
    };

    const saveLikedMessages = (likedSet) => {
        try {
            const likedArray = Array.from(likedSet);
            localStorage.setItem('ngl_liked_messages', JSON.stringify(likedArray));
        } catch (error) {
            console.error('Error saving liked messages:', error);
        }
    };

    // Handle like
    const handleLike = async (messageId) => {
        if (likedMessages.has(messageId)) return;

        try {
            const newLikedMessages = new Set(likedMessages);
            newLikedMessages.add(messageId);

            // Simpan ke state
            setLikedMessages(newLikedMessages);

            // Simpan ke localStorage
            saveLikedMessages(newLikedMessages);

            // Update UI langsung
            setNglMessages(prev =>
                prev.map(msg => {
                    if (msg.id === messageId) {
                        return {
                            ...msg,
                            likes: (msg.likes || 0) + 1
                        };
                    }
                    return msg;
                })
            );

            // Kirim like ke API
            await callEdgeFunction('like-message', { messageId });

        } catch (error) {
            console.error('Error liking message:', error);

            // Rollback jika gagal
            const rollbackLikedMessages = new Set(likedMessages);
            rollbackLikedMessages.delete(messageId);
            setLikedMessages(rollbackLikedMessages);
            saveLikedMessages(rollbackLikedMessages);

            // Rollback UI
            setNglMessages(prev =>
                prev.map(msg => {
                    if (msg.id === messageId) {
                        return {
                            ...msg,
                            likes: Math.max(0, (msg.likes || 0) - 1)
                        };
                    }
                    return msg;
                })
            );
        }
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.message.trim()) {
            setSubmitMessage("Pesan tidak boleh kosong!");
            return;
        }

        if (formData.message.trim().length > 500) {
            setSubmitMessage("Pesan terlalu panjang (maks 500 karakter)");
            return;
        }

        if (rateLimitInfo.isLimited) {
            setSubmitMessage(`Limit tercapai. Coba lagi nanti!`);
            return;
        }

        setIsSubmitting(true);

        try {
            const finalCategory = selectedCategory === 'auto'
                ? detectCategory(formData.message, formData.subject)
                : selectedCategory;

            const result = await callEdgeFunction('submit-message', {
                message: formData.message.trim(),
                subject: formData.subject.trim() || 'Anonim',
                category: finalCategory
            });

            if (result.success) {
                const categoryName = categories.find(c => c.id === finalCategory)?.label || 'Umum';
                setSubmitMessage(`Pesanmu (${categoryName}) sudah mendarat! 😎`);
                setFormData({ subject: '', message: '' });
                setMessageCount(0);
                setSelectedCategory('auto');
                setShowForm(false);

                setTimeout(() => {
                    fetchMessages();
                    fetchStats();
                    checkRateLimit();
                }, 1000);

                setTimeout(() => {
                    setShowForm(true);
                    setTimeout(() => setSubmitMessage(''), 500);
                }, 3000);

            } else {
                switch (result.error) {
                    case 'RATE_LIMIT_EXCEEDED':
                        setSubmitMessage("Limit pengiriman tercapai. Coba lagi nanti!");
                        checkRateLimit();
                        break;
                    case 'INVALID_CONTENT':
                        setSubmitMessage("Pesan mengandung konten yang tidak pantas.");
                        break;
                    case 'CONTENT_TOO_LONG':
                        setSubmitMessage("Pesan terlalu panjang.");
                        break;
                    default:
                        setSubmitMessage("Oops, ada error. Coba lagi ya!");
                }
            }

        } catch (error) {
            console.error('Error submitting message:', error);
            setSubmitMessage("Sistem sedang sibuk. Coba lagi nanti!");
        } finally {
            setIsSubmitting(false);
        }
    };

    // ================ HELPER FUNCTIONS ================

    useEffect(() => {
        // Initial load
        loadLikedMessages();
        fetchMessages();
        fetchStats();
        checkRateLimit();

        // Start auto slide
        startAutoSlide();

        // Setup auto-refresh setiap 30 detik
        setupAutoRefresh();

        // Cleanup function
        return () => {
            stopAutoSlide();
            stopAutoRefresh();
        };
    }, []);

    // Restart auto slide when messages change
    useEffect(() => {
        if (nglMessages.length > 1 && !isCarouselHovered && !isCarouselTouched) {
            startAutoSlide();
        }
    }, [nglMessages.length, isCarouselHovered, isCarouselTouched]);

    const getRandomEmoji = () => {
        const emojis = ['🎉', '😅', '🙏', '🔥', '📈', '🤝', '✨', '💫', '😊', '👍', '❤️', '👏', '🎊', '🌟', '😄'];
        return emojis[Math.floor(Math.random() * emojis.length)];
    };

    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Baru saja';
        if (diffMins < 60) return `${diffMins} menit lalu`;
        if (diffHours < 24) return `${diffHours} jam lalu`;
        if (diffDays === 1) return 'Kemarin';
        if (diffDays < 7) return `${diffDays} hari lalu`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`;

        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getFallbackMessages = () => [
        {
            id: '1',
            message: "Selamat buat kita semua yang udah bertahan sampai akhir!",
            subject: 'Perjuangan 3 Tahun',
            likes: 42,
            timestamp: "2 jam lalu",
            category: "inspirasi",
            emoji: "🎉"
        },
        {
            id: '2',
            message: "Inget gak pas pertama kali belajar HTML? Sekarang udah bisa bikin project!",
            subject: 'Kenangan',
            likes: 38,
            timestamp: "5 jam lalu",
            category: "kenangan",
            emoji: "😅"
        },
        {
            id: '3',
            message: "Makasih buat teman-teman yang selalu bantu pas aku stuck!",
            subject: 'Terima Kasih',
            likes: 56,
            timestamp: "1 hari lalu",
            category: "terimakasih",
            emoji: "🙏"
        }
    ];

    // ================ RENDER FUNCTIONS ================

    const renderForm = (isMobile = false) => (
        <div className={`transition-all duration-300 ${showForm ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`card ${isMobile ? 'p-4' : 'p-6'}`}>
                <div className={`flex items-center gap-2 ${isMobile ? 'mb-4' : 'mb-6'}`}>
                    <Send className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-blue-500`} />
                    <h3 className={`font-bold ${isMobile ? 'text-sm' : 'text-lg'}`}>
                        {isMobile ? 'Kirim Pesanmu' : 'Kirim Pesan'}
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className={`space-y-${isMobile ? '4' : '6'}`}>
                    <div>
                        <input
                            type="text"
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => {
                                setFormData({ ...formData, subject: e.target.value });
                            }}
                            className={`w-full ${isMobile ? 'px-3 py-2.5' : 'px-4 py-3'} text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent`}
                            placeholder="Judul (opsional)"
                            maxLength={100}
                        />
                    </div>

                    <div className="relative">
                        <textarea
                            id="message"
                            rows={isMobile ? 3 : 4}
                            value={formData.message}
                            onChange={(e) => {
                                setFormData({ ...formData, message: e.target.value });
                                setMessageCount(e.target.value.length);
                            }}
                            className={`w-full ${isMobile ? 'px-3 py-2.5' : 'px-4 py-3'} text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent resize-none`}
                            placeholder="Tulis pesan anonimmu di sini..."
                            required
                            maxLength={500}
                        />
                        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                            {messageCount}/500
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Kategori {selectedCategory === 'auto' && '(Auto Deteksi)'}
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${selectedCategory === category.id
                                        ? 'ring-2 ring-offset-1 ring-blue-500 transform scale-105'
                                        : 'opacity-90 hover:opacity-100'
                                        } ${category.color}`}
                                >
                                    <span>{category.icon}</span>
                                    <span>
                                        {isMobile && category.id !== 'auto'
                                            ? category.label.substring(0, 8)
                                            : category.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <div className="flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            <span>Sisa kuota: {rateLimitInfo.remaining} pesan/jam</span>
                        </div>
                        {rateLimitInfo.isLimited && (
                            <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 mt-1">
                                <AlertCircle className="w-3 h-3" />
                                <span>Limit tercapai. Tunggu 1 jam.</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Lock className="w-3 h-3" />
                            <span>Aman & Anonim</span>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting || !formData.message.trim() || rateLimitInfo.isLimited}
                            className={`${isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3'} bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-1.5">
                                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Mengirim
                                </span>
                            ) : rateLimitInfo.isLimited ? (
                                'Limit Tercapai ⏳'
                            ) : isMobile ? 'Kirim 🚀' : 'Kirim Sekarang 🚀'}
                        </button>
                    </div>
                </form>

                {submitMessage && (
                    <div className={`mt-4 p-3 rounded-lg text-xs text-center animate-pulse ${submitMessage.includes('mendarat') || submitMessage.includes('berhasil')
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                        }`}>
                        {submitMessage}
                    </div>
                )}
            </div>
        </div>
    );

    const renderMessageItem = (msg, isMobile = false) => {
        const isLiked = likedMessages.has(msg.id);
        const categoryInfo = categories.find(c => c.id === msg.category) || categories[0];

        return (
            <div key={msg.id} className="w-full flex-shrink-0 px-2">
                <div className={`bg-white dark:bg-gray-800 rounded-xl ${isMobile ? 'p-4' : 'p-6'} transition-all duration-300 hover:shadow-lg`}>
                    <div className="flex items-start gap-3 mb-3">
                        <div className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center`}>
                            <User className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-gray-500 dark:text-gray-400`} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>
                                        {msg.subject}
                                    </span>
                                    <div className="text-xs text-gray-500 mt-1">Anonim</div>
                                </div>
                                <span className={`${isMobile ? 'text-xl' : 'text-2xl'}`}>{msg.emoji || '😊'}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                <Calendar className="w-3 h-3" />
                                <span>{msg.timestamp}</span>
                            </div>
                        </div>
                    </div>
                    <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${isMobile ? 'text-sm' : ''}`}>
                        {msg.message}
                    </p>
                    <div className={`flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 ${!isMobile ? 'mt-6 pt-4' : ''}`}>
                        <span className={`px-2 py-1 rounded-full text-xs ${categoryInfo.color} ${!isMobile ? 'px-3 py-1.5 font-medium' : ''} flex items-center gap-1`}>
                            <span>{categoryInfo.icon}</span>
                            <span>#{msg.category}</span>
                        </span>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleLike(msg.id)}
                                disabled={isLiked}
                                className={`flex items-center gap-1 transition-all duration-300 ${isLiked
                                    ? 'text-red-500 scale-110'
                                    : 'text-gray-500 hover:text-red-500 hover:scale-110'
                                    }`}
                                title={isLiked ? "Sudah dilike" : "Like pesan ini"}
                            >
                                <Heart className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} ${isLiked ? 'fill-current animate-pulse' : ''}`} />
                                <span className={`${isMobile ? 'text-xs' : 'text-sm'} ${isLiked ? 'font-bold' : ''}`}>
                                    {msg.likes || 0}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // ================ RENDER KOMPONEN UTAMA ================

    if (loading && nglMessages.length === 0) {
        return (
            <section id="ngl" className="section bg-primary-light dark:bg-dark-secondary">
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto py-12">
                        <div className="text-center mb-8 sm:mb-12">
                            <div className="inline-flex items-center gap-2 mb-3">
                                <div className="p-2 bg-gradient-to-r bg-primary-light dark:bg-dark-secondary rounded-lg">
                                    <MessageCircle className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                                    NGL Box
                                </h2>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                        <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
                            Memuat pesan...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="ngl" className="section bg-primary-light dark:bg-dark-secondary">
            <div className="container px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <div className="p-2 bg-gradient-to-r bg-black dark:bg-neutral-500 rounded-lg">
                                <MessageCircle className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                                NGL Box
                            </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text-secondary max-w-md mx-auto px-4">
                            Mau curhat, confess, atau cuma kirim pesan random?
                            Santai aja—semuanya aman dan anonim ✨
                        </p>
                    </div>

                    {/* Mobile View */}
                    <div className="lg:hidden space-y-6">
                        <button
                            onClick={() => {
                                fetchMessages();
                                fetchStats();
                                checkRateLimit();
                            }}
                            className="px-4 py-2 text-white bg-black dark:bg-gray-800 dark:text-neutral-300 rounded-lg text-sm font-medium transition-colors w-full"
                        >
                            🔄 Refresh Pesan
                        </button>

                        {nglMessages.length > 0 ? (
                            <div className="card p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-4 bg-blue-500 rounded-full"></div>
                                        <h3 className="font-bold text-sm">Pesan Terbaru ({nglMessages.length})</h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={prevSlide}
                                            className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                            aria-label="Slide sebelumnya"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                            aria-label="Slide berikutnya"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* CAROUSEL MOBILE DENGAN SWIPE */}
                                <div
                                    ref={carouselRef}
                                    className="overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900/50 p-4"
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    style={{ cursor: 'grab' }}
                                >
                                    <div
                                        className="transition-transform duration-300 ease-out"
                                        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                                    >
                                        <div className="flex">
                                            {nglMessages.map(msg => renderMessageItem(msg, true))}
                                        </div>
                                    </div>
                                </div>

                                {/* Swipe indicator */}
                                <div className="text-center mt-3 text-xs text-gray-500 flex items-center justify-center gap-2">
                                    <span className="opacity-70">← Swipe →</span>
                                </div>

                                {/* Dots indicator */}
                                <div className="flex justify-center gap-1.5 mt-4">
                                    {nglMessages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setActiveSlide(index);
                                                restartAutoSlideAfterDelay();
                                            }}
                                            className={`w-1.5 h-1.5 rounded-full transition-all ${index === activeSlide ? 'bg-blue-500 w-4' : 'bg-gray-300 dark:bg-gray-700'}`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="card p-4 text-center">
                                <p className="text-gray-500 dark:text-gray-400">Belum ada pesan. Jadilah yang pertama!</p>
                            </div>
                        )}

                        {renderForm(true)}

                        <div className="card p-4">
                            <div className="grid grid-cols-3 gap-3 text-center">
                                <div>
                                    <div className="text-lg font-bold">{totalStats.totalMessages}</div>
                                    <div className="text-xs text-gray-500">Pesan</div>
                                </div>
                                <div>
                                    <div className="text-lg font-bold">{totalStats.totalLikes}</div>
                                    <div className="text-xs text-gray-500">Likes</div>
                                </div>
                                <div>
                                    <div className="text-lg font-bold">100%</div>
                                    <div className="text-xs text-gray-500">Anonim</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop View */}
                    <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
                        {renderForm(false)}

                        <div>
                            <div className="card p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                                            <MessageCircle className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Pesan Terbaru ({nglMessages.length})</h3>
                                            <p className="text-sm text-gray-500">
                                                🔄 Auto-refresh setiap 30 detik
                                                <button
                                                    onClick={() => {
                                                        fetchMessages();
                                                        fetchStats();
                                                        checkRateLimit();
                                                    }}
                                                    className="
                                                            ml-2 text-xs
                                                            text-blue-600 hover:text-blue-700
                                                            dark:text-blue-400 dark:hover:text-blue-300
                                                            "
                                                >
                                                    Refresh
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={prevSlide}
                                            className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                            aria-label="Slide sebelumnya"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                            aria-label="Slide berikutnya"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {nglMessages.length > 0 ? (
                                    <>
                                        {/* CAROUSEL DESKTOP DENGAN HOVER CONTROL */}
                                        <div
                                            className="relative index-0"
                                            ref={carouselRef}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <div className="overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 p-6">
                                                <div
                                                    className="transition-transform duration-500 ease-out"
                                                    style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                                                >
                                                    <div className="flex">
                                                        {nglMessages.map(msg => renderMessageItem(msg, false))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 space-y-4">
                                            <div className="flex justify-center gap-2">
                                                {nglMessages.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => {
                                                            setActiveSlide(index);
                                                            restartAutoSlideAfterDelay();
                                                        }}
                                                        className={`w-2 h-2 rounded-full transition-all ${index === activeSlide
                                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-6'
                                                            : 'bg-gray-300 dark:bg-gray-700'
                                                            }`}
                                                        aria-label={`Go to slide ${index + 1}`}
                                                    />
                                                ))}
                                            </div>

                                            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 rounded-lg">
                                                <div className="grid grid-cols-3 gap-4 text-center">
                                                    <div>
                                                        <div className="text-lg font-bold">{totalStats.totalMessages}</div>
                                                        <div className="text-xs text-gray-500">Total Pesan</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-lg font-bold">{totalStats.totalLikes}</div>
                                                        <div className="text-xs text-gray-500">Total Likes</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-lg font-bold">100%</div>
                                                        <div className="text-xs text-gray-500">Anonim</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-12">
                                        <MessageCircle className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                                        <p className="text-gray-500 dark:text-gray-400">Belum ada pesan. Jadilah yang pertama!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500">
                            💡 Tips: Sistem akan otomatis mendeteksi kategori pesanmu. Atau pilih manual!
                        </p>
                    </div>

                    <div className="hidden lg:block text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            Follow perkembangan kita di media sosial
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <a
                                href="https://instagram.com/rplg_1"
                                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full 
                       hover:bg-gray-200 dark:hover:bg-gray-700 
                       transition-transform duration-200 hover:scale-110"
                            >
                                <Instagram size={20} />
                            </a>
                            <h6 className="font-semibold tracking-wide">RPLG_1</h6>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Ngl;