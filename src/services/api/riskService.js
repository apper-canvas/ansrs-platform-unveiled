import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

const riskService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.fetchRecords('risk_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "severity_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "likelihood_c"}},
          {"field": {"Name": "mitigation_plan_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "project_id_c"}},
          {"field": {"Name": "owner_id_c"}},
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
      console.error("Error fetching risks:", error?.response?.data?.message || error);
      toast.error("Failed to fetch risks");
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.getRecordById('risk_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "severity_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "likelihood_c"}},
          {"field": {"Name": "mitigation_plan_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "project_id_c"}},
          {"field": {"Name": "owner_id_c"}},
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
      console.error(`Error fetching risk ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async getByProjectId(projectId) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.fetchRecords('risk_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "severity_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "likelihood_c"}},
          {"field": {"Name": "mitigation_plan_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "project_id_c"}},
          {"field": {"Name": "owner_id_c"}},
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
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching risks by project:", error?.response?.data?.message || error);
      return [];
    }
  },

  async create(riskData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      // Filter to only include Updateable fields
      const params = {
        records: [{
          Name: riskData.title_c || riskData.Name,
          title_c: riskData.title_c,
          description_c: riskData.description_c,
          severity_c: riskData.severity_c,
          status_c: riskData.status_c,
          category_c: riskData.category_c,
          likelihood_c: riskData.likelihood_c,
          mitigation_plan_c: riskData.mitigation_plan_c,
          due_date_c: riskData.due_date_c,
          project_id_c: parseInt(riskData.project_id_c),
          owner_id_c: parseInt(riskData.owner_id_c)
        }]
      };

      const response = await apperClient.createRecord('risk_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} risks: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Risk created successfully");
          return successful[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating risk:", error?.response?.data?.message || error);
      toast.error("Failed to create risk");
      return null;
    }
  },

  async update(id, riskData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      // Filter to only include Updateable fields
      const params = {
        records: [{
          Id: parseInt(id),
          title_c: riskData.title_c,
          description_c: riskData.description_c,
          severity_c: riskData.severity_c,
          status_c: riskData.status_c,
          category_c: riskData.category_c,
          likelihood_c: riskData.likelihood_c,
          mitigation_plan_c: riskData.mitigation_plan_c,
          due_date_c: riskData.due_date_c,
          project_id_c: riskData.project_id_c ? parseInt(riskData.project_id_c) : undefined,
          owner_id_c: riskData.owner_id_c ? parseInt(riskData.owner_id_c) : undefined
        }]
      };

      const response = await apperClient.updateRecord('risk_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} risks: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Risk updated successfully");
          return successful[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error updating risk:", error?.response?.data?.message || error);
      toast.error("Failed to update risk");
      return null;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.deleteRecord('risk_c', {
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
          console.error(`Failed to delete ${failed.length} risks: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Risk deleted successfully");
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting risk:", error?.response?.data?.message || error);
      toast.error("Failed to delete risk");
      return false;
    }
  }
};

export default riskService;