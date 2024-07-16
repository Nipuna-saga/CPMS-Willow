import axios from "axios";

const BASE_URL = "http://localhost:8000";

const getProjects = async () => {
  const response = await axios.get(`${BASE_URL}/projects/projects`);
  return response;
};

const getProject = async (id) => {
  const response = await axios.get(`${BASE_URL}/projects/projects/${id}`);
  return response;
};

const createProject = async (values) => {
  const response = await axios.post(`${BASE_URL}/projects/projects`, values);
  return response;
};

const editProject = async (id, values) => {
  const response = await axios.put(
    `${BASE_URL}/projects/projects/${id}`,
    values
  );
  return response;
};
const deleteProject = async (id) => {
  const response = await axios.delete(`${BASE_URL}/projects/projects/${id}`);
  return response;
};

const createSite = async (projectId, values) => {
  const response = await axios.post(
    `${BASE_URL}/projects/projects/${projectId}/sites`,
    values
  );
  return response;
};

const editSite = async (projectId, siteId, values) => {
  const response = await axios.put(
    `${BASE_URL}/projects/projects/${projectId}/sites/${siteId}`,
    values
  );
  return response;
};
const deleteSite = async (projectId, siteId, values) => {
  const response = await axios.delete(
    `${BASE_URL}/projects/projects/${projectId}/sites/${siteId}`
  );
  return response;
};

export {
  getProjects,
  deleteProject,
  createProject,
  editProject,
  getProject,
  createSite,
  editSite,
  deleteSite,
};
