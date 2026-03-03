import clsx from "clsx";

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}) {
  return (
    <button
      className={clsx(
        "font-semibold rounded-full transition-all duration-200 inline-flex items-center justify-center",

        // Variants
        {
          "bg-brand-blue text-white hover:bg-[#0052cc] border border-transparent shadow-md":
            variant === "primary",

          "bg-transparent text-brand-blue hover:bg-blue-50 border border-brand-blue":
            variant === "secondary",
        },

        // Sizes
        {
          "px-4 py-2 text-sm": size === "sm",
          "px-6 py-3 text-base": size === "md",
          "px-8 py-4 text-lg": size === "lg",
        },

        {
          "w-full": fullWidth,
        },

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}