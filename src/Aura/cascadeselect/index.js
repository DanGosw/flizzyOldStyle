export default {
    root: ({ props, state }) => ({
        class: [
            "relative",
            
            // Flex
            {
                flex: props.fluid,
                "inline-flex": !props.fluid
            },
            
            // Shape
            "rounded-md border",
            
            // Color and Background
            { "bg-surface-0 dark:bg-surface-950": !props.disabled },
            "border !min-w-[8rem]",
            { "border-surface-300 dark:border-surface-600": !props.invalid },
            
            // Invalid State
            "invalid:focus:ring-red-200",
            "invalid:hover:border-red-500",
            { "border-red-400 dark:!border-red-500": props.invalid },
            
            // Transitions
            "transition-all",
            "duration-200",
            
            // States
            { "hover:border-surface-400 dark:hover:border-surface-600": !props.invalid },
            { "outline-none outline-offset-0 ring-1 ring-red-500 dark:ring-red-500 z-10": state.focused && props.invalid },
            { "outline-none outline-offset-0 ring-1 ring-primary-500 dark:ring-primary-400 z-10": state.focused && !props.invalid },
            
            // Misc
            "cursor-pointer",
            "select-none",
            { "bg-surface-200 dark:bg-surface-700 select-none pointer-events-none cursor-default": props.disabled }
        ]
    }),
    label: ({ props }) => ({
        class: [
            // Font
            "leading-[normal] text-[14px]",
            
            // Flex & Alignment
            "flex flex-auto",
            
            // Sizing and Spacing
            "w-[1%]",
            "py-1.5 px-2",
            
            //Shape
            "rounded-none",
            
            // Color and Background
            "bg-transparent",
            "border-0",
            { "text-surface-800 dark:text-white/80": props.modelValue, "text-surface-400 dark:text-surface-500": !props.modelValue },
            "placeholder:text-surface-400 dark:placeholder:text-surface-500",
            
            // Transitions
            "transition",
            "duration-200",
            
            // States
            "focus:outline-none focus:shadow-none",
            
            // Misc
            "relative",
            "cursor-pointer",
            "overflow-hidden overflow-ellipsis",
            "whitespace-nowrap",
            "appearance-none"
        ]
    }),
    dropdown: {
        class: [
            // Flexbox
            "flex items-center justify-center",
            "shrink-0",
            
            // Color and Background
            "bg-transparent",
            "text-surface-500",
            
            // Size
            "w-10",
            
            // Shape
            "rounded-r-md"
        ]
    },
    overlay: {
        class: [
            // Colors
            "bg-surface-0 dark:bg-surface-900",
            "text-surface-700 dark:text-white/80",
            
            // Shape
            "border border-surface-300 dark:border-surface-700",
            "rounded-md",
            "shadow-md"
        ]
    },
    list: {
        class: "flex flex-col list-none p-0 m-0 gap-[2px] min-w-[10rem]"
    },
    option: ({ context }) => ({
        class: [
            //Shape
            "rounded-[4px]",
            
            // Spacing
            "first:mt-0 mt-[2px]",
            
            // Colors
            {
                "text-surface-500 dark:text-white/70": !context.focused && !context.active,
                "text-surface-500 dark:text-white/70 bg-surface-200 dark:bg-surface-700": context.focused && !context.active,
                "text-primary-highlight-inverse bg-primary-highlight": (context.focused && context.active) || context.active ||
                    (!context.focused && context.active)
            },
            
            // Transitions
            "transition-shadow",
            "duration-200",
            
            // States
            {
                "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]": !context.active,
                "hover:bg-primary-highlight-hover text-primary-highlight-inverse": context.active
            },
            
            // Disabled
            { "opacity-60 pointer-events-none cursor-default": context.disabled }
        ]
    }),
    optionContent: {
        class: [
            "relative",
            "leading-[normal]",
            
            // Flexbox
            "flex",
            "items-center",
            
            // Spacing
            "py-2",
            "px-3",
            
            // Color
            "text-surface-700 dark:text-white/80 text-[14px]",
            
            // Misc
            "no-underline",
            "overflow-hidden",
            "cursor-pointer",
            "select-none"
        ]
    },
    groupIcon: {
        class: [
            // Alignment
            "absolute right-3 !top-4"
        ]
    },
    optionList: {
        class: [
            "min-w-full",
            
            // Spacing
            "p-1",
            "m-0",
            "list-none",
            "min-w-[10rem]",
            
            // Shape
            "shadow-none sm:shadow-md",
            "rounded-md",
            "border border-surface-200 dark:border-surface-700",
            
            // Position
            "static sm:absolute",
            "z-10",
            
            // Color
            "bg-surface-0 dark:bg-surface-900 text-[14px]"
        ]
    },
    transition: {
        enterFromClass: "opacity-0 scale-y-[0.8]",
        enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
        leaveActiveClass: "transition-opacity duration-100 ease-linear",
        leaveToClass: "opacity-0"
    }
};
