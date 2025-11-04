import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    projects: true,
    organization: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const navigation = [
    { 
      name: "Dashboard", 
      href: "/", 
      icon: "LayoutDashboard",
      exact: true
    },
    { 
      name: "Projects", 
      href: "/projects", 
      icon: "FolderOpen",
      children: [
        { name: "All Projects", href: "/projects" },
        { name: "Active", href: "/projects?status=active" },
        { name: "Planning", href: "/projects?status=planning" },
        { name: "Completed", href: "/projects?status=completed" }
      ]
    },
    { 
      name: "Reports", 
      href: "/reports", 
      icon: "BarChart3" 
    },
    { 
      name: "Organization", 
      href: "/organization", 
      icon: "Building2",
      children: [
        { name: "Structure", href: "/organization" },
        { name: "Teams", href: "/organization/teams" },
        { name: "Users", href: "/organization/users" }
      ]
    },
    { 
      name: "Settings", 
      href: "/settings", 
      icon: "Settings" 
    }
  ];

  const NavItem = ({ item, level = 0 }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections[item.name.toLowerCase()];

    if (hasChildren) {
      return (
        <div>
          <button
            onClick={() => toggleSection(item.name.toLowerCase())}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-primary-50 hover:text-primary-600",
              level > 0 && "ml-4",
              "text-gray-700"
            )}
          >
            <div className="flex items-center">
              <ApperIcon name={item.icon} className="w-5 h-5 mr-3" />
              {item.name}
            </div>
            <ApperIcon 
              name="ChevronRight" 
              className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-90")} 
            />
          </button>
          
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="ml-8 mt-1 space-y-1"
            >
              {item.children.map((child) => (
                <NavLink
                  key={child.href}
                  to={child.href}
                  onClick={() => window.innerWidth < 1024 && onClose()}
                  className={({ isActive }) =>
                    cn(
                      "block px-3 py-2 text-sm rounded-md transition-colors",
                      isActive
                        ? "bg-primary-100 text-primary-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )
                  }
                >
                  {child.name}
                </NavLink>
              ))}
            </motion.div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        to={item.href}
        onClick={() => window.innerWidth < 1024 && onClose()}
        end={item.exact}
        className={({ isActive }) =>
          cn(
            "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
            level > 0 && "ml-4",
            isActive
              ? "bg-primary-500 text-white"
              : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"
          )
        }
      >
        <ApperIcon name={item.icon} className="w-5 h-5 mr-3" />
        {item.name}
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">ANSRS</h1>
                <p className="text-xs text-gray-500 -mt-1">Operations Platform</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <ApperIcon name="X" className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <ApperIcon name="Building2" className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">TechCorp</p>
                <p className="text-xs text-gray-500">Enterprise Plan</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;