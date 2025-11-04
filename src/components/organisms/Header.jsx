import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";

const Header = ({ onMenuToggle, title = "Dashboard" }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, type: "warning", message: "Customer Portal project budget variance detected", time: "5 min ago" },
    { id: 2, type: "info", message: "Marketing Automation requirements approved", time: "1 hour ago" },
    { id: 3, type: "success", message: "Mobile App project completed successfully", time: "2 hours ago" }
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name="Menu" className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ANSRS</h1>
              <p className="text-xs text-gray-500 -mt-1">Operations Platform</p>
            </div>
          </div>
        </div>

        <div className="hidden md:block flex-1 max-w-md mx-8">
          <SearchBar 
            placeholder="Search projects, documents, people..."
            onSearch={(query) => console.log("Search:", query)}
          />
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/projects")}
            className="hidden sm:flex"
          >
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            New Project
          </Button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ApperIcon name="Bell" className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
              >
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === "warning" ? "bg-yellow-500" :
                          notification.type === "info" ? "bg-blue-500" :
                          "bg-green-500"
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-200">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">SC</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-medium">Sarah Chen</p>
              <p className="text-xs text-gray-500">Project Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;