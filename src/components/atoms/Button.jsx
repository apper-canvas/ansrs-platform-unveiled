import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className, 
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg focus:ring-primary-500",
    secondary: "border border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
    ghost: "text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
    success: "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg focus:ring-green-500",
    danger: "bg-gradient-to-r from-red-500 to-rose-500 text-white hover:shadow-lg focus:ring-red-500"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md h-8",
    md: "px-4 py-2 text-sm rounded-lg h-9",
    lg: "px-6 py-3 text-base rounded-lg h-11"
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;