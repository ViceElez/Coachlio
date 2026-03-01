import { motion } from "framer-motion"


export const FeatureTabs=({icon:Icon,title,description,index}:{
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | React.ElementType
    title: string,
    description: string,
    index: number
})=>{
    return(
        <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-5 md:p-6 h-full hover:shadow-lg transition-shadow">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 md:mb-4">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">{title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
            </div>
        </motion.div>
    )
}