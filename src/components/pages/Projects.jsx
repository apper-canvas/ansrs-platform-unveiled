import { useState } from "react";
import { motion } from "framer-motion";
import ProjectList from "@/components/organisms/ProjectList";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Projects = () => {
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-1">Manage and track your project portfolio</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex rounded-lg border border-gray-300">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                  viewMode === "grid" 
                    ? "bg-primary-50 text-primary-600 border-primary-200" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <ApperIcon name="Grid3X3" className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 text-sm font-medium rounded-r-lg border-l transition-colors ${
                  viewMode === "list" 
                    ? "bg-primary-50 text-primary-600 border-primary-200" 
                    : "text-gray-500 hover:text-gray-700 border-gray-300"
                }`}
              >
                <ApperIcon name="List" className="w-4 h-4" />
              </button>
            </div>
            
            <Button href="/projects/new">
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Project List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ProjectList viewMode={viewMode} />
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;