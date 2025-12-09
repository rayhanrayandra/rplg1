import { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();

    const navItems = [
        { label: 'About', href: '#about' },
        { label: 'Our Journey', href: '#journey' },
        { label: 'Gallery', href: '#gallery' },
        { label: 'Connect', href: '#social' },
        { label: 'NGL Box', href: '#ngl' },
    ];


    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    return (
        <nav className="fixed w-full z-50 bg-white/80 dark:bg-dark-primary/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="container">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <img
                            src="/assets/logorplg.jpg"
                            alt="RPLG1 Logo"
                            className="h-7 w-7 rounded-full object-cover"
                        />
                        <span className="text-xl font-heading font-bold text-gray-900 dark:text-white">
                            | RPLG1
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => scrollToSection(item.href.replace('#', ''))}
                                className="text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                            >
                                {item.label}
                            </button>
                        ))}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300"
                            aria-label="Toggle theme"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 dark:bg-dark-card transition-all duration-300"
                            aria-label="Toggle theme"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-gray-600 dark:text-dark-text-secondary transition-colors duration-300"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} transition-all duration-300`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-gray-800 mt-2 transition-colors duration-300">
                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => scrollToSection(item.href.replace('#', ''))}
                                className="block w-full text-left px-3 py-2 text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-card rounded-md transition-colors duration-300"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
