import { Laptop, Smartphone, BarChart3, ShoppingBag } from 'lucide-react';

const Journey = () => {
    const projects = [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "A modern e-commerce platform with focus on user experience and conversion optimization.",
            tags: ["Web Design", "Development"],
            icon: <Laptop className="w-12 h-12" />,
            color: "bg-blue-100 dark:bg-blue-900/30",
        },
        {
            id: 2,
            title: "Health & Fitness App",
            description: "A mobile application designed to help users track their fitness goals and health metrics.",
            tags: ["UI/UX", "Mobile"],
            icon: <Smartphone className="w-12 h-12" />,
            color: "bg-green-100 dark:bg-green-900/30",
        },
        {
            id: 3,
            title: "Analytics Dashboard",
            description: "A comprehensive analytics dashboard for tracking business metrics and user data.",
            tags: ["Dashboard", "Data Viz"],
            icon: <BarChart3 className="w-12 h-12" />,
            color: "bg-purple-100 dark:bg-purple-900/30",
        },
        {
            id: 4,
            title: "Brand Identity System",
            description: "Complete brand identity including logo, typography, color system, and brand guidelines.",
            tags: ["Branding", "Design System"],
            icon: <ShoppingBag className="w-12 h-12" />,
            color: "bg-pink-100 dark:bg-pink-900/30",
        },
    ];

    return (
        <section id="journey" className="section bg-gray-50 dark:bg-dark-secondary">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Journey
                    </h2>
                    <p className="text-gray-600 dark:text-dark-text-secondary">
                        A selection of recent projects I've designed and developed.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="card card-hover p-6 group cursor-pointer"
                        >
                            <div className={`${project.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6`}>
                                <div className="text-gray-700 dark:text-dark-text-secondary">
                                    {project.icon}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold group-hover:text-gray-600 dark:group-hover:text-dark-text-accent transition-colors">
                                        {project.title}
                                    </h3>
                                    <span className="text-gray-400 dark:text-gray-600 group-hover:translate-x-1 transition-transform">
                                        →
                                    </span>
                                </div>

                                <p className="text-gray-600 dark:text-dark-text-secondary">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-4">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-gray-100 dark:bg-dark-accent text-gray-700 dark:text-dark-text-secondary text-sm rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Journey;