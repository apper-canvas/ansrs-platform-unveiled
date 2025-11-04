import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardMetrics from "@/components/organisms/DashboardMetrics";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import StatusIndicator from "@/components/molecules/StatusIndicator";
import ApperIcon from "@/components/ApperIcon";
import projectService from "@/services/api/projectService";
import activityService from "@/services/api/activityService";
import userService from "@/services/api/userService";
import { format, formatDistance } from "date-fns";

const Dashboard = () => {
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
const loadDashboardData = async () => {
      try {
        const [projects, activities, usersData] = await Promise.all([
          projectService.getAll(),
          activityService.getAll(),
          userService.getAll()
        ]);

        // Get 5 most recently updated projects
        const sortedProjects = projects
          .sort((a, b) => new Date(b.ModifiedOn || b.updatedAt) - new Date(a.ModifiedOn || a.updatedAt))
          .slice(0, 5);

        // Get 8 most recent activities
        const sortedActivities = activities
          .sort((a, b) => new Date(b.timestamp_c || b.timestamp) - new Date(a.timestamp_c || a.timestamp))
          .slice(0, 8);

        setRecentProjects(sortedProjects);
        setRecentActivity(sortedActivities);
        setUsers(usersData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

const getUserName = (userId) => {
    const user = users.find(u => u.Id === parseInt(userId));
    return user ? (user.name_c || user.name) : "Unknown User";
  };

const getProjectName = (projectId) => {
    const project = recentProjects.find(p => p.Id === projectId);
    return project ? (project.name_c || project.name) : "Unknown Project";
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "Comment": return "MessageSquare";
      case "Update": return "Edit";
      case "File Upload": return "Upload";
      case "Status Change": return "RefreshCw";
      case "Risk Update": return "AlertTriangle";
      default: return "Activity";
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your projects.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" href="/reports">
            <ApperIcon name="BarChart3" className="w-4 h-4 mr-2" />
            View Reports
          </Button>
          <Button href="/projects/new">
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <DashboardMetrics />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
              <Button variant="ghost" size="sm" href="/projects">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="flex items-center space-x-3">
                        <div className="h-4 w-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded flex-1"></div>
                        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                recentProjects.map((project, index) => (
                  <motion.div
                    key={project.Id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => window.location.href = `/projects/${project.Id}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                      <div>
                        <p className="font-medium text-gray-900">{project.name}</p>
<p className="text-sm text-gray-500">
                          Updated {formatDistance(new Date(project.ModifiedOn || project.updatedAt), new Date(), { addSuffix: true })}
</p>
                      </div>
                    </div>
                    <StatusIndicator status={project.status_c || project.status} />
                  </motion.div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Activity Feed */}
        <div>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <ApperIcon name="Activity" className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="flex space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.Id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex space-x-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center">
                      <ApperIcon 
                        name={getActivityIcon(activity.type)} 
                        className="w-4 h-4 text-primary-600" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
<span className="font-medium">{getUserName(activity.user_id_c || activity.userId)}</span>
                        {" "}
                        <span className="text-gray-600">{activity.content}</span>
                      </p>
<div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                        <span>{getProjectName(activity.project_id_c || activity.projectId)}</span>
                        <span>•</span>
                        <span>{formatDistance(new Date(activity.timestamp_c || activity.timestamp), new Date(), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;