import projectsData from "@/services/mockData/projects.json";

let projects = [...projectsData];

const projectService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 400));
    return projects.map(project => ({ ...project }));
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const project = projects.find(p => p.Id === id);
    return project ? { ...project } : null;
  },

  async create(projectData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newId = Math.max(...projects.map(p => p.Id), 0) + 1;
    const newProject = {
      Id: newId,
      ...projectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    projects.push(newProject);
    return { ...newProject };
  },

  async update(id, projectData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = projects.findIndex(p => p.Id === id);
    if (index === -1) return null;
    
    projects[index] = {
      ...projects[index],
      ...projectData,
      updatedAt: new Date().toISOString()
    };
    return { ...projects[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = projects.findIndex(p => p.Id === id);
    if (index === -1) return false;
    
    projects.splice(index, 1);
    return true;
  },

  async getByStatus(status) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return projects.filter(p => p.status === status).map(project => ({ ...project }));
  }
};

export default projectService;