import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import StatusIndicator from "@/components/molecules/StatusIndicator";
import ProgressBar from "@/components/molecules/ProgressBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import projectService from "@/services/api/projectService";
import budgetService from "@/services/api/budgetService";
import riskService from "@/services/api/riskService";
import activityService from "@/services/api/activityService";
import userService from "@/services/api/userService";
import { format, formatDistance } from "date-fns";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [budget, setBudget] = useState(null);
  const [risks, setRisks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const loadProjectData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const projectId = parseInt(id);
      const [projectData, budgetData, risksData, activitiesData, usersData] = await Promise.all([
        projectService.getById(projectId),
        budgetService.getByProjectId(projectId),
        riskService.getByProjectId(projectId),
        activityService.getByProjectId(projectId),
        userService.getAll()
      ]);

      if (!projectData) {
        setError("Project not found");
        return;
      }

      setProject(projectData);
      setBudget(budgetData);
      setRisks(risksData);
      setActivities(activitiesData);
      setUsers(usersData);
    } catch (err) {
      setError("Failed to load project details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjectData();
  }, [id]);

  const getUserName = (userId) => {
    const user = users.find(u => u.Id === userId);
    return user ? user.name : "Unknown User";
  };

  const calculateProgress = () => {
    switch (project.status) {
      case "Completed": return 100;
      case "In Progress": return 65;
      case "Planning": return 25;
      case "On Hold": return 40;
      default: return 0;
    }
  };

  const getBudgetVariance = () => {
    if (!budget) return 0;
    return budget.spent - budget.allocated;
  };

  const getRiskSeverityCounts = () => {
    const counts = { High: 0, Medium: 0, Low: 0 };
    risks.forEach(risk => {
      if (risk.status === "Open") {
        counts[risk.severity] = (counts[risk.severity] || 0) + 1;
      }
    });
    return counts;
  };

  const tabs = [
    { id: "overview", name: "Overview", icon: "Eye" },
    { id: "timeline", name: "Timeline", icon: "Calendar" },
    { id: "budget", name: "Budget", icon: "DollarSign" },
    { id: "risks", name: "Risks", icon: "AlertTriangle" },
    { id: "activity", name: "Activity", icon: "MessageSquare" }
  ];

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProjectData} />;

  const progress = calculateProgress();
  const budgetVariance = getBudgetVariance();
  const riskCounts = getRiskSeverityCounts();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/projects")}
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary">
            <ApperIcon name="Edit" className="w-4 h-4 mr-2" />
            Edit Project
          </Button>
          <Button>
            <ApperIcon name="Share2" className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Project Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
                  <p className="text-gray-600 max-w-3xl">{project.description}</p>
                </div>
                <StatusIndicator status={project.status} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">Project Owner</p>
                  <p className="text-lg font-semibold text-gray-900">{getUserName(project.ownerId)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Start Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {format(new Date(project.startDate), "MMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">End Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {format(new Date(project.endDate), "MMM d, yyyy")}
                  </p>
                </div>
                {budget && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Budget</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${budget.allocated.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <ApperIcon name={tab.icon} className="w-4 h-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Progress */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Progress</h3>
                <ProgressBar progress={progress} size="lg" />
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary-600">{project.milestones?.length || 0}</p>
                    <p className="text-sm text-gray-600">Milestones</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{Math.floor(progress)}%</p>
                    <p className="text-sm text-gray-600">Complete</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{project.teamIds?.length || 0}</p>
                    <p className="text-sm text-gray-600">Team Members</p>
                  </div>
                </div>
              </Card>

              {/* Objectives */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Objectives</h3>
                <div className="space-y-3">
                  {project.objectives?.map((objective, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-700">{objective}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Budget Summary */}
              {budget && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Allocated</span>
                      <span className="font-semibold">${budget.allocated.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Spent</span>
                      <span className="font-semibold">${budget.spent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Variance</span>
                      <span className={`font-semibold ${budgetVariance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ${Math.abs(budgetVariance).toLocaleString()}
                        {budgetVariance > 0 ? ' over' : ' under'}
                      </span>
                    </div>
                  </div>
                </Card>
              )}

              {/* Risk Summary */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">High Risk</span>
                    <Badge variant="error">{riskCounts.High}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Medium Risk</span>
                    <Badge variant="warning">{riskCounts.Medium}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Low Risk</span>
                    <Badge variant="info">{riskCounts.Low}</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Activity</h3>
            <div className="space-y-6">
              {activities.map((activity) => (
                <div key={activity.Id} className="flex space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center">
                    <ApperIcon name="User" className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">{getUserName(activity.userId)}</span>
                      <Badge variant="default">{activity.type}</Badge>
                      <span className="text-sm text-gray-500">
                        {formatDistance(new Date(activity.timestamp), new Date(), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-gray-700">{activity.content}</p>
                    {activity.attachments?.length > 0 && (
                      <div className="mt-2">
                        {activity.attachments.map((attachment, index) => (
                          <div key={index} className="inline-flex items-center text-sm text-primary-600 mr-3">
                            <ApperIcon name="Paperclip" className="w-4 h-4 mr-1" />
                            {attachment}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Add other tab content as needed */}
        {activeTab !== "overview" && activeTab !== "activity" && (
          <Card className="p-12 text-center">
            <ApperIcon name="Construction" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600">This section is under development.</p>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectDetail;