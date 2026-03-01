
export const HeaderButtons = ({text,onClick}:{text:string,onClick?: () => void;}) => {
    return(
        <button
            onClick={onClick}
            className="hidden sm:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 cursor-pointer">
            {text}
        </button>
    )
}