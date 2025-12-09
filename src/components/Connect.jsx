import { useState } from 'react';
import {
    Instagram, Twitter, Facebook, Youtube,
    Linkedin, Github, Dribbble, MessageCircle,
    Mail, MapPin, Phone, Globe, Send,
    ExternalLink, Heart, Users, Share2
} from 'lucide-react';

const Connect = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [subscriptionMessage, setSubscriptionMessage] = useState('');

    const socialMedia = [
        {
            id: 'instagram',
            name: 'Instagram',
            icon: Instagram,
            username: '@smkn6pekanbaru_rpl',
            followers: '1.2K',
            posts: '156',
            description: 'Daily updates & behind the scenes',
            color: 'bg-gradient-to-br from-purple-500 to-pink-500',
            link: 'https://instagram.com/smkn6pekanbaru_rpl',
            primary: true
        },
        {
            id: 'youtube',
            name: 'YouTube',
            icon: Youtube,
            username: 'SMKN 6 Pekanbaru RPL',
            followers: '850',
            posts: '48',
            description: 'Tutorials & project showcases',
            color: 'bg-gradient-to-br from-red-500 to-red-700',
            link: 'https://youtube.com/smkn6pekanbaru_rpl',
            primary: true
        },
        {
            id: 'github',
            name: 'GitHub',
            icon: Github,
            username: 'rpl-smkn6',
            followers: '320',
            posts: '89',
            description: 'Open source projects & codes',
            color: 'bg-gradient-to-br from-gray-800 to-gray-900',
            link: 'https://github.com/rpl-smkn6'
        },
        {
            id: 'linkedin',
            name: 'LinkedIn',
            icon: Linkedin,
            username: 'SMKN 6 Pekanbaru RPL',
            followers: '450',
            posts: '32',
            description: 'Professional network & alumni',
            color: 'bg-gradient-to-br from-blue-600 to-blue-800',
            link: 'https://linkedin.com/company/smkn6pekanbaru-rpl'
        },
        {
            id: 'twitter',
            name: 'Twitter/X',
            icon: Twitter,
            username: '@smkn6_rpl',
            followers: '680',
            posts: '210',
            description: 'Quick updates & announcements',
            color: 'bg-gradient-to-br from-black to-gray-800',
            link: 'https://twitter.com/smkn6_rpl'
        },
        {
            id: 'tiktok',
            name: 'TikTok',
            icon: MessageCircle,
            username: '@rpl.smkn6',
            followers: '2.1K',
            posts: '94',
            description: 'Short videos & challenges',
            color: 'bg-gradient-to-br from-black to-pink-500',
            link: 'https://tiktok.com/@rpl.smkn6'
        }
    ];

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            value: 'rpl@smkn6pekanbaru.sch.id',
            subtitle: 'Respon dalam 24 jam'
        },
        {
            icon: Phone,
            title: 'Telepon',
            value: '(0761) 12345',
            subtitle: 'Senin - Jumat, 08:00 - 16:00'
        },
        {
            icon: MapPin,
            title: 'Alamat',
            value: 'Jl. Pendidikan No. 123, Pekanbaru',
            subtitle: 'Riau, Indonesia 28131'
        },
        {
            icon: Globe,
            title: 'Website',
            value: 'smkn6pekanbaru.sch.id',
            subtitle: 'Official school website'
        }
    ];

    const quickLinks = [
        { label: 'Tentang Kelas', url: '#about' },
        { label: 'Project Gallery', url: '#gallery' },
        { label: 'Struktur Kelas', url: '#hierarchy' },
        { label: 'Kirim Pesan', url: '#ngl' },
        { label: 'Journey', url: '#journey' },
        { label: 'Alumni Network', url: '#' }
    ];

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsSubscribing(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        setSubscriptionMessage('🎉 Terima kasih! Kamu berlangganan newsletter kita.');
        setEmail('');
        setIsSubscribing(false);

        setTimeout(() => setSubscriptionMessage(''), 4000);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'SMKN 6 Pekanbaru - RPL',
                text: 'Lihat website kelas Rekayasa Perangkat Lunak SMKN 6 Pekanbaru!',
                url: window.location.href
            });
        }
    };

    return (
        <section id="connect" className="section bg-white dark:bg-dark-secondary">
            <div className="container">
                {/* Header */}
                <div className="text-center mb-12 lg:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                        Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Connect</span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto">
                        Tetap terhubung dengan kami melalui berbagai platform. Ikuti perkembangan, project, dan cerita kita.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Social Media Cards */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-500" />
                                Follow Us
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {socialMedia.map((platform) => {
                                    const Icon = platform.icon;
                                    return (
                                        <a
                                            key={platform.id}
                                            href={platform.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group"
                                            onMouseEnter={() => setHoveredCard(platform.id)}
                                            onMouseLeave={() => setHoveredCard(null)}
                                        >
                                            <div className={`card p-4 hover:shadow-xl transition-all duration-300 
                        ${hoveredCard === platform.id ? 'scale-[1.02]' : ''}`}>
                                                <div className="flex items-start gap-4">
                                                    <div className={`${platform.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                                                        <Icon className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h4 className="font-bold truncate">{platform.name}</h4>
                                                            {platform.primary && (
                                                                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                                                                    Primary
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-600 dark:text-dark-text-secondary truncate">
                                                            {platform.username}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                                                            {platform.description}
                                                        </p>
                                                        <div className="flex items-center gap-4 mt-3 text-xs">
                                                            <span className="text-gray-600 dark:text-gray-400">
                                                                {platform.followers} followers
                                                            </span>
                                                            <span className="text-gray-600 dark:text-gray-400">
                                                                {platform.posts} posts
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <ExternalLink className={`w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors 
                            ${hoveredCard === platform.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                                                </div>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                                <Mail className="w-5 h-5 text-green-500" />
                                Contact Info
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {contactInfo.map((info, index) => {
                                    const Icon = info.icon;
                                    return (
                                        <div key={index} className="card p-4">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                                    <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-sm mb-1">{info.title}</h4>
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                                                        {info.value}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">{info.subtitle}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Newsletter Subscription */}
                        <div className="card p-6">
                            <div className="mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
                                    <Send className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">Newsletter</h3>
                                <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                                    Dapatkan update project, event, dan cerita kelas langsung di email kamu.
                                </p>
                            </div>

                            <form onSubmit={handleSubscribe} className="space-y-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email kamu"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                    bg-transparent focus:ring-2 focus:ring-orange-500 text-sm"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={isSubscribing}
                                    className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 
                    text-white rounded-lg font-medium hover:opacity-90 transition-opacity 
                    disabled:opacity-50"
                                >
                                    {isSubscribing ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Subscribing...
                                        </span>
                                    ) : 'Subscribe Now'}
                                </button>
                            </form>

                            {subscriptionMessage && (
                                <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 
                  dark:text-green-300 rounded-lg text-sm text-center">
                                    {subscriptionMessage}
                                </div>
                            )}
                        </div>

                        {/* Quick Links */}
                        <div className="card p-6">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Dribbble className="w-5 h-5 text-purple-500" />
                                Quick Links
                            </h3>
                            <div className="space-y-2">
                                {quickLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.url}
                                        className="flex items-center justify-between p-3 rounded-lg 
                      hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                                    >
                                        <span className="text-sm">{link.label}</span>
                                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-500" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Share Section */}
                        <div className="card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold mb-1">Bagikan Website</h3>
                                    <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                                        Bagikan ke teman-temanmu
                                    </p>
                                </div>
                                <Share2 className="w-5 h-5 text-blue-500" />
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleShare}
                                    className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg font-medium 
                    hover:bg-blue-600 transition-colors text-sm flex items-center justify-center gap-2"
                                >
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                                <button className="px-4 py-3 border border-gray-300 dark:border-gray-700 
                  rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            © 2025 SMKN 6 Pekanbaru - Rekayasa Perangkat Lunak
                        </div>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500">
                                Terms of Service
                            </a>
                            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500">
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Connect;