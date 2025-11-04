import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

const organizationService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.fetchRecords('organization_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "settings_c"}},
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
      console.error("Error fetching organizations:", error?.response?.data?.message || error);
      toast.error("Failed to fetch organizations");
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.getRecordById('organization_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "settings_c"}},
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
      console.error(`Error fetching organization ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async create(organizationData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      // Filter to only include Updateable fields
      const params = {
        records: [{
          Name: organizationData.name_c || organizationData.Name,
          name_c: organizationData.name_c,
          settings_c: organizationData.settings_c
        }]
      };

      const response = await apperClient.createRecord('organization_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} organizations: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Organization created successfully");
          return successful[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating organization:", error?.response?.data?.message || error);
      toast.error("Failed to create organization");
      return null;
    }
  },

  async update(id, organizationData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      // Filter to only include Updateable fields
      const params = {
        records: [{
          Id: parseInt(id),
          name_c: organizationData.name_c,
          settings_c: organizationData.settings_c
        }]
      };

      const response = await apperClient.updateRecord('organization_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} organizations: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Organization updated successfully");
          return successful[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error updating organization:", error?.response?.data?.message || error);
      toast.error("Failed to update organization");
      return null;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.deleteRecord('organization_c', {
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
          console.error(`Failed to delete ${failed.length} organizations: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Organization deleted successfully");
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting organization:", error?.response?.data?.message || error);
      toast.error("Failed to delete organization");
      return false;
    }
  }
};

export default organizationService;