import { Star } from "lucide-react";
import { motion } from "motion/react";

interface TestimonialCardProps {
    name: string;
    role: string;
    avatar: string;
    content: string;
    rating: number;
    index: number;
}

export const TestimonialCard = ({ name, role, avatar, content, rating, index }: TestimonialCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-5 md:p-6 h-full">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs md:text-sm font-medium text-primary">{avatar}</span>
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold text-sm md:text-base truncate">{name}</p>
                        <p className="text-xs md:text-sm text-muted-foreground truncate">{role}</p>
                    </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">{content}</p>
            </div>
        </motion.div>
    );
};

