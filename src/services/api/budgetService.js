import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

const budgetService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.fetchRecords('budget_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "allocated_c"}},
          {"field": {"Name": "spent_c"}},
          {"field": {"Name": "currency_c"}},
          {"field": {"Name": "last_updated_c"}},
          {"field": {"Name": "project_id_c"}},
          {"field": {"Name": "categories_c"}},
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
      console.error("Error fetching budgets:", error?.response?.data?.message || error);
      toast.error("Failed to fetch budgets");
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.getRecordById('budget_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "allocated_c"}},
          {"field": {"Name": "spent_c"}},
          {"field": {"Name": "currency_c"}},
          {"field": {"Name": "last_updated_c"}},
          {"field": {"Name": "project_id_c"}},
          {"field": {"Name": "categories_c"}},
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
      console.error(`Error fetching budget ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async getByProjectId(projectId) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.fetchRecords('budget_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "allocated_c"}},
          {"field": {"Name": "spent_c"}},
          {"field": {"Name": "currency_c"}},
          {"field": {"Name": "last_updated_c"}},
          {"field": {"Name": "project_id_c"}},
          {"field": {"Name": "categories_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        where: [{
          FieldName: "project_id_c",
          Operator: "EqualTo",
          Values: [parseInt(projectId)]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data && response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
      console.error("Error fetching budget by project:", error?.response?.data?.message || error);
      return null;
    }
  },

  async create(budgetData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      // Filter to only include Updateable fields
      const params = {
        records: [{
          Name: budgetData.Name,
          allocated_c: budgetData.allocated_c,
          spent_c: budgetData.spent_c,
          currency_c: budgetData.currency_c,
          last_updated_c: budgetData.last_updated_c || new Date().toISOString(),
          project_id_c: parseInt(budgetData.project_id_c),
          categories_c: budgetData.categories_c
        }]
      };

      const response = await apperClient.createRecord('budget_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} budgets: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Budget created successfully");
          return successful[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating budget:", error?.response?.data?.message || error);
      toast.error("Failed to create budget");
      return null;
    }
  },

  async update(id, budgetData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      // Filter to only include Updateable fields
      const params = {
        records: [{
          Id: parseInt(id),
          allocated_c: budgetData.allocated_c,
          spent_c: budgetData.spent_c,
          currency_c: budgetData.currency_c,
          last_updated_c: budgetData.last_updated_c || new Date().toISOString(),
          project_id_c: budgetData.project_id_c ? parseInt(budgetData.project_id_c) : undefined,
          categories_c: budgetData.categories_c
        }]
      };

      const response = await apperClient.updateRecord('budget_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} budgets: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Budget updated successfully");
          return successful[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error updating budget:", error?.response?.data?.message || error);
      toast.error("Failed to update budget");
      return null;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.deleteRecord('budget_c', {
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
          console.error(`Failed to delete ${failed.length} budgets: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Budget deleted successfully");
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting budget:", error?.response?.data?.message || error);
      toast.error("Failed to delete budget");
      return false;
    }
  }
};

export default budgetService;
