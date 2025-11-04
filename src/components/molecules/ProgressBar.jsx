import { cn } from "@/utils/cn";

const ProgressBar = ({ 
  progress = 0, 
  className, 
  variant = "default",
  showLabel = true,
  size = "md"
}) => {
  const variants = {
    default: "bg-primary-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500"
  };

  const sizes = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  };

  const getVariantByProgress = () => {
    if (progress >= 100) return "success";
    if (progress >= 75) return "default";
    if (progress >= 50) return "warning";
    return "error";
  };

  const currentVariant = variant === "default" ? getVariantByProgress() : variant;
  
  return (
    <div className={cn("space-y-1", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      <div className={cn("w-full bg-gray-200 rounded-full overflow-hidden", sizes[size])}>
        <div
          className={cn("h-full transition-all duration-500 ease-out", variants[currentVariant])}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;