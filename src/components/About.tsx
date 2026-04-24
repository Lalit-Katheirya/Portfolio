import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Palette, Smartphone, Globe } from 'lucide-react';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: 'easeOut',
            },
        },
    };

    const services = [
        {
            icon: Code,
            title: 'Web Development',
            description: 'Building responsive and interactive websites using modern frameworks and technologies.',
        },
        {
            icon: Palette,
            title: 'UI/UX Design',
            description: 'Creating intuitive and beautiful user interfaces that provide exceptional user experiences.',
        },
        {
            icon: Smartphone,
            title: 'Mobile Apps',
            description: 'Developing cross-platform mobile applications with native performance and feel.',
        },
        {
            icon: Globe,
            title: 'Full Stack',
            description: 'End-to-end development from database design to frontend implementation.',
        },
    ];

    return (
        <section id="about" className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="max-w-6xl mx-auto"
                >
                    {/* Section Header */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            About <span className="gradient-text">Me</span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            I'm a passionate developer with a love for creating digital experiences that make a difference.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Story */}
                        <motion.div variants={itemVariants} className="space-y-6">
                            <div className="prose prose-lg max-w-none">
                                <p className="text-foreground/80 leading-relaxed mb-4">
                                    With over 5 years of experience in web development, I specialize in creating
                                    modern, scalable applications that solve real-world problems. My journey began
                                    with a curiosity about how websites work, and it has evolved into a passion
                                    for crafting exceptional digital experiences.
                                </p>
                                <p className="text-foreground/80 leading-relaxed mb-4">
                                    I believe in the power of clean code, user-centered design, and continuous learning.
                                    When I'm not coding, you'll find me exploring new technologies, contributing to
                                    open-source projects, or sharing knowledge with the developer community.
                                </p>
                                <p className="text-foreground/80 leading-relaxed">
                                    My goal is to bridge the gap between design and development, creating solutions
                                    that are not only functional but also beautiful and intuitive.
                                </p>
                            </div>

                            {/* Stats */}
                            <motion.div
                                variants={itemVariants}
                                className="grid grid-cols-2 gap-6 pt-6"
                            >
                                {[
                                    { number: '50+', label: 'Projects Completed' },
                                    { number: '3+', label: 'Years Experience' },
                                    { number: '100%', label: 'Client Satisfaction' },
                                    { number: '24/7', label: 'Support Available' },
                                ].map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        className="text-center p-4 bg-card rounded-lg border"
                                    >
                                        <div className="text-2xl font-bold text-primary mb-1">
                                            {stat.number}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right Column - Services */}
                        <motion.div variants={itemVariants} className="space-y-6">
                            <h3 className="text-2xl font-bold mb-8">What I Do</h3>
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02, x: 10 }}
                                    className="p-6 bg-card rounded-lg border hover:border-primary/50 transition-all duration-300 group"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                            <service.icon size={24} className="text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
                                            <p className="text-muted-foreground">{service.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
