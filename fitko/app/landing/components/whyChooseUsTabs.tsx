export const WhyChooseUsTabs=({title,description,icon}:{
    title: string,
    description: string,
    icon: React.ReactElement
})=>{
    return(
        <div className="text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3 md:mb-4">
                {icon}
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
            <p className="text-sm md:text-base text-muted-foreground">
                {description}
            </p>
        </div>
    )
}