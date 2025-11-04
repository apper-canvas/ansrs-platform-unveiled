import activitiesData from "@/services/mockData/activities.json";

let activities = [...activitiesData];

const activityService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return activities.map(activity => ({ ...activity }));
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const activity = activities.find(a => a.Id === id);
    return activity ? { ...activity } : null;
  },

  async getByProjectId(projectId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return activities
      .filter(a => a.projectId === projectId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .map(activity => ({ ...activity }));
  },

  async create(activityData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...activities.map(a => a.Id), 0) + 1;
    const newActivity = {
      Id: newId,
      ...activityData,
      timestamp: new Date().toISOString()
    };
    activities.push(newActivity);
    return { ...newActivity };
  },

  async update(id, activityData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = activities.findIndex(a => a.Id === id);
    if (index === -1) return null;
    
    activities[index] = {
      ...activities[index],
      ...activityData
    };
    return { ...activities[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = activities.findIndex(a => a.Id === id);
    if (index === -1) return false;
    
    activities.splice(index, 1);
    return true;
  }
};

export default activityService;