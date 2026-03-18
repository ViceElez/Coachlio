"use client";

import {
    Dumbbell,
    Users,
    Calendar,
    MessageSquare,
    TrendingUp,
    Sparkles,
    BarChart3,
    Target,
    ArrowRight,
    Star,
    Zap,
    Shield,
    Smartphone
} from "lucide-react";
import { motion } from "framer-motion";
import { HeaderButtons } from "./landing/components/header";
import { routes } from "@/constants/routes";
import { useRouter } from "next/navigation";
import {FeatureTabs} from "@/app/landing/components/featureTabs";
import {BenefitsTabs} from "@/app/landing/components/benefitsTabs";
import {WhyChooseUsTabs} from "@/app/landing/components/whyChooseUsTabs";
import {TestimonialCard} from "@/app/landing/components/TestimonialCard";
import {CTASection} from "@/app/landing/components/CTASection";
import {FooterSection} from "@/app/landing/components/FooterSection";


const features = [
    {
        icon: Calendar,
        title: "Smart Scheduling",
        description: "Effortlessly manage sessions with intelligent booking and calendar sync"
    },
    {
        icon: MessageSquare,
        title: "Real-Time Messaging (Coming Soon)",
        description: "Stay connected with WhatsApp-style communication for trainers and clients"
    },
    {
        icon: Sparkles,
        title: "AI-Powered Insights (Coming Soon)",
        description: "Get intelligent recommendations for client retention and workout plans"
    },
    {
        icon: TrendingUp,
        title: "Progress Tracking (Coming Soon)",
        description: "Monitor fitness goals with detailed analytics and visual progress reports"
    },
    {
        icon: BarChart3,
        title: "Business Analytics (Coming Soon)",
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

const footerColumns = [
    {
        heading: "Product",
        links: [
            { label: "Features", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Demo", href: "#" },
        ],
    },
    {
        heading: "Company",
        links: [
            { label: "About", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
        ],
    },
    {
        heading: "Support",
        links: [
            { label: "Help Center", href: routes.HELP },
            { label: "Contact", href: routes.CONTACT },
            { label: "Privacy", href: routes.PRIVACY_POLICY },
        ],
    },
];

const footerLegalLinks = [
    { label: "Terms", href: routes.TERMS_OF_SERVICE },
    { label: "Privacy", href: routes.PRIVACY_POLICY },
    { label: "Cookies", href: "#" },
];

export default function LandingPage() {
    const router = useRouter();
    const handleGetStarted = () =>router.push(routes.LOGIN)
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 md:h-16">
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center">
                                <Dumbbell className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <span className="text-lg md:text-xl font-semibold">Coachlio</span>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3">
                            <HeaderButtons text="Features"/>
                            <HeaderButtons text="Pricing"/>
                            <HeaderButtons text="Get Started" onClick={handleGetStarted} />
                        </div>
                    </div>
                </div>
            </header>

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
                                onClick={handleGetStarted}
                                className="inline-flex items-center justify-center rounded-md text-sm md:text-base font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-11 md:h-12 px-6 w-full sm:w-auto"
                            >
                                Start Free Trial
                                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                            </button>
                        </div>

                        <div className="mt-8 md:mt-12 flex flex-col items-center gap-3 md:gap-4">
                            <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-muted-foreground">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/10 border-2 border-white flex items-center justify-center">
                                            <Users className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                                        </div>
                                    ))}
                                </div>
                                <span className="ml-2">Trusted by trainers and clients worldwide</span>
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
                            <FeatureTabs key={feature.title} icon={feature.icon} title={feature.title} description={feature.description} index={index} />
                        ))}
                    </div>
                </div>
            </section>

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
                        <BenefitsTabs text="For Trainers" onClick={handleGetStarted} array={benefits.trainers} icon={Dumbbell} />
                        <BenefitsTabs text="For Clients" onClick={handleGetStarted} array={benefits.clients} icon={Target} />
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
                            Why Choose Coachlio?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        <WhyChooseUsTabs title="Lightning Fast" description="Optimized performance for seamless booking and real-time updates" icon={<Zap className="w-7 h-7 md:w-8 md:h-8 text-primary" />}/>
                        <WhyChooseUsTabs title="Secure & Private" description="Bank-level security to protect your data and client information" icon={<Shield className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />}/>
                        <WhyChooseUsTabs title="Mobile First" description="                                Beautiful experience on any device, optimized for mobile use" icon={<Smartphone className="w-7 h-7 md:w-8 md:h-8 text-purple-600" />}/>
                    </div>
                </div>
            </section>

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
                            <TestimonialCard key={testimonial.name} {...testimonial} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            <CTASection
                title="Ready to Transform Your Fitness Journey?"
                subtitle="Join thousands of trainers and clients achieving their goals with FitCoach"
                primaryLabel="Get Started Free"
                onPrimaryClick={handleGetStarted}
                note="No credit card required • 14-day free trial • Cancel anytime"
            />
            <FooterSection
                brandName="FitCoach"
                brandTagline="Empowering fitness professionals and enthusiasts worldwide"
                columns={footerColumns}
                copyright="© 2026 FitCoach. All rights reserved."
                legalLinks={footerLegalLinks}
            />
        </div>
    );
}