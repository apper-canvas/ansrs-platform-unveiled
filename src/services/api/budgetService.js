import budgetsData from "@/services/mockData/budgets.json";

let budgets = [...budgetsData];

const budgetService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return budgets.map(budget => ({ ...budget }));
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const budget = budgets.find(b => b.Id === id);
    return budget ? { ...budget } : null;
  },

  async getByProjectId(projectId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const budget = budgets.find(b => b.projectId === projectId);
    return budget ? { ...budget } : null;
  },

  async create(budgetData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...budgets.map(b => b.Id), 0) + 1;
    const newBudget = {
      Id: newId,
      ...budgetData,
      lastUpdated: new Date().toISOString()
    };
    budgets.push(newBudget);
    return { ...newBudget };
  },

  async update(id, budgetData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = budgets.findIndex(b => b.Id === id);
    if (index === -1) return null;
    
    budgets[index] = {
      ...budgets[index],
      ...budgetData,
      lastUpdated: new Date().toISOString()
    };
    return { ...budgets[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = budgets.findIndex(b => b.Id === id);
    if (index === -1) return false;
    
    budgets.splice(index, 1);
    return true;
  }
};

export default budgetService;