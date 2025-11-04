import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MetricCard from "@/components/molecules/MetricCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import projectService from "@/services/api/projectService";
import budgetService from "@/services/api/budgetService";
import riskService from "@/services/api/riskService";

const DashboardMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalBudget: 0,
    budgetUtilization: 0,
    highRisks: 0,
    completionRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const loadMetrics = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [projects, budgets, risks] = await Promise.all([
        projectService.getAll(),
        budgetService.getAll(),
        riskService.getAll()
      ]);

      // Calculate metrics with new field names
      const totalProjects = projects.length;
      const activeProjects = projects.filter(p => (p.status_c || p.status) === "In Progress").length;
      const completedProjects = projects.filter(p => (p.status_c || p.status) === "Completed").length;
      const completionRate = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;

      const totalBudget = budgets.reduce((sum, b) => sum + (b.allocated_c || b.allocated || 0), 0);
      const totalSpent = budgets.reduce((sum, b) => sum + (b.spent_c || b.spent || 0), 0);
      const budgetUtilization = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

      const highRisks = risks.filter(r => (r.severity_c || r.severity) === "High" && (r.status_c || r.status) === "Open").length;

      setMetrics({
        totalProjects,
        activeProjects,
        totalBudget,
        budgetUtilization,
        highRisks,
        completionRate
      });
    } catch (err) {
      setError("Failed to load dashboard metrics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadMetrics} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetricCard
        title="Total Projects"
        value={metrics.totalProjects}
        change={"+2 this month"}
        changeType="positive"
        icon="FolderOpen"
      />
      
      <MetricCard
        title="Active Projects"
        value={metrics.activeProjects}
        change={`${((metrics.activeProjects / metrics.totalProjects) * 100).toFixed(1)}% of total`}
        changeType="neutral"
        icon="Play"
      />
      
      <MetricCard
        title="Total Budget"
        value={`$${(metrics.totalBudget / 1000000).toFixed(1)}M`}
        change={`${metrics.budgetUtilization.toFixed(1)}% utilized`}
        changeType={metrics.budgetUtilization > 80 ? "negative" : "positive"}
        icon="DollarSign"
      />
      
      <MetricCard
        title="Completion Rate"
        value={`${metrics.completionRate.toFixed(1)}%`}
        change="+5% vs last quarter"
        changeType="positive"
        icon="CheckCircle"
      />
      
      <MetricCard
        title="High Priority Risks"
        value={metrics.highRisks}
        change={metrics.highRisks > 5 ? "Attention needed" : "Under control"}
        changeType={metrics.highRisks > 5 ? "negative" : "positive"}
        icon="AlertTriangle"
      />
      
      <MetricCard
        title="Budget Health"
        value={`${(100 - metrics.budgetUtilization).toFixed(1)}%`}
        change="Remaining capacity"
        changeType={metrics.budgetUtilization > 90 ? "negative" : "positive"}
        icon="TrendingUp"
      />
    </div>
  );
};

export default DashboardMetrics;