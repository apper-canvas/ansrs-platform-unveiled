import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral",
  icon,
  className 
}) => {
  const changeColors = {
    positive: "text-green-600",
    negative: "text-red-600",
    neutral: "text-gray-600"
  };

  const borderColors = {
    positive: "border-l-green-500",
    negative: "border-l-red-500",
    neutral: "border-l-primary-500"
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={className}
    >
      <Card className={cn("p-6 border-l-4", borderColors[changeType])}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            {change && (
              <div className={cn("flex items-center mt-2 text-sm", changeColors[changeType])}>
                <ApperIcon 
                  name={changeType === "positive" ? "TrendingUp" : changeType === "negative" ? "TrendingDown" : "Minus"} 
                  className="w-4 h-4 mr-1" 
                />
                {change}
              </div>
            )}
          </div>
          {icon && (
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 p-3 rounded-lg">
              <ApperIcon name={icon} className="w-6 h-6 text-primary-600" />
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default MetricCard;