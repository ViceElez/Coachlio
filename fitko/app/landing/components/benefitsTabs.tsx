import {CheckCircle2} from "lucide-react";


export const BenefitsTabs=({text,onClick,array, icon:Icon}:{
    text: string,
    onClick: () => void,
    array: string[],
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | React.ElementType
})=>{
    return(
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold">{text}</h3>
            </div>
            <ul className="space-y-3 md:space-y-4">
                {array.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 md:gap-3">
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base text-muted-foreground">{benefit}</span>
                    </li>
                ))}
            </ul>
            <button
                onClick={onClick}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 md:h-11 px-6 w-full mt-6"
            >
                Start Now For Free
            </button>
        </div>
    )
}