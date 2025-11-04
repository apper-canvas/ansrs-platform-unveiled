import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const StatusIndicator = ({ status, showIcon = true }) => {
  const statusConfig = {
    "Completed": {
      variant: "success",
      icon: "CheckCircle",
      label: "Completed"
    },
    "In Progress": {
      variant: "info",
      icon: "Clock",
      label: "In Progress"
    },
    "Planning": {
      variant: "warning",
      icon: "Calendar",
      label: "Planning"
    },
    "On Hold": {
      variant: "error",
      icon: "Pause",
      label: "On Hold"
    },
    "Not Started": {
      variant: "default",
      icon: "Circle",
      label: "Not Started"
    }
  };

  const config = statusConfig[status] || statusConfig["Not Started"];

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      {showIcon && <ApperIcon name={config.icon} className="w-3 h-3" />}
      {config.label}
    </Badge>
  );
};

export default StatusIndicator;