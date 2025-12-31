const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-white/100 border-gray-200 dark:border-gray-800 dark:bg-dark-secondary py-6 md:py-8 relative">
            <div className="container px-4 sm:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm md:text-base text-gray-600 dark:text-dark-text-secondary mb-4 md:mb-0 text-center md:text-left">
                        © {currentYear} RPLG 1. All rights reserved.
                    </p>
                    <p className="text-sm md:text-base text-gray-600 dark:text-dark-text-secondary text-center md:text-right">
                        Designed & Developed with care
                    </p>
                </div>

                {/* Optional: Add subtle mobile padding */}
                <div className="mt-4 md:mt-0 pt-4 md:pt-0 border-t border-gray-100 dark:border-gray-800 md:border-none">
                    <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
                        SMKN 6 Pekanbaru • Rekayasa Perangkat Lunak • 2022-2025
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;