export default {
    root: {
        class: [
            "relative",
            
            // Flexbox
            "flex",
            "items-center",
            
            // Spacing
            "p-0.5",
            
            // Shape
            "rounded-md",
            
            // Color
            "bg-surface-0 dark:bg-surface-900",
            "border border-surface-200 dark:border-surface-700"
        ]
    },
    rootList: ({ props }) => ({
        class: [
            // Flexbox
            "smd:flex",
            "items-center",
            "flex-wrap",
            "flex-col smd:flex-row",
            { hidden: !(props !== null && props.mobileActive), flex: props === null ? void 0 : props.mobileActive },
            // Position
            "absolute smd:relative",
            "top-full left-0",
            "smd:top-auto smd:left-auto",
            
            // Size
            "w-full smd:w-auto rounded border border-[#dadaea] dark:border-[#474751]",
            
            // Spacing
            "m-0",
            "p-1 smd:py-0 smd:p-0",
            "list-none",
            
            // Shape
            "shadow-md smd:shadow-none",
            "border-0",
            
            // Color
            "bg-surface-0 dark:bg-surface-900 smd:bg-transparent",
            
            // Misc
            "outline-none"
        ]
    }),
    item: {
        class: "smd:relative smd:w-auto w-full static [&:first-child]:mt-0"
    },
    itemContent: ({ context }) => ({
        class: [
            // Shape
            "rounded-[4px]",
            
            // Colors
            "text-surface-700 dark:text-white/80",
            {
                "text-surface-500 dark:text-white/70": !context.focused && !context.active,
                "text-surface-500 dark:text-white/70 bg-surface-200 dark:bg-surface-700": context.focused && !context.active,
                "bg-highlight": (context.focused && context.active) || context.active || (!context.focused && context.active)
            },
            
            // States
            {
                "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]": !context.active,
                "hover:bg-highlight-hover": context.active
            },
            
            // Transitions
            "transition-all",
            "duration-200"
        ]
    }),
    itemLink: ({ context }) => ({
        class: [
            "relative",
            
            // Flexbox
            "flex",
            "items-center",
            
            // Spacing
            "p-1.5",
            
            // Size
            {
                "pl-5": context.level === 1 || context.level === 2
            },
            "leading-none",
            
            // Misc
            "select-none",
            "cursor-pointer",
            "no-underline ",
            "overflow-hidden"
        ]
    }),
    itemIcon: {
        class: "mr-2"
    },
    submenuIcon: ({ props }) => ({
        class: [
            {
                "ml-auto smd:ml-2": props.root,
                "ml-auto": !props.root
            }
        ]
    }),
    submenu: ({ props }) => ({
        class: [
            "flex flex-col",
            // Size
            "rounded-md",
            "min-w-[12.5rem]",
            
            // Spacing
            "p-1",
            "m-0",
            "list-none",
            
            // Shape
            "shadow-none smd:shadow-md",
            "border border-surface-200 dark:border-surface-700",
            
            // Position
            "static smd:absolute",
            "z-10",
            { "smd:absolute smd:left-full smd:top-0": props.level > 1 },
            
            // Color
            "bg-surface-0 dark:bg-surface-900"
        ]
    }),
    separator: {
        class: "border-t border-surface-200 dark:border-surface-600 my-[2px]"
    },
    button: {
        class: [
            "flex smd:hidden",
            "items-center justify-center",
            "w-7",
            "h-7",
            "rounded-full",
            // Color
            "text-surface-500 dark:text-white/80",
            
            // States
            "hover:text-surface-600 dark:hover:text-white/60",
            "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]",
            "focus:outline-none focus:outline-offset-0",
            "focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400",
            
            // Transitions
            "transition duration-200 ease-in-out",
            
            // Misc
            "cursor-pointer",
            "no-underline"
        ]
    },
    end: {
        class: "ml-auto self-center"
    }
};
