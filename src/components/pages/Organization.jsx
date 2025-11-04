import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import userService from "@/services/api/userService";

const Organization = () => {
const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTab, setSelectedTab] = useState("structure");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      
      const usersData = await userService.getAll();
      setUsers(usersData);
    } catch (err) {
      setError("Failed to load organization data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const departments = [
    { id: 1, name: "Engineering", members: 5, color: "blue" },
    { id: 2, name: "Marketing", members: 2, color: "green" },
    { id: 3, name: "Finance", members: 2, color: "yellow" },
    { id: 4, name: "Operations", members: 1, color: "purple" }
  ];

  const getRoleBadgeVariant = (role) => {
    if (role.includes("Director") || role.includes("CFO")) return "primary";
    if (role.includes("Manager") || role.includes("Lead")) return "success";
    return "default";
  };

  const tabs = [
    { id: "structure", name: "Structure", icon: "Building2" },
    { id: "teams", name: "Teams", icon: "Users" },
    { id: "users", name: "Users", icon: "User" }
  ];

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadUsers} />;

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Organization</h1>
            <p className="text-gray-600 mt-1">Manage your organizational structure, teams, and users</p>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="secondary">
              <ApperIcon name="Download" className="w-4 h-4 mr-2" />
              Export Structure
            </Button>
            <Button>
              <ApperIcon name="UserPlus" className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === tab.id
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
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selectedTab === "structure" && (
            <div className="space-y-6">
              {/* Organization Overview */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">TechCorp Enterprises</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {departments.map((dept, index) => (
                    <motion.div
                      key={dept.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-10 h-10 bg-gradient-to-br from-${dept.color}-100 to-${dept.color}-200 rounded-lg flex items-center justify-center`}>
                          <ApperIcon name="Building2" className={`w-5 h-5 text-${dept.color}-600`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                          <p className="text-sm text-gray-600">{dept.members} members</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant="default" className="text-xs">Active</Badge>
                        <Button variant="ghost" size="sm">
                          <ApperIcon name="ChevronRight" className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Org Chart Placeholder */}
              <Card className="p-12 text-center">
                <ApperIcon name="Sitemap" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Org Chart</h3>
                <p className="text-gray-600 mb-6">Visual representation of your organizational hierarchy</p>
                <Button variant="secondary">View Full Chart</Button>
              </Card>
            </div>
          )}

          {selectedTab === "users" && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Total: {users.length} users</span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user, index) => (
                      <motion.tr
                        key={user.Id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
{(user.name_c || user.name).split(" ").map(n => n[0]).join("")}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
<Badge variant={getRoleBadgeVariant(user.role_c || user.role)}>
                            {user.role_c || user.role}
                          </Badge>
                        </td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {departments.find(d => d.id === (user.department_id_c || user.departmentId))?.name || "Unknown"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
<Badge variant={(user.is_external_c || user.isExternal) ? "warning" : "success"}>
                            {(user.is_external_c || user.isExternal) ? "External" : "Internal"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm">
                            <ApperIcon name="MoreHorizontal" className="w-4 h-4" />
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {selectedTab === "teams" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {departments.map((dept, index) => (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{dept.name}</h3>
                      <Badge variant="info">{dept.members} members</Badge>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      {users
                        .filter(user => user.departmentId === dept.id)
                        .map((user) => (
                          <div key={user.Id} className="flex items-center space-x-3">
<div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-medium text-xs">
                              {(user.name_c || user.name).split(" ").map(n => n[0]).join("")}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{user.name_c || user.name}</p>
                              <p className="text-xs text-gray-500">{user.role_c || user.role}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                    
                    <Button variant="ghost" size="sm" className="w-full">
                      <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                      Add Team Member
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Organization;