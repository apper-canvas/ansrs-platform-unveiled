import organizationsData from "@/services/mockData/organizations.json";

let organizations = [...organizationsData];

const organizationService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return organizations.map(org => ({ ...org }));
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const organization = organizations.find(org => org.Id === id);
    return organization ? { ...organization } : null;
  },

  async create(organizationData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...organizations.map(org => org.Id), 0) + 1;
    const newOrganization = {
      Id: newId,
      ...organizationData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    organizations.push(newOrganization);
    return { ...newOrganization };
  },

  async update(id, organizationData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = organizations.findIndex(org => org.Id === id);
    if (index === -1) return null;
    
    organizations[index] = {
      ...organizations[index],
      ...organizationData,
      updatedAt: new Date().toISOString()
    };
    return { ...organizations[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = organizations.findIndex(org => org.Id === id);
    if (index === -1) return false;
    
    organizations.splice(index, 1);
    return true;
  }
};

export default organizationService;