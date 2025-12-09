const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-white/100 border-gray-200 dark:border-gray-800 dark:bg-dark-secondary py-8 relative">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-600 dark:text-dark-text-secondary mb-4 md:mb-0">
                        © {currentYear} Rekayasa Perangkat Lunak 1. All rights reserved.
                    </p>
                    <p className="text-gray-600 dark:text-dark-text-secondary">
                        Designed & Developed with care
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;