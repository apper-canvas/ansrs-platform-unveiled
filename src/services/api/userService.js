import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

const userService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.fetchRecords('user_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "role_c"}},
          {"field": {"Name": "department_id_c"}},
          {"field": {"Name": "is_external_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching users:", error?.response?.data?.message || error);
      toast.error("Failed to fetch users");
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.getRecordById('user_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "role_c"}},
          {"field": {"Name": "department_id_c"}},
          {"field": {"Name": "is_external_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async getByDepartmentId(departmentId) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.fetchRecords('user_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "role_c"}},
          {"field": {"Name": "department_id_c"}},
          {"field": {"Name": "is_external_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        where: [{
          FieldName: "department_id_c",
          Operator: "EqualTo",
          Values: [departmentId]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching users by department:", error?.response?.data?.message || error);
      return [];
    }
  },

  async create(userData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      // Filter to only include Updateable fields
      const params = {
        records: [{
          Name: userData.name_c || userData.Name,
          name_c: userData.name_c,
          email_c: userData.email_c,
          role_c: userData.role_c,
          department_id_c: userData.department_id_c,
          is_external_c: userData.is_external_c
        }]
      };

      const response = await apperClient.createRecord('user_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} users: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("User created successfully");
          return successful[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating user:", error?.response?.data?.message || error);
      toast.error("Failed to create user");
      return null;
    }
  },

  async update(id, userData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      // Filter to only include Updateable fields
      const params = {
        records: [{
          Id: parseInt(id),
          name_c: userData.name_c,
          email_c: userData.email_c,
          role_c: userData.role_c,
          department_id_c: userData.department_id_c,
          is_external_c: userData.is_external_c
        }]
      };

      const response = await apperClient.updateRecord('user_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} users: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("User updated successfully");
          return successful[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error updating user:", error?.response?.data?.message || error);
      toast.error("Failed to update user");
      return null;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.deleteRecord('user_c', {
        RecordIds: [parseInt(id)]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} users: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("User deleted successfully");
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting user:", error?.response?.data?.message || error);
      toast.error("Failed to delete user");
      return false;
    }
  }
};

export default userService;