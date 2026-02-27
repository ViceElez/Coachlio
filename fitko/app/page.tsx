"use client";

import {
    Dumbbell,
    Users,
    Calendar,
    MessageSquare,
    TrendingUp,
    Sparkles,
    BarChart3,
    Clock,
    Target,
    CheckCircle2,
    ArrowRight,
    Star,
    Zap,
    Shield,
    Smartphone
} from "lucide-react";
import { motion } from "motion/react";

interface LandingPageProps {
    onGetStarted: () => void;
}

const features = [
    {
        icon: Calendar,
        title: "Smart Scheduling",
        description: "Effortlessly manage sessions with intelligent booking and calendar sync"
    },
    {
        icon: MessageSquare,
        title: "Real-Time Messaging",
        description: "Stay connected with WhatsApp-style communication for trainers and clients"
    },
    {
        icon: Sparkles,
        title: "AI-Powered Insights",
        description: "Get intelligent recommendations for client retention and workout plans"
    },
    {
        icon: TrendingUp,
        title: "Progress Tracking",
        description: "Monitor fitness goals with detailed analytics and visual progress reports"
    },
    {
        icon: BarChart3,
        title: "Business Analytics",
        description: "Track revenue, retention rates, and grow your fitness business"
    },
    {
        icon: Users,
        title: "Client Management",
        description: "Manage all your clients in one place with comprehensive profiles"
    }
];

const benefits = {
    trainers: [
        "Automate client scheduling and reduce no-shows",
        "AI-powered retention analysis to keep clients engaged",
        "Generate workout plans and reports instantly",
        "Track revenue and business growth metrics",
        "Professional client communication tools"
    ],
    clients: [
        "Book sessions with your favorite trainers anytime",
        "Track your fitness progress with detailed charts",
        "Stay motivated with achievement milestones",
        "Communicate easily with your coach",
        "Access your workout history and plans"
    ]
};

const stats = [
    { label: "Active Trainers", value: "10K+" },
    { label: "Happy Clients", value: "50K+" },
    { label: "Sessions Booked", value: "1M+" },
    { label: "Success Rate", value: "94%" }
];

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Personal Trainer",
        avatar: "SJ",
        content: "FitCoach transformed my business. The AI insights help me retain clients and the scheduling system saves me hours every week.",
        rating: 5
    },
    {
        name: "Mike Chen",
        role: "Fitness Enthusiast",
        avatar: "MC",
        content: "Best fitness app I've used! Tracking my progress is so easy and motivating. My trainer and I stay connected through the messaging feature.",
        rating: 5
    },
    {
        name: "Emma Davis",
        role: "Yoga Instructor",
        avatar: "ED",
        content: "The analytics dashboard gives me real insights into my business. I can see what's working and focus on growing my client base.",
        rating: 5
    }
];

export default function LandingPage({ onGetStarted }: LandingPageProps) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 md:h-16">
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center">
                                <Dumbbell className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <span className="text-lg md:text-xl font-semibold">Fittonia</span>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3">
                            <button className="hidden sm:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                                Features
                            </button>
                            <button className="hidden sm:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                                Pricing
                            </button>
                            <button
                                onClick={onGetStarted}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-9 md:h-10 px-4 py-2"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-12 md:pt-20 pb-12 md:pb-20 px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-4 md:mb-6 bg-secondary text-secondary-foreground">
                            <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                            AI-Powered Fitness Platform
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                            Transform Your Fitness
                            <span className="text-primary"> Journey</span>
                        </h1>
                        <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
                            The all-in-one platform connecting trainers and clients through smart scheduling,
                            real-time communication, and AI-powered insights.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
                            <button
                                onClick={onGetStarted}
                                className="inline-flex items-center justify-center rounded-md text-sm md:text-base font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-11 md:h-12 px-6 w-full sm:w-auto"
                            >
                                Start Free Trial
                                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                            </button>
                            <button className="inline-flex items-center justify-center rounded-md text-sm md:text-base font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 md:h-12 px-6 w-full sm:w-auto">
                                Watch Demo
                            </button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-8 md:mt-12 flex flex-col items-center gap-3 md:gap-4">
                            <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-muted-foreground">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/10 border-2 border-white flex items-center justify-center">
                                            <Users className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                                        </div>
                                    ))}
                                </div>
                                <span className="ml-2">Trusted by 10,000+ trainers worldwide</span>
                            </div>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                                <span className="text-xs md:text-sm text-muted-foreground ml-2">4.9/5 from 2,500+ reviews</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8 bg-white border-y">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-2xl md:text-4xl font-bold text-primary mb-1 md:mb-2">{stat.value}</div>
                                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 md:mb-16">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-3 md:mb-4 bg-secondary text-secondary-foreground">
                            Features
                        </div>
                        <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
                            Everything You Need to Succeed
                        </h2>
                        <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
                            Powerful tools designed for both trainers and clients to achieve their fitness goals
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-5 md:p-6 h-full hover:shadow-lg transition-shadow">
                                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 md:mb-4">
                                        <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                    </div>
                                    <h3 className="text-base md:text-lg font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section - Two Columns */}
            <section className="py-12 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
                            Built for Trainers & Clients
                        </h2>
                        <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
                            A platform that works for everyone in the fitness ecosystem
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                        {/* For Trainers */}
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4 md:mb-6">
                                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center">
                                    <Dumbbell className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold">For Trainers</h3>
                            </div>
                            <ul className="space-y-3 md:space-y-4">
                                {benefits.trainers.map((benefit) => (
                                    <li key={benefit} className="flex items-start gap-2 md:gap-3">
                                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-sm md:text-base text-muted-foreground">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={onGetStarted}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 md:h-11 px-6 w-full mt-6"
                            >
                                Start as Trainer
                            </button>
                        </div>

                        {/* For Clients */}
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4 md:mb-6">
                                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center">
                                    <Target className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold">For Clients</h3>
                            </div>
                            <ul className="space-y-3 md:space-y-4">
                                {benefits.clients.map((benefit) => (
                                    <li key={benefit} className="flex items-start gap-2 md:gap-3">
                                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-sm md:text-base text-muted-foreground">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={onGetStarted}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 md:h-11 px-6 w-full mt-6"
                            >
                                Start as Client
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-12 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
                            Why Choose FitCoach?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        <div className="text-center">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3 md:mb-4">
                                <Zap className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold mb-2">Lightning Fast</h3>
                            <p className="text-sm md:text-base text-muted-foreground">
                                Optimized performance for seamless booking and real-time updates
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3 md:mb-4">
                                <Shield className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold mb-2">Secure & Private</h3>
                            <p className="text-sm md:text-base text-muted-foreground">
                                Bank-level security to protect your data and client information
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3 md:mb-4">
                                <Smartphone className="w-7 h-7 md:w-8 md:h-8 text-purple-600" />
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold mb-2">Mobile First</h3>
                            <p className="text-sm md:text-base text-muted-foreground">
                                Beautiful experience on any device, optimized for mobile use
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-12 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 md:mb-16">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-3 md:mb-4 bg-secondary text-secondary-foreground">
                            Testimonials
                        </div>
                        <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
                            Loved by Trainers & Clients
                        </h2>
                        <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
                            See what our community has to say about FitCoach
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-5 md:p-6 h-full">
                                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs md:text-sm font-medium text-primary">{testimonial.avatar}</span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-sm md:text-base truncate">{testimonial.name}</p>
                                            <p className="text-xs md:text-sm text-muted-foreground truncate">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5 mb-3">
                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-xs md:text-sm text-muted-foreground">{testimonial.content}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 md:p-12 bg-gradient-to-r from-primary to-emerald-600 text-white text-center">
                        <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
                            Ready to Transform Your Fitness Journey?
                        </h2>
                        <p className="text-sm md:text-lg text-emerald-50 mb-6 md:mb-8 max-w-2xl mx-auto">
                            Join thousands of trainers and clients achieving their goals with FitCoach
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                            <button
                                onClick={onGetStarted}
                                className="inline-flex items-center justify-center rounded-md text-sm md:text-base font-medium transition-colors bg-white text-primary hover:bg-white/90 h-11 md:h-12 px-6 w-full sm:w-auto"
                            >
                                Get Started Free
                                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                            </button>
                            <button className="inline-flex items-center justify-center rounded-md text-sm md:text-base font-medium transition-colors bg-white/10 border border-white/20 text-white hover:bg-white/20 h-11 md:h-12 px-6 w-full sm:w-auto">
                                Schedule Demo
                            </button>
                        </div>
                        <p className="text-xs md:text-sm text-emerald-50 mt-4 md:mt-6">
                            No credit card required • 14-day free trial • Cancel anytime
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-3 md:mb-4">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                    <Dumbbell className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-base md:text-lg font-semibold text-white">FitCoach</span>
                            </div>
                            <p className="text-xs md:text-sm mb-3 md:mb-4">
                                Empowering fitness professionals and enthusiasts worldwide
                            </p>
                        </div>

                        <div>
                            <h4 className="text-sm md:text-base font-semibold text-white mb-2 md:mb-3">Product</h4>
                            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm md:text-base font-semibold text-white mb-2 md:mb-3">Company</h4>
                            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm md:text-base font-semibold text-white mb-2 md:mb-3">Support</h4>
                            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
                        <p className="text-xs md:text-sm text-center md:text-left">
                            © 2026 FitCoach. All rights reserved.
                        </p>
                        <div className="flex gap-4 md:gap-6 text-xs md:text-sm">
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}