import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Moon, Sun, Image,
    Upload, ChevronDown, Menu, X
} from 'lucide-react';
import { useTheme } from "../../contexts/ThemeContext";

const navItems = [
    { label: "Gallery", icon: Image, href: "#gallery" },
    { label: "Upload", icon: Upload, href: "#upload" },  
];

const Navigation = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [active, setActive] = useState("Home");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    /* ================= Scroll Spy ================= */
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        const sections = navItems
            .map(item => document.querySelector(item.href))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        const match = navItems.find(
                            item => item.href === `#${id}`
                        );
                        if (match) setActive(match.label);
                    }
                });
            },
            { threshold: 0.6 }
        );

        sections.forEach(section => observer.observe(section));
        window.addEventListener('scroll', handleScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavClick = (label, href) => {
        setActive(label);
        setMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* ================= MOBILE TOP BAR ================= */}
            <header className={`
        fixed top-0 left-0 right-0 z-50 md:hidden
        backdrop-blur-md transition-all duration-300
        ${scrolled
                    ? 'bg-white/90 dark:bg-dark-primary/90 border-b border-gray-200 dark:border-gray-800'
                    : 'bg-white/80 dark:bg-dark-primary/80'
                }
      `}>
                <div className="flex items-center justify-between px-4 h-16">
                    <div className="flex items-center gap-2">
                        <img
                            src="/assets/logorplg.jpg"
                            alt="Logo"
                            className="h-7 w-7 rounded-full"
                        />
                        <span className="font-bold text-gray-900 dark:text-white">
                            | RPLG1
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="
                p-2 rounded-full
                bg-gray-100 dark:bg-dark-card
                text-gray-600 dark:text-dark-text-secondary
                hover:bg-gray-200 dark:hover:bg-gray-800
                transition
              "
                        >
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="
                p-2 rounded-full
                bg-gray-100 dark:bg-dark-card
                text-gray-600 dark:text-dark-text-secondary
                hover:bg-gray-200 dark:hover:bg-gray-800
                transition
              "
                        >
                            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="border-t border-gray-200 dark:border-gray-800"
                    >
                        <div className="px-4 py-3 space-y-1">
                            {navItems.map(({ label, icon: Icon, href }) => (
                                <button
                                    key={label}
                                    onClick={() => handleNavClick(label, href)}
                                    className={`
                    w-full flex items-center gap-3 px-3 py-3 rounded-lg
                    transition
                    ${active === label
                                            ? "bg-gray-100 dark:bg-dark-card text-gray-900 dark:text-white"
                                            : "text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-card"
                                        }
                  `}
                                >
                                    <Icon size={18} />
                                    <span className="text-sm font-medium">
                                        {label}
                                    </span>
                                    {active === label && (
                                        <ChevronDown size={16} className="ml-auto transform rotate-90" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </header>

            {/* ================= MOBILE BOTTOM NAV ================= */}
            <nav className="
        fixed bottom-0 left-0 right-0 z-50 md:hidden
        bg-white/70 dark:bg-dark-primary/70
        backdrop-blur-xl
        border-t border-gray-200/50 dark:border-gray-800/50
      ">
                <div className="flex justify-around items-center h-16 px-2">
                    {navItems.map(({ label, icon: Icon, href }) => {
                        const isActive = active === label;

                        return (
                            <button
                                key={label}
                                onClick={() => handleNavClick(label, href)}
                                className={`
                  relative flex flex-col items-center justify-center
                  px-4 py-2 rounded-full
                  transition-all duration-300
                  ${isActive
                                        ? `
                        bg-white/40 dark:bg-white/10
                        backdrop-blur-lg
                        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                        text-gray-900 dark:text-white
                      `
                                        : `
                        text-gray-600 dark:text-dark-text-secondary
                        hover:text-gray-900 dark:hover:text-white
                      `
                                    }
                `}
                            >
                                <Icon size={18} />
                                <span className="text-[10px] font-medium mt-0.5">
                                    {label}
                                </span>

                                {isActive && (
                                    <span className="
                    absolute inset-0 -z-10
                    rounded-full
                    bg-white/30 dark:bg-white/10
                    blur-xl
                  " />
                                )}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* ================= DESKTOP SIDEBAR ================= */}
            <aside className="
        hidden md:flex fixed top-0 left-0 z-50
        h-full w-64 flex-col
        bg-white dark:bg-dark-primary
        border-r border-gray-200 dark:border-gray-800
      ">
                {/* Header */}
                <div className="flex items-center gap-2 h-16 px-4 border-b border-gray-200 dark:border-gray-800">
                    <img
                        src="/assets/logorplg.jpg"
                        alt="Logo"
                        className="h-7 w-7 rounded-full"
                    />
                    <span className="font-bold text-gray-900 dark:text-white">
                        RPLG1
                    </span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navItems.map(({ label, icon: Icon, href }) => (
                        <button
                            key={label}
                            onClick={() => handleNavClick(label, href)}
                            className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-lg
                transition
                ${active === label
                                    ? "bg-gray-100 dark:bg-dark-card text-gray-900 dark:text-white"
                                    : "text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-card"
                                }
              `}
                        >
                            <Icon size={18} />
                            <span className="text-sm font-medium">
                                {label}
                            </span>
                            {active === label && (
                                <ChevronDown size={16} className="ml-auto transform rotate-90" />
                            )}
                        </button>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <button
                        onClick={toggleTheme}
                        className="
              w-full flex items-center justify-center gap-2
              py-2 rounded-lg
              bg-gray-100 dark:bg-dark-card
              text-gray-700 dark:text-dark-text-secondary
              hover:bg-gray-200 dark:hover:bg-gray-800
              transition
            "
                    >
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        <span className="text-sm">
                            {isDarkMode ? "Light Mode" : "Dark Mode"}
                        </span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Navigation;