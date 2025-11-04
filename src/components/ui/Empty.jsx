import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No Data Available",
  description = "Get started by creating your first item",
  actionLabel = "Create New",
  onAction,
  icon = "Database"
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-24 h-24 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name={icon} className="w-10 h-10 text-primary-500" />
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{description}</p>
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAction}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow"
        >
          {actionLabel}
        </motion.button>
      )}
    </div>
  );
};

export default Empty;