export default {
    root: {
        class: [
            "relative",
            "flex items-center",
            "p-1",
            "rounded-md",
            "bg-surface-0 dark:bg-surface-900 border border-surface-200 dark:border-surface-700"
        ]
    },
    menu: ({ props }) => ({
        class: [
            "flex smd:flex smd:items-center smd:flex-wrap smd:relative",
            "flex-col smd:flex-row",
            { hidden: !props?.mobileActive, flex: props?.mobileActive },
            "rounded border border-[#dadaea] dark:border-[#474751] smd:border-0",
            "absolute smd:relative top-full left-0 smd:top-auto smd:left-auto",
            "w-full smd:w-auto",
            "ml-0 smd:ml-0 p-1 smd:py-0 smd:p-0 list-none",
            "shadow-md smd:shadow-none",
            "bg-surface-0 dark:bg-surface-900 smd:bg-transparent",
            "outline-none"
        ]
    }),
    menuitem: {
        class: "smd:relative smd:w-auto w-full static [&:first-child]:mt-0"
    },
    content: ({ context }) => ({
        class: [
            "rounded-[4px] w-full smd:w-auto",
            "text-surface-700 dark:text-white/80",
            { "text-surface-500 dark:text-white/70": !context.focused && !context.active },
            { "text-surface-500 dark:text-white/70 bg-[#D4DBED] dark:bg-[rgba(255,255,255,0.15)]": context.focused && !context.active },
            {
                "text-primary-highlight-inverse bg-[#D4DBED] dark:bg-[rgba(255,255,255,0.15)]": (context.focused && context.active) ||
                    context.active || (!context.focused && context.active)
            },
            { "hover:bg-[#E5E9F5] dark:hover:bg-[rgba(255,255,255,0.10)]": !context.active },
            { "hover:bg-[#E5E9F5] text-primary-highlight-inverse": context.active },
            "transition-all duration-300"
        ]
    }),
    action: ({ context }) => ({
        class: [
            "relative flex items-center",
            "py-2 px-2",
            {
                "pl-9 smd:pl-5": context.level === 1,
                "pl-14 smd:pl-5": context.level === 2
            },
            // "leading-none",
            "select-none cursor-pointer no-underline overflow-hidden"
        ]
    }),
    icon: {
        class: "mr-2"
    },
    submenuicon: ({ props }) => ({
        class: {
            "ml-auto smd:ml-2": props.root,
            "ml-auto": !props.root
        }
    }),
    submenu: ({ props }) => ({
        class: [
            "rounded-md min-w-[14rem]",
            "p-0.5 m-0 list-none",
            "shadow-none smd:shadow-md border border-surface-200 dark:border-surface-700",
            "static smd:absolute",
            { "smd:absolute smd:left-full smd:top-0": props.level > 1 },
            "bg-surface-0 dark:bg-surface-900"
        ]
    }),
    separator: {
        class: "border-t border-surface-200 dark:border-surface-600 my-[2px]"
    },
    button: {
        class: [
            "flex smd:hidden items-center justify-center",
            "w-8 h-8",
            "rounded-full",
            "text-surface-500 dark:text-white/80",
            "hover:text-surface-600 dark:hover:text-white/60",
            "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]",
            "focus:outline-none focus:outline-offset-0",
            "focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400",
            "transition duration-200 ease-in-out",
            "cursor-pointer no-underline"
        ]
    },
    start: {
        class: "self-center"
    },
    end: {
        class: "ml-auto self-center"
    }
};
