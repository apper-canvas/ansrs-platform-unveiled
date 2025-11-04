import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <ApperIcon name="AlertCircle" className="w-16 h-16 text-primary-500" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={() => navigate("/")}
            className="w-full"
          >
            <ApperIcon name="Home" className="w-4 h-4 mr-2" />
            Return to Dashboard
          </Button>
          
          <Button 
            variant="secondary"
            onClick={() => navigate("/projects")}
            className="w-full"
          >
            <ApperIcon name="FolderOpen" className="w-4 h-4 mr-2" />
            Browse Projects
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact your system administrator or visit our
            <button className="text-primary-600 hover:text-primary-500 ml-1">
              support center
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;