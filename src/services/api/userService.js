import usersData from "@/services/mockData/users.json";

let users = [...usersData];

const userService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return users.map(user => ({ ...user }));
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const user = users.find(u => u.Id === id);
    return user ? { ...user } : null;
  },

  async getByDepartmentId(departmentId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return users.filter(u => u.departmentId === departmentId).map(user => ({ ...user }));
  },

  async create(userData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...users.map(u => u.Id), 0) + 1;
    const newUser = {
      Id: newId,
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    users.push(newUser);
    return { ...newUser };
  },

  async update(id, userData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = users.findIndex(u => u.Id === id);
    if (index === -1) return null;
    
    users[index] = {
      ...users[index],
      ...userData,
      updatedAt: new Date().toISOString()
    };
    return { ...users[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = users.findIndex(u => u.Id === id);
    if (index === -1) return false;
    
    users.splice(index, 1);
    return true;
  }
};

export default userService;