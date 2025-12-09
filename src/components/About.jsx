import React from 'react';
import { Briefcase, GraduationCap, Check } from 'lucide-react';

const About = () => {
    const skills = [
        "UI/UX Design",
        "Web Development",
        "Brand Identity",
        "Frontend",
        "Product Design",
        "Design Systems"
    ];

    return (
        <section id="about" className="section bg-gray-50 dark:bg-dark-secondary">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left Column */}
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
                            About Us
                        </h2>

                        <div className="space-y-4 mb-8">
                            <p className="text-gray-600 dark:text-dark-text-secondary">
                                We didn’t all start from the same place. Some of us arrived with big
                                dreams, some with uncertainty, and some without a clear path at all.
                                Yet our different journeys converged in one classroom—where strangers
                                slowly became a family, bound by curiosity and the desire to create.
                            </p>

                            <p className="text-gray-600 dark:text-dark-text-secondary">
                                Here we learned more than syntax and frameworks. We learned how to
                                fail and try again, how to lend a hand when someone is stuck, and how
                                collaboration turns small ideas into something meaningful. Late-night
                                debugging sessions, nervous presentations, and shared victories taught
                                us resilience—and how to grow together.
                            </p>

                            <p className="text-gray-600 dark:text-dark-text-secondary">
                                This classroom became our safe space: a place where ideas were born,
                                mistakes were accepted, and confidence was built step by step. We leave
                                not just with skills, but with memories, friendships, and the courage
                                to keep building—one line of code at a time.
                            </p>
                        </div>

                        {/* Skills */}
                        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                            <h3 className="text-xl font-bold mb-6">Skills & Expertise</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {skills.map((skill, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-200">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Experience Card */}
                        <div className="card p-6">
                            <div className="flex items-start space-x-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Experience</h3>
                                    <p className="text-gray-600 dark:text-dark-text-secondary text-sm">
                                        3 years learning, building, and growing together
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-4">
                                    <h4 className="font-bold">Software Engineering Class Journey</h4>
                                    <p className="text-gray-600 dark:text-dark-text-secondary text-sm">
                                        SMKN 6 Pekanbaru • 2022 – 2025
                                    </p>
                                    <ul className="text-gray-600 dark:text-dark-text-secondary text-sm mt-2 space-y-1 list-disc ml-4">
                                        <li>
                                            Began together as hopeful beginners—uncertain, curious, and eager
                                            to learn.
                                        </li>
                                        <li>
                                            Built collaborative projects that tested our creativity, patience,
                                            and teamwork.
                                        </li>
                                        <li>
                                            Faced long nights, broken code, and tight deadlines—and learned how
                                            to support one another through every challenge.
                                        </li>
                                        <li>
                                            Grew from students into a team capable of turning ideas into
                                            meaningful digital experiences.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Education Card */}
                        <div className="card p-6">
                            <div className="flex items-start space-x-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                    <GraduationCap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Education</h3>
                                    <p className="text-gray-600 dark:text-dark-text-secondary text-sm">
                                        Formal education & our shared journey
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-4">
                                    <h4 className="font-bold">SMKN 6 Pekanbaru – Software Engineering</h4>
                                    <p className="text-gray-600 dark:text-dark-text-secondary text-sm">
                                        2022 – 2025
                                    </p>

                                    <ul className="text-gray-600 dark:text-dark-text-secondary text-sm mt-2 space-y-1 list-disc ml-4">
                                        <li>
                                            Joined SMKN 6 Pekanbaru in 2022 and embarked on a three-year journey
                                            of learning and discovery.
                                        </li>
                                        <li>
                                            Homeroom teacher through every semester: <strong>Mrs. Rofiqoh, S.Pd</strong>,
                                            who guided, pushed, and believed in us even when we doubted ourselves.
                                        </li>
                                        <li>
                                            Class Leaders: Grade 10 — <strong>Rayhan Qolbi Rayandra</strong>; Grade 11 &amp;
                                            12 — <strong>Haris Adrian</strong>.
                                        </li>
                                        <li>
                                            Graduated in 2025, carrying with us not just knowledge but memories,
                                            friendships, and the courage to keep building.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
