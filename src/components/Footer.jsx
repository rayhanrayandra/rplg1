const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-600 dark:text-dark-text-secondary mb-4 md:mb-0">
                        © {currentYear} Portfolio. All rights reserved.
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