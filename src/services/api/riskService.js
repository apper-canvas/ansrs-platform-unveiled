import risksData from "@/services/mockData/risks.json";

let risks = [...risksData];

const riskService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return risks.map(risk => ({ ...risk }));
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const risk = risks.find(r => r.Id === id);
    return risk ? { ...risk } : null;
  },

  async getByProjectId(projectId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return risks.filter(r => r.projectId === projectId).map(risk => ({ ...risk }));
  },

  async create(riskData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...risks.map(r => r.Id), 0) + 1;
    const newRisk = {
      Id: newId,
      ...riskData,
      createdAt: new Date().toISOString()
    };
    risks.push(newRisk);
    return { ...newRisk };
  },

  async update(id, riskData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = risks.findIndex(r => r.Id === id);
    if (index === -1) return null;
    
    risks[index] = {
      ...risks[index],
      ...riskData
    };
    return { ...risks[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = risks.findIndex(r => r.Id === id);
    if (index === -1) return false;
    
    risks.splice(index, 1);
    return true;
  }
};

export default riskService;