export default {
    root: ({ props, context, parent }) => ({
        class: [
            // Font
            "leading-none text-[14px]",
            
            // Flex
            { "flex-1 w-[1%]": parent.instance.$name === "InputGroup" },
            { "flex-auto w-[1%]": parent.instance.$name === "InputNumber" },
            { "order-2": parent.instance.$name === "InputNumber" },
            
            // Spacing
            "m-0",
            {
                "py-3 px-3.5": props.size === "large",
                "py-1.5 px-2 w-full": props.size === "small",
                "py-1.5 px-3": props.size === null,
                "py-2 pr-8 pl-2": parent.instance.$name === "IconField"
            },
            
            // leading-none flex-auto w-[1%] py-2 px-3 m-0 rounded-md rounded-l-none rounded-r-none text-surface-800 dark:text-white/80 placeholder:text-surface-400 dark:placeholder:text-surface-500 bg-surface-0 dark:bg-surface-950 border border-surface-300 dark:border-surface-700 invalid:focus:ring-red-200 invalid:hover:border-red-500 hover:border-primary focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:z-10 order-2
            // Shape
            { "rounded-md": parent.instance.$name !== "InputGroup" },
            { "rounded-md": parent.instance.$name !== "InputGroup" || parent.instance.$name !== "InputNumber" },
            { "first:rounded-l-md rounded-none last:rounded-r-md": parent.instance.$name === "InputGroup" },
            { "first:rounded-l-none rounded-none last:rounded-r-none": parent.instance.$name === "InputNumber" },
            { "border-0 border-y border-l last:border-r": parent.instance.$name === "InputGroup" },
            { "border border-y border-l last:border-r": parent.instance.$name === "InputNumber" },
            { "first:ml-0 -ml-px": parent.instance.$name === "InputGroup" && !props.showButtons },
            { "first:ml-0 -ml-px": parent.instance.$name === "InputNumber" && !props.showButtons },
            
            // Colors
            "text-surface-800 dark:text-white/80",
            "placeholder:text-surface-400 dark:placeholder:text-surface-500",
            { "bg-surface-0 dark:bg-surface-950": !context.disabled },
            "border",
            { "border-surface-300 dark:border-surface-700": !props.invalid },
            
            // Invalid State
            "invalid:focus:ring-red-200",
            "invalid:hover:border-red-400",
            { "border-red-500 dark:border-red-500": props.invalid },
            { "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-red-500 focus:z-10": props.invalid },
            
            // States
            {
                "hover:border-surface-400 dark:hover:border-surface-600": !context.disabled && !props.invalid,
                "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:z-10": !context.disabled &&
                    !props.invalid,
                "bg-surface-200 dark:bg-surface-700 select-none pointer-events-none cursor-default": context.disabled
            },
            
            // Filled State *for FloatLabel
            { filled: parent.instance?.$name === "FloatLabel" && context.filled },
            
            // Misc
            "appearance-none",
            "transition-colors duration-200"
        ]
    })
};
