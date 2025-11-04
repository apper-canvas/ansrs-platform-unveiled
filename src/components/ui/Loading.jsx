import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center space-y-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="mx-auto w-16 h-16 border-4 border-primary-100 border-t-primary-500 rounded-full"
        />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Loading ANSRS Platform</h3>
          <p className="text-gray-600">Initializing your operational dashboard...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;