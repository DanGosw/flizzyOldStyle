export default {
    root: ({ context }) => ({
        class: [
            // Position and Shadows
            "absolute",
            "shadow-md",
            "p-fadein",
            // Spacing
            {
                "py-0 px-1": context?.right || context?.left || (!context?.right && !context?.left && !context?.top && !context?.bottom),
                "py-1 px-0": context?.top || context?.bottom
            }
        ]
    }),
    arrow: ({ context }) => ({
        class: [
            // Position
            
            "absolute",
            
            // Size
            "w-0",
            "h-0",
            
            // Shape
            "border-transparent",
            "border-solid",
            {
                "border-y-[10px] border-r-[10px] border-l-0 dark:border-r-surface-700 border-r-primary-50": context?.right ||
                    (!context?.right && !context?.left && !context?.top && !context?.bottom),
                "border-y-[10px] border-l-[10px] border-r-0 dark:border-l-surface-700 border-l-primary-50": context?.left,
                "border-x-[10px] border-t-[10px] border-b-0 dark:border-t-surface-700 border-t-primary-50": context?.top,
                "border-x-[10px] border-b-[10px] border-t-0 dark:border-b-surface-700 border-b-primary-50": context?.bottom
            },
            
            // Spacing
            {
                "-mt-[15px] top-1/2": context?.right || context?.left ||
                    (!context?.right && !context?.left && !context?.top && !context?.bottom),
                "-ml-[10px] left-1/2": context?.top || context?.bottom
            }
        ]
    }),
    text: {
        class: [
            "p-1.5 text-[14px]",
            "bg-primary-50 dark:bg-surface-700 border dark:border-primary-200 border-surface-700",
            "dark:text-white text-surface-900",
            "leading-none",
            "rounded-md",
            "whitespace-pre-line",
            "break-words"]
    }
};
