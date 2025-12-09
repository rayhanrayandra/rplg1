import { useState } from 'react';
import { Mail, Linkedin, Github, Dribbble } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setSubmitMessage("Thank you! Your message has been sent. I'll get back to you soon.");
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        setIsSubmitting(false);

        setTimeout(() => {
            setSubmitMessage('');
        }, 5000);
    };

    return (
        <section id="contact" className="section bg-gray-50 dark:bg-dark-secondary">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                            Let's Work Together
                        </h2>
                        <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
                            Have a project in mind? I'd love to hear about it.
                        </p>
                    </div>

                    {/* Contact Form */}
                    <div className="card p-8 mb-12">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition resize-none"
                                    required
                                />
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary px-8"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>

                        {submitMessage && (
                            <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg text-center">
                                {submitMessage}
                            </div>
                        )}
                    </div>

                    {/* Contact Links */}
                    <div className="text-center">
                        <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
                            <a
                                href="mailto:hello@example.com"
                                className="flex items-center space-x-2 text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                <Mail size={20} />
                                <span>hello@example.com</span>
                            </a>

                            <div className="flex items-center space-x-4">
                                <a href="#" className="text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-white transition-colors">
                                    <Linkedin size={24} />
                                </a>
                                <a href="#" className="text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-white transition-colors">
                                    <Dribbble size={24} />
                                </a>
                                <a href="#" className="text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-white transition-colors">
                                    <Github size={24} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;