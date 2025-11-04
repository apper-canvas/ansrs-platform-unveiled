import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import StatusIndicator from "@/components/molecules/StatusIndicator";
import ProgressBar from "@/components/molecules/ProgressBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import projectService from "@/services/api/projectService";
import budgetService from "@/services/api/budgetService";
import userService from "@/services/api/userService";
import { format } from "date-fns";

const ProjectList = ({ viewMode = "grid" }) => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("updatedAt");
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [projectsData, usersData, budgetsData] = await Promise.all([
        projectService.getAll(),
        userService.getAll(),
        budgetService.getAll()
      ]);
      
      setProjects(projectsData);
      setUsers(usersData);
      setBudgets(budgetsData);
    } catch (err) {
      setError("Failed to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getProjectOwner = (ownerId) => {
    return users.find(user => user.Id === ownerId);
  };

  const getProjectBudget = (projectId) => {
    return budgets.find(budget => budget.projectId === projectId);
  };

  const calculateProgress = (project) => {
    // Mock calculation based on status
    switch (project.status) {
      case "Completed": return 100;
      case "In Progress": return Math.floor(Math.random() * 40) + 50;
      case "Planning": return Math.floor(Math.random() * 30) + 20;
      case "On Hold": return Math.floor(Math.random() * 50) + 10;
      default: return 0;
    }
  };

  const getBudgetVariance = (budget) => {
    if (!budget) return 0;
    return ((budget.spent / budget.allocated) * 100) - 100;
  };

  const filteredProjects = projects.filter(project => {
    if (filterStatus === "all") return true;
    return project.status.toLowerCase().replace(" ", "-") === filterStatus;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "status":
        return a.status.localeCompare(b.status);
      case "updatedAt":
      default:
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    }
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;
  if (projects.length === 0) {
    return (
      <Empty
        title="No Projects Found"
        description="Start by creating your first project to begin tracking progress and managing your portfolio."
        actionLabel="Create Project"
        onAction={() => navigate("/projects/new")}
        icon="FolderPlus"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Projects</option>
            <option value="in-progress">In Progress</option>
            <option value="planning">Planning</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="updatedAt">Recently Updated</option>
            <option value="name">Name</option>
            <option value="status">Status</option>
          </select>
        </div>

        <Button onClick={() => navigate("/projects/new")}>
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProjects.map((project, index) => {
          const owner = getProjectOwner(project.ownerId);
          const budget = getProjectBudget(project.Id);
          const progress = calculateProgress(project);
          const budgetVariance = getBudgetVariance(budget);

          return (
            <motion.div
              key={project.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg cursor-pointer transition-all duration-200">
                <div 
                  onClick={() => navigate(`/projects/${project.Id}`)}
                  className="space-y-4"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <StatusIndicator status={project.status} />
                  </div>

                  {/* Progress */}
                  <ProgressBar progress={progress} showLabel={false} />

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Due Date</p>
                      <p className="font-medium">
                        {format(new Date(project.endDate), "MMM d, yyyy")}
                      </p>
                    </div>
                    {budget && (
                      <div>
                        <p className="text-gray-500">Budget</p>
                        <p className="font-medium">
                          ${budget.allocated.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      {owner && (
                        <>
                          <div className="w-6 h-6 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center text-xs text-white font-medium">
                            {owner.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <span className="text-sm text-gray-600">{owner.name}</span>
                        </>
                      )}
                    </div>
                    
                    {budget && budgetVariance !== 0 && (
                      <div className={`flex items-center text-xs ${
                        budgetVariance > 10 ? "text-red-600" : 
                        budgetVariance > 0 ? "text-yellow-600" : 
                        "text-green-600"
                      }`}>
                        <ApperIcon 
                          name={budgetVariance > 0 ? "TrendingUp" : "TrendingDown"} 
                          className="w-3 h-3 mr-1" 
                        />
                        {Math.abs(budgetVariance).toFixed(1)}%
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <Empty
          title="No Projects Match Filter"
          description="Try adjusting your filter criteria to see more projects."
          icon="Filter"
        />
      )}
    </div>
  );
};

export default ProjectList;