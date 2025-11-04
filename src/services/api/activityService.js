import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

const activityService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.fetchRecords('activity_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "content_c"}},
          {"field": {"Name": "timestamp_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "project_id_c"}},
          {"field": {"Name": "user_id_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        orderBy: [{
          fieldName: "timestamp_c",
          sorttype: "DESC"
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching activities:", error?.response?.data?.message || error);
      toast.error("Failed to fetch activities");
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.getRecordById('activity_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "content_c"}},
          {"field": {"Name": "timestamp_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "project_id_c"}},
          {"field": {"Name": "user_id_c"}},
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
      console.error(`Error fetching activity ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async getByProjectId(projectId) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.fetchRecords('activity_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "content_c"}},
          {"field": {"Name": "timestamp_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "project_id_c"}},
          {"field": {"Name": "user_id_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        where: [{
          FieldName: "project_id_c",
          Operator: "EqualTo",
          Values: [parseInt(projectId)]
        }],
        orderBy: [{
          fieldName: "timestamp_c",
          sorttype: "DESC"
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching activities by project:", error?.response?.data?.message || error);
      return [];
    }
  },

  async create(activityData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      // Filter to only include Updateable fields
      const params = {
        records: [{
          Name: activityData.content_c || activityData.Name,
          content_c: activityData.content_c,
          timestamp_c: activityData.timestamp_c || new Date().toISOString(),
          type_c: activityData.type_c,
          project_id_c: parseInt(activityData.project_id_c),
          user_id_c: parseInt(activityData.user_id_c)
        }]
      };

      const response = await apperClient.createRecord('activity_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} activities: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Activity created successfully");
          return successful[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating activity:", error?.response?.data?.message || error);
      toast.error("Failed to create activity");
      return null;
    }
  },

  async update(id, activityData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      // Filter to only include Updateable fields
      const params = {
        records: [{
          Id: parseInt(id),
          content_c: activityData.content_c,
          timestamp_c: activityData.timestamp_c,
          type_c: activityData.type_c,
          project_id_c: activityData.project_id_c ? parseInt(activityData.project_id_c) : undefined,
          user_id_c: activityData.user_id_c ? parseInt(activityData.user_id_c) : undefined
        }]
      };

      const response = await apperClient.updateRecord('activity_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} activities: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Activity updated successfully");
          return successful[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error updating activity:", error?.response?.data?.message || error);
      toast.error("Failed to update activity");
      return null;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.deleteRecord('activity_c', {
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
          console.error(`Failed to delete ${failed.length} activities: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Activity deleted successfully");
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting activity:", error?.response?.data?.message || error);
      toast.error("Failed to delete activity");
      return false;
    }
  }
};

export default activityService;