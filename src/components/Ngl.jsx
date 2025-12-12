import { useState, useEffect, useRef } from 'react';
import {
    MessageCircle,
    Heart, Calendar, User, ChevronLeft,
    ChevronRight, Send, Lock, Shield, AlertCircle,
    Instagram
} from 'lucide-react';
import { supabase } from '../supabase';

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
    const [selectedCategory, setSelectedCategory] = useState('auto'); // Tambah state untuk kategori

    // State untuk data dari database
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

    // State untuk tracking likes yang sudah ditekan
    const [likedMessages, setLikedMessages] = useState(new Set());

    const carouselRef = useRef(null);

    // PERBANYAK KATEGORI
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

    // ================ FUNGSI DETEKSI KATEGORI ================

    const detectCategory = (message, subject = '') => {
        const text = (message + ' ' + subject).toLowerCase();

        // Mapping keyword untuk setiap kategori
        const categoryKeywords = {
            'kenangan': ['inget', 'kenangan', 'dulu', 'masa lalu', 'pasti ingat', 'zaman dulu', 'dulu banget', 'masa-masa'],
            'terimakasih': ['terima kasih', 'makasih', 'thank you', 'thanks', 'terimakasih', 'terima kasih banyak', 'makasih banyak'],
            'inspirasi': ['inspirasi', 'motivasi', 'semangat', 'never give up', 'pantang menyerah', 'inspiratif', 'menginspirasi'],
            'bangga': ['bangga', 'proud', 'hebat', 'keren', 'mantap', 'wow', 'luar biasa', 'fantastis'],
            'harapan': ['harapan', 'semoga', 'sukses', 'masa depan', 'kedepannya', 'mudah-mudahan', 'amin', 'doa'],
            'lucu': ['lucu', 'ngakak', 'ketawa', 'humor', 'gokil', 'ngakak banget', 'lucu banget', 'wkwk', 'haha'],
            'sedih': ['sedih', 'kecewa', 'menyakitkan', 'sakit hati', 'berduka', 'pilu', 'haru', 'melankolis'],
            'semangat': ['semangat', 'spirit', 'fight', 'ayo', 'maju', 'gas', 'lets go', 'tetap semangat'],
            'pujian': ['pujian', 'komplimen', 'hebat', 'bagus', 'keren', 'sempurna', 'memuaskan', 'excellent'],
            'curhat': ['curhat', 'cerita', 'share', 'ceritain', 'curcol', 'venting', 'keluh kesah'],
            'nasehat': ['nasehat', 'saran', 'tips', 'masukan', 'rekomendasi', 'sarankan', 'anjuran'],
            'kerjasama': ['kerjasama', 'kolaborasi', 'teamwork', 'bareng-bareng', 'bersama', 'tim'],
            'prestasi': ['prestasi', 'pencapaian', 'achievement', 'hasil', 'juara', 'menang', 'berhasil']
        };

        // Hitung skor untuk setiap kategori
        const categoryScores = {};

        for (const [category, keywords] of Object.entries(categoryKeywords)) {
            let score = 0;
            keywords.forEach(keyword => {
                if (text.includes(keyword)) {
                    score += 1;
                    // Bonus jika keyword lebih panjang (lebih spesifik)
                    if (keyword.length > 3) score += 0.5;
                }
            });
            if (score > 0) {
                categoryScores[category] = score;
            }
        }

        // Ambil kategori dengan skor tertinggi
        const sortedCategories = Object.entries(categoryScores)
            .sort(([, a], [, b]) => b - a);

        // Return kategori dengan skor tertinggi, minimal 0.5
        if (sortedCategories.length > 0 && sortedCategories[0][1] >= 0.5) {
            return sortedCategories[0][0];
        }

        return 'all'; // default
    };

    // ================ FUNGSI UTAMA ================

    // Load liked messages dari sessionStorage saat pertama kali
    useEffect(() => {
        loadLikedMessages();
        fetchMessages();
        fetchStats();
        checkRateLimit();
    }, []);

    // Setup real-time subscription dan auto-refresh
    useEffect(() => {
        // Auto-refresh data setiap 30 detik
        const refreshInterval = setInterval(() => {
            if (!loading) {
                fetchMessages();
                fetchStats();
            }
        }, 30000); // 30 detik

        // Real-time subscription untuk pesan baru dan likes
        const messagesSubscription = supabase
            .channel('ngl-messages')
            .on('postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'ngl_messages'
                },
                (payload) => {
                    console.log('New message received:', payload.new);
                    const newMessage = {
                        ...payload.new,
                        timestamp: formatTimeAgo(payload.new.created_at),
                        likes: payload.new.likes || 0
                    };
                    setNglMessages(prev => [newMessage, ...prev]);
                    fetchStats();
                }
            )
            .on('postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'ngl_messages'
                },
                (payload) => {
                    console.log('Message updated:', payload.new);
                    // Update likes secara real-time
                    setNglMessages(prev =>
                        prev.map(msg =>
                            msg.id === payload.new.id
                                ? {
                                    ...msg,
                                    likes: payload.new.likes || 0,
                                    // Pastikan timestamp tetap ada
                                    timestamp: msg.timestamp || formatTimeAgo(payload.new.created_at)
                                }
                                : msg
                        )
                    );
                    fetchStats();
                }
            )
            .subscribe();

        // Auto slide untuk carousel
        const slideInterval = setInterval(() => {
            if (nglMessages.length > 0) {
                nextSlide();
            }
        }, 6000);

        // Touch/swipe support
        setupTouchSwipe();

        return () => {
            clearInterval(refreshInterval);
            clearInterval(slideInterval);
            supabase.removeChannel(messagesSubscription);
        };
    }, [nglMessages.length, loading]);

    const setupTouchSwipe = () => {
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
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        };

        carousel.addEventListener('touchstart', handleTouchStart);
        carousel.addEventListener('touchend', handleTouchEnd);

        return () => {
            carousel.removeEventListener('touchstart', handleTouchStart);
            carousel.removeEventListener('touchend', handleTouchEnd);
        };
    };

    // Load liked messages dari sessionStorage
    const loadLikedMessages = () => {
        try {
            const likedMessagesSet = new Set();
            // Cari semua keys di sessionStorage yang dimulai dengan 'ngl_like_'
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                if (key && key.startsWith('ngl_like_')) {
                    const messageId = key.replace('ngl_like_', '');
                    likedMessagesSet.add(messageId);
                }
            }
            setLikedMessages(likedMessagesSet);
        } catch (error) {
            console.error('Error loading liked messages:', error);
        }
    };

    const fetchMessages = async () => {
        try {
            setLoading(true);
            console.log('Fetching messages from Supabase...');

            const { data, error } = await supabase
                .from('ngl_messages')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(50); // Ambil lebih banyak data

            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }

            console.log('Fetched', data?.length || 0, 'messages');

            const formattedData = data.map(msg => ({
                ...msg,
                timestamp: formatTimeAgo(msg.created_at),
                likes: msg.likes || 0,
                // Tambahkan subject default jika kosong
                subject: msg.subject || 'Anonim',
                // Pastikan kategori ada
                category: msg.category || 'all'
            }));

            setNglMessages(formattedData);

        } catch (error) {
            console.error('Error fetching messages:', error);
            // Fallback ke data dummy jika error
            if (nglMessages.length === 0) {
                setNglMessages(getFallbackMessages());
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const { count: totalMessages, error: countError } = await supabase
                .from('ngl_messages')
                .select('*', { count: 'exact', head: true });

            if (countError) throw countError;

            const { data: likesData, error: likesError } = await supabase
                .from('ngl_messages')
                .select('likes');

            if (likesError) throw likesError;

            const totalLikes = likesData?.reduce((sum, msg) => sum + (msg.likes || 0), 0) || 0;

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const { count: messagesToday, error: todayError } = await supabase
                .from('ngl_messages')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', today.toISOString());

            if (todayError) throw todayError;

            setTotalStats({
                totalMessages: totalMessages || 0,
                totalLikes,
                messagesToday: messagesToday || 0
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    // ================ RATE LIMIT FUNCTIONS ================

    const checkRateLimit = async () => {
        try {
            // Jika menggunakan Edge Functions
            if (import.meta.env.VITE_USE_EDGE_FUNCTIONS === 'true') {
                const result = await callEdgeFunction('check-rate-limit');
                if (result.success) {
                    setRateLimitInfo(result.data);
                }
            } else {
                // Fallback: Hitung dari local storage
                const now = Date.now();
                const oneHourAgo = now - 3600000;

                // Ambil history dari localStorage
                const submissionHistory = JSON.parse(localStorage.getItem('ngl_submission_history') || '[]');
                const recentSubmissions = submissionHistory.filter(time => time > oneHourAgo);

                setRateLimitInfo({
                    remaining: Math.max(0, 5 - recentSubmissions.length),
                    isLimited: recentSubmissions.length >= 5,
                    resetTime: recentSubmissions.length > 0 ? new Date(recentSubmissions[0] + 3600000) : null
                });
            }
        } catch (error) {
            console.error('Error checking rate limit:', error);
        }
    };

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

    // ================ FORM HANDLING YANG DIPERBAIKI ================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
        if (e.target.id === 'message') {
            setMessageCount(e.target.value.length);
            // Auto deteksi kategori saat mengetik (opsional)
            if (selectedCategory === 'auto' && e.target.value.length > 10) {
                // Bisa tambahkan preview kategori di sini
            }
        }
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };

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
            const resetTime = rateLimitInfo.resetTime
                ? new Date(rateLimitInfo.resetTime).toLocaleTimeString('id-ID')
                : '1 jam';
            setSubmitMessage(`Limit tercapai. Coba lagi setelah ${resetTime}`);
            return;
        }

        setIsSubmitting(true);

        try {
            let result;

            // Tentukan kategori
            let finalCategory;
            if (selectedCategory === 'auto') {
                finalCategory = detectCategory(formData.message, formData.subject);
            } else {
                finalCategory = selectedCategory;
            }

            // Coba Edge Function jika diaktifkan
            if (import.meta.env.VITE_USE_EDGE_FUNCTIONS === 'true') {
                result = await callEdgeFunction('submit-message', {
                    message: formData.message,
                    subject: formData.subject,
                    category: finalCategory
                });
            } else {
                // Fallback ke direct insert dengan validasi client-side
                result = await submitWithClientValidation(finalCategory);
            }

            if (result.success) {
                // Success
                const detectedCategoryName = categories.find(c => c.id === finalCategory)?.label || 'Umum';
                setSubmitMessage(`Pesanmu (${detectedCategoryName}) sudah mendarat! 😎`);
                setFormData({ subject: '', message: '' });
                setMessageCount(0);
                setSelectedCategory('auto'); // Reset ke auto deteksi

                // Update rate limit di localStorage
                updateLocalRateLimit();

                // Auto hide form
                setShowForm(false);

                // Refresh data setelah submit
                setTimeout(() => {
                    fetchMessages();
                    fetchStats();
                }, 1000);

                setTimeout(() => {
                    setShowForm(true);
                    setTimeout(() => setSubmitMessage(''), 500);
                }, 3000);

            } else {
                setSubmitMessage(result.error || "Oops, ada error. Coba lagi ya!");
            }

        } catch (error) {
            console.error('Error submitting message:', error);
            setSubmitMessage("Sistem sedang sibuk. Coba lagi nanti!");
        } finally {
            setIsSubmitting(false);
            checkRateLimit();
        }
    };

    const submitWithClientValidation = async (category) => {
        // Validasi kata kasar sederhana di client
        const BAD_WORDS = ['anjing', 'bangsat', 'kontol', 'memek', 'asu'];
        const lowerMessage = formData.message.toLowerCase();
        const lowerSubject = formData.subject ? formData.subject.toLowerCase() : '';

        const foundBadWord = BAD_WORDS.find(word =>
            lowerMessage.includes(word) ||
            (formData.subject && lowerSubject.includes(word))
        );

        if (foundBadWord) {
            return {
                success: false,
                error: 'Pesan mengandung kata-kata yang tidak pantas.'
            };
        }

        // Insert ke database DENGAN KATEGORI YANG BENAR
        const { data, error } = await supabase
            .from('ngl_messages')
            .insert([{
                message: formData.message.trim(),
                subject: formData.subject.trim() || 'Anonim',
                category: category || 'all', // PASTIKAN pakai category yang ditentukan
                emoji: getRandomEmoji(),
                likes: 0,
                is_approved: true
            }])
            .select()
            .single();

        if (error) throw error;

        return {
            success: true,
            data
        };
    };

    const updateLocalRateLimit = () => {
        const now = Date.now();
        const submissionHistory = JSON.parse(localStorage.getItem('ngl_submission_history') || '[]');

        // Simpan waktu submit
        submissionHistory.push(now);

        // Simpan hanya 5 terakhir untuk efisiensi
        const recentHistory = submissionHistory.slice(-5);
        localStorage.setItem('ngl_submission_history', JSON.stringify(recentHistory));
    };

    // ================ LIKE FUNCTION ================

    const handleLike = async (messageId) => {
        try {
            // Cek apakah sudah pernah like
            if (likedMessages.has(messageId)) {
                console.log('Already liked message:', messageId);
                return;
            }

            // **UPDATE UI TERLEBIH DAHULU UNTUK FEEDBACK INSTAN**
            // 1. Update state likedMessages
            const newLikedMessages = new Set(likedMessages);
            newLikedMessages.add(messageId);
            setLikedMessages(newLikedMessages);

            // 2. Update UI lokal (instan)
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

            // 3. Simpan di sessionStorage
            sessionStorage.setItem(`ngl_like_${messageId}`, 'true');

            // 4. Update database (async)
            setTimeout(async () => {
                try {
                    const { data: currentMessage } = await supabase
                        .from('ngl_messages')
                        .select('likes')
                        .eq('id', messageId)
                        .single();

                    if (!currentMessage) return;

                    const newLikes = (currentMessage.likes || 0) + 1;

                    const { error } = await supabase
                        .from('ngl_messages')
                        .update({ likes: newLikes })
                        .eq('id', messageId);

                    if (error) {
                        console.error('Database update error:', error);
                        // Rollback jika error
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
                        const rollbackLikedMessages = new Set(likedMessages);
                        rollbackLikedMessages.delete(messageId);
                        setLikedMessages(rollbackLikedMessages);
                        sessionStorage.removeItem(`ngl_like_${messageId}`);
                    } else {
                        console.log('Like berhasil disimpan ke database');
                        // Refresh stats setelah like
                        fetchStats();
                    }
                } catch (dbError) {
                    console.error('Error updating like in database:', dbError);
                }
            }, 100);

        } catch (error) {
            console.error('Error in handleLike:', error);
        }
    };

    // Fungsi untuk cek apakah message sudah dilike
    const isMessageLiked = (messageId) => {
        return likedMessages.has(messageId);
    };

    // ================ HELPER FUNCTIONS ================

    const nextSlide = () => {
        if (nglMessages.length > 0) {
            setActiveSlide((prev) => (prev + 1) % nglMessages.length);
        }
    };

    const prevSlide = () => {
        if (nglMessages.length > 0) {
            setActiveSlide((prev) => (prev - 1 + nglMessages.length) % nglMessages.length);
        }
    };

    const getRandomEmoji = () => {
        const emojis = ['🎉', '😅', '🙏', '🔥', '📈', '🤝', '✨', '💫', '😊', '👍', '❤️', '👏', '🎊', '🌟', '😄', '🎯', '🏆', '⭐', '🌈', '🚀'];
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
            message: "Selamat buat kita semua yang udah bertahan sampai akhir! Awalnya bingung banget coding, sekarang udah bisa bikin aplikasi sendiri. Gak nyangka perjalanan 3 tahun bisa ngubah hidup gini.",
            subject: 'Perjuangan 3 Tahun',
            likes: 42,
            timestamp: "2 jam lalu",
            category: "inspirasi",
            emoji: "🎉"
        },
        {
            id: '2',
            message: "Inget gak pas pertama kali belajar HTML? Error mulu, frustasi banget. Sekarang liat hasil project akhir, worth it semua struggle-nya!",
            subject: 'Kenangan Pertama',
            likes: 38,
            timestamp: "5 jam lalu",
            category: "kenangan",
            emoji: "😅"
        },
        {
            id: '3',
            message: "Makasih buat teman-teman yang selalu bantu pas aku stuck. Gak ada yang bisa aku bayar back kecuali doa dan semoga sukses selalu!",
            subject: 'Terima Kasih',
            likes: 56,
            timestamp: "1 hari lalu",
            category: "terimakasih",
            emoji: "🙏"
        },
        {
            id: '4',
            message: "Project akhir kita emang epic banget! Dari ide receh jadi aplikasi yang benar-benar dipake. Proud of us!",
            subject: 'Project Epic',
            likes: 47,
            timestamp: "2 hari lalu",
            category: "bangga",
            emoji: "🔥"
        },
        {
            id: '5',
            message: "Masih inget pas presentasi sambil gemeteran? Sekarang udah lebih pede ngomong di depan umum. Growth!",
            subject: 'Pertumbuhan Diri',
            likes: 33,
            timestamp: "3 hari lalu",
            category: "inspirasi",
            emoji: "📈"
        },
        {
            id: '6',
            message: "Semoga kita semua bisa ketemu lagi di dunia kerja. Tetap jaga silaturahmi ya teman-teman!",
            subject: 'Harapan Masa Depan',
            likes: 61,
            timestamp: "1 minggu lalu",
            category: "harapan",
            emoji: "🤝"
        }
    ];

    const formatMessage = (text) => {
        return text.split('\n').map((line, i) => (
            <span key={i}>
                {line}
                {i < text.split('\n').length - 1 && <br />}
            </span>
        ));
    };

    // ================ RENDER FUNCTIONS ================

    const renderRateLimitInfo = () => (
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
    );

    const renderCategorySelector = (isMobile = false) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kategori {selectedCategory === 'auto' && '(Auto Deteksi)'}
            </label>
            <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                    <button
                        key={category.id}
                        type="button"
                        onClick={() => handleCategorySelect(category.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${selectedCategory === category.id
                            ? 'ring-2 ring-offset-1 ring-blue-500 transform scale-105'
                            : 'opacity-90 hover:opacity-100'
                            } ${category.color}`}
                    >
                        <span>{category.icon}</span>
                        <span>{isMobile && category.id !== 'auto' ? category.label.substring(0, 8) : category.label}</span>
                    </button>
                ))}
            </div>
            {selectedCategory !== 'auto' && (
                <p className="text-xs text-gray-500 mt-2">
                    Kategori dipilih: <span className="font-medium">{categories.find(c => c.id === selectedCategory)?.label}</span>
                </p>
            )}
        </div>
    );

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
                            onChange={handleChange}
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
                            onChange={handleChange}
                            className={`w-full ${isMobile ? 'px-3 py-2.5' : 'px-4 py-3'} text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent resize-none`}
                            placeholder="Tulis pesan anonimmu di sini..."
                            required
                            maxLength={500}
                        />
                        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                            {messageCount}/500
                        </div>
                    </div>

                    {/* Tambahkan Category Selector */}
                    {renderCategorySelector(isMobile)}

                    {renderRateLimitInfo()}

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
                    <div className={`mt-4 p-3 rounded-lg text-xs text-center animate-pulse ${submitMessage.includes('berhasil') || submitMessage.includes('mendarat')
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
        const isLiked = isMessageLiked(msg.id);
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
                                    : 'text-gray-500 hover:text-red-500 hover:scale-110'}`}
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

    // ================ RENDER COMPONENT ================

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
                    {/* Title */}
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
                        {/* Refresh Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={() => {
                                    fetchMessages();
                                    fetchStats();
                                }}
                                className="px-4 py-2 text-white bg-black dark:bg-gray-800 dark:text-neutral-300 rounded-lg text-sm font-mediu transition-colors"
                            >
                                🔄 Refresh Pesan
                            </button>
                        </div>

                        {/* Carousel */}
                        {nglMessages.length > 0 ? (
                            <div className="card p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-4 bg-blue-500 rounded-full"></div>
                                        <h3 className="font-bold text-sm">Pesan Terbaru ({nglMessages.length})</h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={prevSlide} className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        <button onClick={nextSlide} className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div ref={carouselRef} className="overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900/50 p-4 touch-pan-y">
                                    <div className="transition-transform duration-300 ease-out"
                                        style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                                        <div className="flex">
                                            {nglMessages.map(msg => renderMessageItem(msg, true))}
                                        </div>
                                    </div>
                                </div>

                                {/* Dots */}
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
                        ) : (
                            <div className="card p-4 text-center">
                                <p className="text-gray-500 dark:text-gray-400">Belum ada pesan. Jadilah yang pertama!</p>
                            </div>
                        )}

                        {/* Mobile Form */}
                        {renderForm(true)}

                        {/* Mobile Stats */}
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
                        {/* Left Column - Form */}
                        {renderForm(false)}

                        {/* Right Column - Carousel */}
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
                                                Auto-refresh setiap 30 detik • Real-time updates
                                                <button
                                                    onClick={() => {
                                                        fetchMessages();
                                                        fetchStats();
                                                    }}
                                                    className="ml-2 text-blue-500 hover:text-blue-700 text-xs"
                                                >
                                                    🔄 Refresh
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={prevSlide} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button onClick={nextSlide} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {nglMessages.length > 0 ? (
                                    <>
                                        <div className="relative index-0" ref={carouselRef}>
                                            <div className="overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 p-6">
                                                <div className="transition-transform duration-500 ease-out"
                                                    style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
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
                                                        onClick={() => setActiveSlide(index)}
                                                        className={`w-2 h-2 rounded-full transition-all ${index === activeSlide ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-6' : 'bg-gray-300 dark:bg-gray-700'}`}
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

                    {/* Tips */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500">
                            💡 Tips: Sistem akan otomatis mendeteksi kategori pesanmu. Atau pilih manual!
                        </p>
                    </div>

                    {/* Social Links */}
                    <div
                        id="connect"
                        className="hidden lg:block text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
                    >
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            Follow perkembangan kita di media sosial
                        </p>

                        <div className="flex items-center justify-center gap-3">
                            <a
                                href="#"
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