import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const Settings = () => {
  const settingSections = [
    {
      title: "Organization Settings",
      description: "Configure your organization's basic information and preferences",
      icon: "Building2",
      settings: [
        { name: "Organization Name", value: "TechCorp Enterprises", type: "text" },
        { name: "Industry", value: "Technology", type: "select" },
        { name: "Time Zone", value: "UTC-8 (PST)", type: "select" },
        { name: "Currency", value: "USD", type: "select" }
      ]
    },
    {
      title: "Project Management",
      description: "Set default project settings and workflow preferences",
      icon: "FolderOpen",
      settings: [
        { name: "Default Project Duration", value: "6 months", type: "select" },
        { name: "Budget Approval Threshold", value: "$50,000", type: "number" },
        { name: "Risk Assessment Required", value: true, type: "toggle" },
        { name: "Auto-Archive Completed Projects", value: false, type: "toggle" }
      ]
    },
    {
      title: "Security & Access",
      description: "Manage security settings and user access controls",
      icon: "Shield",
      settings: [
        { name: "Multi-Factor Authentication", value: true, type: "toggle" },
        { name: "Session Timeout", value: "8 hours", type: "select" },
        { name: "IP Whitelist", value: false, type: "toggle" },
        { name: "Audit Logging", value: true, type: "toggle" }
      ]
    },
    {
      title: "Notifications",
      description: "Configure notification preferences and delivery methods",
      icon: "Bell",
      settings: [
        { name: "Email Notifications", value: true, type: "toggle" },
        { name: "Slack Integration", value: false, type: "toggle" },
        { name: "Weekly Summary Reports", value: true, type: "toggle" },
        { name: "Budget Alert Threshold", value: "80%", type: "number" }
      ]
    }
  ];

  const renderSettingInput = (setting) => {
    switch (setting.type) {
      case "toggle":
        return (
          <div className="flex items-center">
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                setting.value ? "bg-primary-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  setting.value ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        );
      case "select":
        return (
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
            <option value={setting.value}>{setting.value}</option>
          </select>
        );
      case "number":
        return (
          <Input
            type="text"
            defaultValue={setting.value}
            className="w-32"
          />
        );
      default:
        return (
          <Input
            type="text"
            defaultValue={setting.value}
            className="flex-1"
          />
        );
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Configure your ANSRS platform preferences and organization settings</p>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="secondary">
              <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button>
              <ApperIcon name="Save" className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {settingSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ApperIcon name={section.icon} className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                    <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {section.settings.map((setting, settingIndex) => (
                    <div
                      key={setting.name}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex-1">
                        <label className="text-sm font-medium text-gray-900 block">
                          {setting.name}
                        </label>
                      </div>
                      <div className="flex-shrink-0">
                        {renderSettingInput(setting)}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* System Information */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Platform Version</p>
              <p className="text-lg font-semibold text-gray-900">ANSRS 1.0.0</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Last Backup</p>
              <p className="text-lg font-semibold text-gray-900">2 hours ago</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">System Status</p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-lg font-semibold text-green-600">Healthy</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Export Organization Data</p>
                <p className="text-sm text-gray-600">Download a complete backup of your organization's data</p>
              </div>
              <Button variant="secondary">
                <ApperIcon name="Download" className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Import Data</p>
                <p className="text-sm text-gray-600">Upload data from external systems or previous exports</p>
              </div>
              <Button variant="secondary">
                <ApperIcon name="Upload" className="w-4 h-4 mr-2" />
                Import
              </Button>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <p className="font-medium text-red-600">Danger Zone</p>
                <p className="text-sm text-gray-600">Permanently delete all organization data</p>
              </div>
              <Button variant="danger" size="sm">
                <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
                Delete Data
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;