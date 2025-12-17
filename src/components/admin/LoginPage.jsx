import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Lock, Eye, EyeOff, User,
    AlertCircle, Loader2, Shield, Key
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [formErrors, setFormErrors] = useState({});

    // State untuk dark mode
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('auth_token');
        if (token) {
            navigate('/admin');
        }

        // Check system preference for dark mode
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, [navigate]);

    const toggleTheme = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);

        if (newDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.username.trim()) {
            errors.username = 'Username harus diisi';
        }

        if (!formData.password) {
            errors.password = 'Password harus diisi';
        } else if (formData.password.length < 4) {
            errors.password = 'Password minimal 4 karakter';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (loginAttempts >= 3) {
            setErrorMessage('Terlalu banyak percobaan. Tunggu 15 menit.');
            return;
        }

        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            // Simulasi API call
            await new Promise(resolve => setTimeout(resolve, 1200));

            // Valid credentials (gunakan sesuai kebutuhan)
            const validCredentials = {
                username: 'admin',
                password: 'admin123'
            };

            if (formData.username === validCredentials.username &&
                formData.password === validCredentials.password) {

                setSuccessMessage('Login berhasil! Mengalihkan...');

                // Simpan token dan info user
                const authToken = 'auth_token_' + Date.now();
                localStorage.setItem('auth_token', authToken);
                localStorage.setItem('user_role', 'admin');
                localStorage.setItem('username', formData.username);

                if (formData.rememberMe) {
                    localStorage.setItem('remember_username', formData.username);
                } else {
                    localStorage.removeItem('remember_username');
                }

                // Reset login attempts
                setLoginAttempts(0);

                // Redirect ke admin dashboard
                setTimeout(() => {
                    navigate('/admin');
                }, 1500);

            } else {
                const attempts = loginAttempts + 1;
                setLoginAttempts(attempts);

                if (attempts >= 3) {
                    setErrorMessage('Terlalu banyak percobaan gagal. Tunggu beberapa saat.');
                } else {
                    setErrorMessage('Username atau password salah.');
                }
            }

        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Terjadi kesalahan sistem. Coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            handleLogin(e);
        }
    };

    const ThemeToggle = () => (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
            ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
            )}
        </button>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
            {/* Header */}
            <header className="py-4 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src="/assets/logorplg.jpg"
                                alt="Logo RPLG1"
                                className="w-10 h-10 rounded-lg shadow-md"
                            />
                            <div>
                                <span className="font-bold text-gray-900 dark:text-white text-lg">
                                    RPLG 1
                                </span>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Admin Portal</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
                                {new Date().toLocaleDateString('id-ID', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md mx-auto"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-700 dark:to-gray-900 rounded-2xl mb-4">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Admin Panel Login
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Masuk untuk mengelola gallery dan konten RPLG1
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <form onSubmit={handleLogin} className="space-y-4">
                            {/* Username Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Username
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        onKeyPress={handleKeyPress}
                                        className={`w-full pl-10 pr-3 py-3 text-sm rounded-lg border ${formErrors.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Masukkan username"
                                        disabled={isLoading}
                                        autoComplete="username"
                                    />
                                </div>
                                {formErrors.username && (
                                    <p className="mt-1 text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {formErrors.username}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        onKeyPress={handleKeyPress}
                                        className={`w-full pl-10 pr-10 py-3 text-sm rounded-lg border ${formErrors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Masukkan password"
                                        disabled={isLoading}
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        disabled={isLoading}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {formErrors.password && (
                                    <p className="mt-1 text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {formErrors.password}
                                    </p>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.rememberMe}
                                        onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                        className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-blue-500 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                                        disabled={isLoading}
                                    />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        Ingat saya
                                    </span>
                                </label>
                            </div>

                            {/* Login Attempts Warning */}
                            {loginAttempts > 0 && loginAttempts < 3 && (
                                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 rounded-lg text-sm">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>Percobaan login: {loginAttempts}/3</span>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 bg-black dark:bg-gray-800 text-white dark:text-white rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border dark:border-gray-600"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Memproses...</span>
                                    </>
                                ) : (
                                    <>
                                        <Key className="w-4 h-4" />
                                        <span>Masuk ke Dashboard</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Demo Credentials Section */}
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                    Demo Credentials
                                </p>
                                <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <span>Username:</span>
                                        <code className="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded">admin</code>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Password:</span>
                                        <code className="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded">admin123</code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="mt-4 space-y-2">
                        {errorMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                            >
                                <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                                    <AlertCircle className="w-4 h-4" />
                                    <p className="text-sm">{errorMessage}</p>
                                </div>
                            </motion.div>
                        )}

                        {successMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                            >
                                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-sm">{successMessage}</p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            © {new Date().getFullYear()} RPLG1 Gallery Admin
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Hanya untuk keperluan administrasi internal
                        </p>
                    </div>
                </motion.div>
            </main>

            {/* Decorative Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/10 dark:bg-pink-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>
        </div>
    );
};

// Add CSS animation styles
const style = document.createElement('style');
style.textContent = `
@keyframes blob {
    0% {
        transform: translate(0px, 0px) scale(1);
    }
    33% {
        transform: translate(30px, -50px) scale(1.1);
    }
    66% {
        transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
        transform: translate(0px, 0px) scale(1);
    }
}
.animate-blob {
    animation: blob 7s infinite;
}
.animation-delay-2000 {
    animation-delay: 2s;
}
.animation-delay-4000 {
    animation-delay: 4s;
}
`;
document.head.appendChild(style);

export default LoginPage;