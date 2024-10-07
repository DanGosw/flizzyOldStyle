export default {
    root: {
        class: [
            // Flex & Alignment
            "flex items-center justify-center flex-wrap",
            
            // Spacing
            "px-4 py-2",
            
            // Shape
            "border-0 rounded-md",
            
            //font size
            "text-sm",
            // Color
            "bg-surface-0 dark:bg-surface-900",
            "text-surface-600 dark:text-white/60"
        ]
    },
    first: ({ context }) => ({
        class: [
            "relative",
            
            // Flex & Alignment
            "inline-flex items-center justify-center",
            
            // Shape
            "border-0 rounded bg-surface-300 dark:bg-surface-800",
            
            // Size
            "min-w-[1.8rem] h-7 m-[0.125rem]",
            "leading-none",
            
            // Color
            "text-surface-500 dark:text-white/60",
            
            // State
            {
                "hover:bg-surface-200 dark:hover:bg-[rgba(255,255,255,0.03)]": !context.disabled,
                "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400": !context.disabled
            },
            
            // Transition
            "transition duration-200",
            
            // Misc
            "user-none overflow-hidden",
            { "cursor-not-allowed opacity-60": context.disabled }
        ]
    }),
    prev: ({ context }) => ({
        class: [
            "relative",
            
            // Flex & Alignment
            "inline-flex items-center justify-center",
            
            // Shape
            "border-0 rounded bg-surface-200 dark:bg-surface-800",
            
            // Size
            "min-w-[1.8rem] h-7 m-[0.125rem]",
            "leading-none",
            
            // Color
            "text-surface-500 dark:text-white/60",
            
            // State
            {
                "hover:bg-surface-200 dark:hover:bg-[rgba(255,255,255,0.03)] bg-surface-300 dark:bg-surface-800": !context.disabled,
                "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400": !context.disabled
            },
            
            // Transition
            "transition duration-200",
            
            // Misc
            "user-none overflow-hidden",
            { "cursor-not-allowed opacity-60": context.disabled }
        ]
    }),
    next: ({ context }) => ({
        class: [
            "relative",
            
            // Flex & Alignment
            "inline-flex items-center justify-center",
            
            // Shape
            "border-0 rounded",
            
            // Size
            "min-w-[1.8rem] h-7 m-[0.125rem]",
            "leading-none",
            
            // Color
            "text-surface-600 dark:text-white/60",
            
            // State
            {
                "hover:bg-surface-200 dark:hover:bg-[rgba(255,255,255,0.03)] bg-surface-300 dark:bg-surface-800": !context.disabled,
                "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400": !context.disabled
            },
            
            // Transition
            "transition duration-300",
            
            // Misc
            "user-none overflow-hidden",
            { "cursor-not-allowed opacity-60": context.disabled }
            // { "pointer-events-none": context.disabled }
        ]
    }),
    last: ({ context }) => ({
        class: [
            "relative",
            
            // Flex & Alignment
            "inline-flex items-center justify-center",
            
            // Shape
            "border-0 rounded",
            
            // Size
            "min-w-[1.8rem] h-7 m-[0.125rem] bg-surface-300 dark:bg-surface-800",
            "leading-none",
            
            // Color
            "text-surface-600 dark:text-white/60",
            
            // State
            {
                "hover:bg-surface-200 dark:hover:bg-[rgba(255,255,255,0.03)]": !context.disabled,
                "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400": !context.disabled
            },
            
            // Transition
            "transition duration-200",
            
            // Misc
            "user-none overflow-hidden",
            { "cursor-not-allowed opacity-60": context.disabled }
        ]
    }),
    
    content: "inline-flex items-center justify-center flex-wrap",
    page: ({ context }) => ({
        class: [
            "relative",
            
            // Flex & Alignment
            "inline-flex items-center justify-center",
            
            // Background color
            { "bg-primary-600 dark:bg-primary-600 text-white hover:bg-primary-600 dark:hover:bg-primary-500": context.active },
            { "bg-surface-200/80 dark:bg-surface-800/80": !context.active },
            
            // Shape
            "border-0 rounded select-none",
            
            // Size
            "min-w-[1.8rem] h-7 m-[0.125rem]",
            "leading-none",
            
            // Color
            "text-surface-600 dark:text-white/60",
            
            // State
            {
                "hover:bg-surface-300 dark:hover:bg-[rgba(255,255,255,0.1)]": !context.disabled,
                "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400": !context.disabled
            },
            
            // Transition
            "transition duration-200",
            
            // Misc
            "user-none overflow-hidden",
            { "cursor-not-allowed pointer-events-none": context.active }
        ]
    }),
    pcrowperpagedropdown: {
        root: ({ props, state /* parent */ }) => ({
            class: [
                // Display and Position
                "inline-flex items-center justify-center",
                "relative",
                
                // Shape
                "h-7 max-w-24",
                "rounded-md",
                
                // Spacing
                "mx-1.5",
                
                // Color and Background
                "bg-surface-0 dark:bg-surface-950",
                "border border-surface-300 dark:border-surface-700",
                
                // Transitions
                "transition-all",
                "duration-200",
                
                // States
                "hover:border-surface-400 dark:hover:border-surface-600",
                { "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400": !state.focused },
                
                // Misc
                "cursor-pointer",
                "select-none",
                { "bg-surface-200 dark:bg-surface-700 select-none pointer-events-none cursor-default": props.disabled }
            ]
        }),
        input: {
            class: [
                //Font
                "leading-[normal]",
                
                // Display
                "block",
                "flex-auto",
                
                // Color and Background
                "bg-transparent",
                "border-0",
                "text-surface-900 dark:text-white/80",
                
                // Sizing and Spacing
                "w-[1%]",
                "py-2.5 pl-3 pr-0",
                
                //Shape
                "rounded-none",
                
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
        },
        trigger: {
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
                "rounded-tr-md",
                "rounded-br-md"
            ]
        },
        panel: {
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
        wrapper: {
            class: [
                // Sizing
                "max-h-[200px]",
                
                // Misc
                "overflow-auto"
            ]
        },
        list: {
            class: "p-1 list-none m-0"
        }
    },
    jumptopageinput: {
        root: {
            class: "inline-flex mx-2"
        },
        input: {
            root: {
                class: [
                    "relative",
                    
                    //Font
                    "leading-none",
                    
                    // Display
                    "block",
                    "flex-auto",
                    
                    // Colors
                    "text-surface-600 dark:text-surface-200",
                    "placeholder:text-surface-400 dark:placeholder:text-surface-500",
                    "bg-surface-0 dark:bg-surface-950",
                    "border border-surface-300 dark:border-surface-700",
                    
                    // Sizing and Spacing
                    "w-[1%] max-w-[3rem]",
                    "py-1.5 px-3 m-0",
                    
                    //Shape
                    "rounded-md",
                    
                    // Transitions
                    "transition",
                    "duration-200",
                    
                    // States
                    "hover:border-surface-400 dark:hover:border-surface-600",
                    "focus:outline-none focus:shadow-none",
                    "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400",
                    
                    // Misc
                    "cursor-pointer",
                    "overflow-hidden overflow-ellipsis",
                    "whitespace-nowrap",
                    "appearance-none"
                ]
            }
        }
    },
    pcjumptopagedropdown: {
        root: ({ props, state }) => ({
            class: [
                // Display and Position
                "inline-flex items-center",
                "relative",
                
                // Shape
                "h-7",
                "rounded-md",
                
                // Spacing
                "mx-2",
                
                // Color and Background
                "bg-surface-0 dark:bg-surface-950",
                "border border-surface-300 dark:border-surface-700",
                
                // Transitions
                "transition-all",
                "duration-200",
                
                // States
                "hover:border-surface-400 dark:hover:border-surface-600",
                { "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400": !state.focused },
                
                // Misc
                "cursor-pointer",
                "select-none",
                { "bg-surface-200 dark:bg-surface-700 select-none pointer-events-none cursor-default": props.disabled }
            ]
        }),
        input: {
            class: [
                //Font
                "leading-[normal]",
                
                // Display
                "block",
                "flex-auto",
                
                // Color and Background
                "bg-transparent",
                "border-0",
                "text-surface-800 dark:text-white/80",
                
                // Sizing and Spacing
                "w-[1%]",
                "py-2 pl-3 pr-0",
                
                //Shape
                "rounded-none",
                
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
        },
        trigger: {
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
                "rounded-tr-md",
                "rounded-br-md"
            ]
        },
        panel: {
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
        wrapper: {
            class: [
                // Sizing
                "max-h-[200px]",
                
                // Misc
                "overflow-auto"
            ]
        },
        list: {
            class: "p-1 list-none m-0 text-red-500"
        }
    },
    start: {
        class: "mr-auto"
    },
    end: {
        class: "ml-auto"
    }
};
