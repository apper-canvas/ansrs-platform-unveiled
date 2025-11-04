import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

const projectService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.fetchRecords('project_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "start_date_c"}},
          {"field": {"Name": "end_date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "milestones_c"}},
          {"field": {"Name": "team_ids_c"}},
          {"field": {"Name": "objectives_c"}},
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
      console.error("Error fetching projects:", error?.response?.data?.message || error);
      toast.error("Failed to fetch projects");
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.getRecordById('project_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "start_date_c"}},
          {"field": {"Name": "end_date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "milestones_c"}},
          {"field": {"Name": "team_ids_c"}},
          {"field": {"Name": "objectives_c"}},
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
      console.error(`Error fetching project ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async create(projectData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      // Filter to only include Updateable fields
      const params = {
        records: [{
          Name: projectData.name_c || projectData.Name,
          name_c: projectData.name_c,
          description_c: projectData.description_c,
          start_date_c: projectData.start_date_c,
          end_date_c: projectData.end_date_c,
          status_c: projectData.status_c,
          milestones_c: projectData.milestones_c,
          team_ids_c: projectData.team_ids_c,
          objectives_c: projectData.objectives_c,
          owner_id_c: parseInt(projectData.owner_id_c)
        }]
      };

      const response = await apperClient.createRecord('project_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} projects: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Project created successfully");
          return successful[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating project:", error?.response?.data?.message || error);
      toast.error("Failed to create project");
      return null;
    }
  },

  async update(id, projectData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      // Filter to only include Updateable fields
      const params = {
        records: [{
          Id: parseInt(id),
          name_c: projectData.name_c,
          description_c: projectData.description_c,
          start_date_c: projectData.start_date_c,
          end_date_c: projectData.end_date_c,
          status_c: projectData.status_c,
          milestones_c: projectData.milestones_c,
          team_ids_c: projectData.team_ids_c,
          objectives_c: projectData.objectives_c,
          owner_id_c: projectData.owner_id_c ? parseInt(projectData.owner_id_c) : undefined
        }]
      };

      const response = await apperClient.updateRecord('project_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} projects: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Project updated successfully");
          return successful[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error updating project:", error?.response?.data?.message || error);
      toast.error("Failed to update project");
      return null;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.deleteRecord('project_c', {
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
          console.error(`Failed to delete ${failed.length} projects: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Project deleted successfully");
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting project:", error?.response?.data?.message || error);
      toast.error("Failed to delete project");
      return false;
    }
  },

  async getByStatus(status) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error("ApperClient not available");
      
      const response = await apperClient.fetchRecords('project_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "start_date_c"}},
          {"field": {"Name": "end_date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "milestones_c"}},
          {"field": {"Name": "team_ids_c"}},
          {"field": {"Name": "objectives_c"}},
          {"field": {"Name": "owner_id_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        where: [{
          FieldName: "status_c",
          Operator: "EqualTo",
          Values: [status]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching projects by status:", error?.response?.data?.message || error);
      return [];
    }
  }
};

export default projectService;