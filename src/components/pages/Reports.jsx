import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Reports = () => {
  const reportTemplates = [
    {
      id: 1,
      name: "Project Portfolio Summary",
      description: "High-level overview of all projects, status, and key metrics",
      icon: "BarChart3",
      category: "Executive"
    },
    {
      id: 2,
      name: "Budget Utilization Report",
      description: "Detailed analysis of budget allocation and spending across projects",
      icon: "DollarSign",
      category: "Financial"
    },
    {
      id: 3,
      name: "Risk Assessment Matrix",
      description: "Comprehensive view of risks across all projects by severity and likelihood",
      icon: "AlertTriangle",
      category: "Risk Management"
    },
    {
      id: 4,
      name: "Team Performance Dashboard",
      description: "Productivity metrics and performance indicators by team and individual",
      icon: "Users",
      category: "Performance"
    },
    {
      id: 5,
      name: "Timeline and Milestone Tracker",
      description: "Project timelines, milestone completion, and schedule variance analysis",
      icon: "Calendar",
      category: "Timeline"
    },
    {
      id: 6,
      name: "Resource Allocation Analysis",
      description: "Resource utilization and capacity planning across all projects",
      icon: "PieChart",
      category: "Resources"
    }
  ];

  const categories = ["All", "Executive", "Financial", "Risk Management", "Performance", "Timeline", "Resources"];

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Generate insights and track performance across your organization</p>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="secondary">
              <ApperIcon name="Download" className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button>
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              Custom Report
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="FileText" className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">24</p>
            <p className="text-sm text-gray-600">Generated Reports</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="TrendingUp" className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">92%</p>
            <p className="text-sm text-gray-600">Data Accuracy</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Clock" className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">15s</p>
            <p className="text-sm text-gray-600">Avg Generation Time</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Share2" className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">156</p>
            <p className="text-sm text-gray-600">Reports Shared</p>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "primary" : "secondary"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Report Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg cursor-pointer transition-all duration-200 h-full">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center">
                      <ApperIcon name={template.icon} className="w-6 h-6 text-primary-600" />
                    </div>
                    <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {template.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">{template.description}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2 border-t border-gray-100">
                    <Button variant="secondary" size="sm" className="flex-1">
                      <ApperIcon name="Eye" className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1">
                      <ApperIcon name="Play" className="w-4 h-4 mr-2" />
                      Generate
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Reports */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {[
              { name: "Q1 Portfolio Summary", date: "2 hours ago", user: "Sarah Chen", status: "Ready" },
              { name: "Budget Analysis - January", date: "1 day ago", user: "Robert Martinez", status: "Ready" },
              { name: "Risk Assessment Matrix", date: "2 days ago", user: "Sarah Chen", status: "Processing" },
              { name: "Team Performance Report", date: "3 days ago", user: "James Thompson", status: "Ready" }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-100 to-accent-200 rounded-lg flex items-center justify-center">
                    <ApperIcon name="FileText" className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{report.name}</p>
                    <p className="text-sm text-gray-500">Generated by {report.user} • {report.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    report.status === "Ready" 
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {report.status}
                  </span>
                  <Button variant="ghost" size="sm">
                    <ApperIcon name="Download" className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;