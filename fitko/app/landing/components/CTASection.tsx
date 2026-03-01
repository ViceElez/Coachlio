import { ArrowRight } from "lucide-react";

interface CTASectionProps {
    title: string;
    subtitle: string;
    primaryLabel: string;
    onPrimaryClick: () => void;
    note?: string;
}

export const CTASection = ({
    title,
    subtitle,
    primaryLabel,
    onPrimaryClick,
    note,
}: CTASectionProps) => {
    return (
        <section className="py-12 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 md:p-12 bg-gradient-to-r from-primary to-emerald-600 text-white text-center">
                    <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">{title}</h2>
                    <p className="text-sm md:text-lg text-emerald-50 mb-6 md:mb-8 max-w-2xl mx-auto">{subtitle}</p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                        <button
                            onClick={onPrimaryClick}
                            className="inline-flex items-center justify-center rounded-md text-sm md:text-base font-medium transition-colors bg-white text-primary hover:bg-white/90 h-11 md:h-12 px-6 w-full sm:w-auto cursor-pointer"
                        >
                            {primaryLabel}
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                        </button>

                    </div>
                    {note && (
                        <p className="text-xs md:text-sm text-emerald-50 mt-4 md:mt-6">{note}</p>
                    )}
                </div>
            </div>
        </section>
    );
};

