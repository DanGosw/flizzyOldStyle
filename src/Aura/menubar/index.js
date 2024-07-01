export default {
    root: {
        class: [
            "relative",
            
            // Flexbox
            "flex",
            "items-center",
            
            // Spacing
            "p-1",
            
            // Shape
            "rounded-md",
            // Color
            "bg-surface-0 dark:bg-surface-900",
            "border border-surface-200 dark:border-surface-700"
        ]
    },
    menu: ({ props }) => ({
        class: [
            // Flexbox
            "smd:flex",
            "items-center",
            "flex-wrap",
            // "overflow-x-auto",
            "flex-col smd:flex-row",
            { hidden: !props?.mobileActive, flex: props?.mobileActive },
            "rounded border border-[#dadaea] dark:border-[#474751] smd:border-0 rounded",
            
            // Position
            "absolute smd:relative",
            "top-full left-0",
            "smd:top-auto smd:left-auto",
            
            // Size
            "w-[96%] smd:w-auto",
            
            // Spacing
            "ml-2 smd:ml-0",
            "p-1 smd:py-0 smd:p-0",
            "list-none",
            
            // Shape
            "shadow-md smd:shadow-none",
            // "border-0",
            
            // Color
            "bg-surface-0 dark:bg-surface-900 smd:bg-transparent",
            
            // Misc
            "outline-none"
        ]
    }),
    menuitem: {
        class: "smd:relative smd:w-auto w-full static [&:first-child]:mt-0"
    },
    content: ({ context }) => ({
        class: [
            // Shape
            "rounded-[4px]",
            
            // Colors
            "text-surface-700 dark:text-white/80",
            {
                /*Tailwind*/
                "text-surface-500 dark:text-white/70": !context.focused && !context.active,
                "text-surface-500 dark:text-white/70 bg-[#D4DBED] dark:bg-[rgba(255,255,255,0.15)]": context.focused && !context.active,
                "text-primary-highlight-inverse bg-[#D4DBED] dark:bg-[rgba(255,255,255,0.15)]": (context.focused && context.active) ||
                    context.active ||
                    (!context.focused && context.active)
            },
            // "smd:m-2 smd:border smd:border-surface-200",
            // States
            {
                "hover:bg-[#E5E9F5] dark:hover:bg-[rgba(255,255,255,0.10)]": !context.active,
                "hover:bg-[#E5E9F5] text-primary-highlight-inverse": context.active
            },
            
            // Transitions
            "transition-all",
            "duration-300"
        ]
    }),
    action: ({ context }) => ({
        class: [
            "relative",
            
            // Flexbox
            "flex",
            "items-center",
            
            // Spacing
            "py-2",
            "px-2",
            
            // Size
            {
                "pl-9 smd:pl-5": context.level === 1,
                "pl-14 smd:pl-5": context.level === 2
            },
            "leading-none",
            
            // Misc
            "select-none",
            "cursor-pointer",
            "no-underline ",
            "overflow-hidden"
        ]
    }),
    icon: {
        class: "mr-2"
    },
    submenuicon: ({ props }) => ({
        class: [
            {
                "ml-auto smd:ml-2": props.root,
                "ml-auto": !props.root
            }
        ]
    }),
    submenu: ({ props }) => ({
        class: [
            // Size
            "rounded-md",
            "min-w-[14rem]",
            
            // Spacing
            "p-0.5",
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
            // Flexbox
            "flex smd:hidden",
            "items-center justify-center",
            
            // Size
            "w-8",
            "h-8",
            
            // Shape
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
    start: {
        class: "self-center"
    },
    end: {
        class: "ml-auto self-center"
    }
};
