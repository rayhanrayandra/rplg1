import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, Image as ImageIcon, Bold, Italic,
    Underline, X, Calendar, MapPin, Users, Tag,
    ArrowLeft, Check, AlertCircle, Trash2,
    Eye, Loader2,
    TrashIcon, ChevronDown,
    Tags
} from 'lucide-react';

const GalleryUpload = () => {
    const editorRef = useRef(null);
    const fileInputRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
    const [preview, setPreview] = useState(null);
    const [form, setForm] = useState({
        title: '',
        category: 'project',
        date: '',
        location: '',
        people: '',
        tags: []
    });
    const [currentTag, setCurrentTag] = useState('');

    // Handle drag and drop
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setDragging(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleFileSelect = (file) => {
        if (!file.type.startsWith('image/')) {
            alert('Hanya file gambar yang diperbolehkan');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) handleFileSelect(file);
    };

    const handleTagAdd = () => {
        if (currentTag.trim() && !form.tags.includes(currentTag.trim())) {
            setForm({
                ...form,
                tags: [...form.tags, currentTag.trim()]
            });
            setCurrentTag('');
        }
    };

    const handleTagRemove = (tagToRemove) => {
        setForm({
            ...form,
            tags: form.tags.filter(tag => tag !== tagToRemove)
        });
    };

    const handleSubmit = async () => {
        if (!preview) {
            alert('Silakan pilih gambar terlebih dahulu');
            return;
        }

        setUploadStatus('uploading');

        try {
            // Simulasi API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            setUploadStatus('success');
            setTimeout(() => {
                // Reset form setelah berhasil
                setPreview(null);
                if (editorRef.current) editorRef.current.innerHTML = '';
                setForm({
                    title: '',
                    category: 'project',
                    date: '',
                    location: '',
                    people: '',
                    tags: []
                });
                setUploadStatus('idle');
            }, 2000);
        } catch (error) {
            setUploadStatus('error');
            setTimeout(() => setUploadStatus('idle'), 3000);
        }
    };

    const formatEditor = (command) => {
        document.execCommand(command, false, null);
        editorRef.current?.focus();
    };

    const clearCaption = () => {
        if (editorRef.current) {
            editorRef.current.innerHTML = '';
        }
    };

    // Format tanggal menjadi DD/MM/YYYY
    const formatDateInput = (value) => {
        // Hapus semua karakter non-angka
        let cleaned = value.replace(/\D/g, '');

        // Format: DD/MM/YYYY
        if (cleaned.length >= 5) {
            return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4) + '/' + cleaned.slice(4, 8);
        } else if (cleaned.length >= 3) {
            return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
        } else if (cleaned.length >= 1) {
            return cleaned.slice(0, 2);
        }
        return cleaned;
    };

    const handleDateChange = (e) => {
        const formattedDate = formatDateInput(e.target.value);
        setForm({ ...form, date: formattedDate });
    };

    // Custom Select Component
    const CustomSelect = () => {
        const [isOpen, setIsOpen] = useState(false);

        const categories = [
            { value: "project", label: "Proyek", icon: "🏗️" },
            { value: "event", label: "Acara", icon: "🎉" },
            { value: "daily", label: "Harian", icon: "☀️" },
            { value: "class", label: "Kelas", icon: "📚" }
        ];

        const selectedCategory = categories.find(cat => cat.value === form.category);

        return (
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        w-full flex items-center justify-between px-3 py-2 text-left
                        bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                        rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500
                        text-gray-900 dark:text-white text-sm sm:text-base
                    `}
                >
                    <span className="flex items-center gap-2">
                        <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                        {selectedCategory ? `${selectedCategory.icon} ${selectedCategory.label}` : "Pilih kategori"}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {categories.map((category) => (
                            <button
                                key={category.value}
                                type="button"
                                onClick={() => {
                                    setForm({ ...form, category: category.value });
                                    setIsOpen(false);
                                }}
                                className={`
                                    w-full flex items-center gap-2 px-3 py-2 text-left
                                    hover:bg-gray-100 dark:hover:bg-gray-700
                                    ${form.category === category.value
                                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300'
                                        : 'text-gray-900 dark:text-white'
                                    }
                                    transition-colors text-sm sm:text-base
                                `}
                            >
                                <span className="text-base">{category.icon}</span>
                                <span>{category.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <section className="min-h-screen bg-white dark:bg-dark-secondary py-20">
            <div className="container max-w-5xl mx-auto px-4 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 sm:mb-8"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
                        </button>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                            Upload Momen Baru
                        </h1>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        Tambahkan foto dan ceritakan momennya
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Kolom Kiri - Upload Gambar */}
                    <div className="space-y-4 sm:space-y-6">
                        {/* Area Upload */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className={`
                                aspect-square sm:aspect-[4/3] lg:aspect-square rounded-xl sm:rounded-2xl border-2 border-dashed
                                flex items-center justify-center cursor-pointer
                                transition-all duration-200
                                ${dragging
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10'
                                    : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }
                                overflow-hidden relative
                            `}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                            {preview ? (
                                <>
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                                    />
                                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all rounded-xl sm:rounded-2xl flex items-center justify-center opacity-0 hover:opacity-100">
                                        <Eye className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPreview(null);
                                        }}
                                        className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                    >
                                        <Trash2 size={14} className="sm:w-4 sm:h-4" />
                                    </button>
                                </>
                            ) : (
                                <div className="text-center p-4 sm:p-6">
                                    <ImageIcon className="mx-auto mb-2 sm:mb-3 text-gray-400 dark:text-gray-600 w-10 h-10 sm:w-12 sm:h-12" />
                                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium mb-1">
                                        {dragging ? 'Lepaskan gambar di sini' : 'Klik untuk upload foto'}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                        atau drag & drop
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 sm:mt-2">
                                        JPG, PNG, WebP • Maks 10MB
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Informasi Gambar */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                            <h3 className="font-medium text-gray-900 dark:text-white mb-2 sm:mb-3 text-sm sm:text-base">
                                Informasi Gambar
                            </h3>
                            <div className="space-y-2 sm:space-y-3">
                                <div>
                                    <label className="block text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                                        Judul
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Judul momen"
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        className="w-full px-3 py-2 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                                        Lokasi
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                                        <input
                                            type="text"
                                            placeholder="Lokasi"
                                            value={form.location}
                                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                                            className="w-full pl-8 sm:pl-10 pr-3 py-2 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan - Form */}
                    <div className="space-y-4 sm:space-y-6">
                        {/* Editor Caption */}
                        <div className="border rounded-xl sm:rounded-2xl overflow-hidden dark:border-gray-700">
                            {/* Toolbar */}
                            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                                <button
                                    onClick={() => formatEditor('bold')}
                                    className="p-1.5 sm:p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                    title="Bold"
                                >
                                    <Bold size={14} className="sm:w-4 sm:h-4" />
                                </button>
                                <button
                                    onClick={() => formatEditor('italic')}
                                    className="p-1.5 sm:p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                    title="Italic"
                                >
                                    <Italic size={14} className="sm:w-4 sm:h-4" />
                                </button>
                                <button
                                    onClick={() => formatEditor('underline')}
                                    className="p-1.5 sm:p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                    title="Underline"
                                >
                                    <Underline size={14} className="sm:w-4 sm:h-4" />
                                </button>
                                <div className="flex-1"></div>
                                <button
                                    onClick={clearCaption}
                                    className="p-1.5 sm:p-2 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded transition-colors"
                                    title="Clear"
                                >
                                    <TrashIcon size={14} className="sm:w-4 sm:h-4" />
                                </button>
                            </div>

                            {/* Editor */}
                            <div
                                ref={editorRef}
                                contentEditable
                                placeholder="Tulis caption momen..."
                                className="
                                    min-h-[100px] sm:min-h-[120px] p-3 sm:p-4 text-sm outline-none
                                    bg-white dark:bg-dark-card text-gray-900 dark:text-white
                                    focus:ring-1 focus:ring-blue-500
                                "
                            />
                        </div>

                        {/* Informasi Tambahan */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                            <h3 className="font-medium text-gray-900 dark:text-white mb-3 sm:mb-4 text-sm sm:text-base">
                                Informasi Tambahan
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div className="sm:col-span-1">
                                    <label className="block text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                                        Tanggal (DD/MM/YYYY)
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                                        <input
                                            type="text"
                                            placeholder="DD/MM/YYYY"
                                            value={form.date}
                                            onChange={handleDateChange}
                                            maxLength="10"
                                            className="w-full pl-8 sm:pl-10 pr-3 py-2 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-1">
                                    <label className="block text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                                        Jumlah Orang
                                    </label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="Jumlah orang"
                                            value={form.people}
                                            onChange={(e) => setForm({ ...form, people: e.target.value })}
                                            className="w-full pl-8 sm:pl-10 pr-3 py-2 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                                        Kategori
                                    </label>
                                    <CustomSelect />
                                </div>

                                {/* Tags Input */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        Tags
                                    </label>
                                    <div className="flex flex-row gap-2 mb-2">
                                        <div className="relative flex-1">
                                            <Tags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                                            <input
                                                type="text"
                                                placeholder="Tambahkan tag..."
                                                value={currentTag}
                                                onChange={(e) => setCurrentTag(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleTagAdd()}
                                                className="w-full pl-8 sm:pl-10 pr-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                        </div>
                                        <button
                                            onClick={handleTagAdd}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
                                        >
                                            <Tags/>
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {form.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm"
                                            >
                                                {tag}
                                                <button
                                                    onClick={() => handleTagRemove(tag)}
                                                    className="hover:text-blue-900 dark:hover:text-blue-100"
                                                >
                                                    <X size={10} className="sm:w-3 sm:h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tombol Submit */}
                        <motion.div layout>
                            <button
                                onClick={handleSubmit}
                                disabled={uploadStatus === 'uploading' || !preview}
                                className={`
                                    w-full flex items-center justify-center gap-2 sm:gap-3
                                    py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base
                                    transition-all duration-300
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    ${uploadStatus === 'success'
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : uploadStatus === 'error'
                                            ? 'bg-red-600 hover:bg-red-700'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                    }
                                    text-white
                                `}
                            >
                                {uploadStatus === 'uploading' ? (
                                    <>
                                        <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
                                        <span>Mengupload...</span>
                                    </>
                                ) : uploadStatus === 'success' ? (
                                    <>
                                        <Check size={18} className="sm:w-5 sm:h-5" />
                                        <span>Berhasil Diupload!</span>
                                    </>
                                ) : uploadStatus === 'error' ? (
                                    <>
                                        <AlertCircle size={18} className="sm:w-5 sm:h-5" />
                                        <span>Gagal, Coba Lagi</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload size={18} className="sm:w-5 sm:h-5" />
                                        <span>Simpan ke Gallery</span>
                                    </>
                                )}
                            </button>

                            <AnimatePresence>
                                {uploadStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-2 sm:mt-3 p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg text-xs sm:text-sm"
                                    >
                                        ✅ Momen berhasil disimpan ke gallery
                                    </motion.div>
                                )}
                                {uploadStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-2 sm:mt-3 p-2 sm:p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-xs sm:text-sm"
                                    >
                                        ❌ Terjadi kesalahan, silakan coba lagi
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GalleryUpload;