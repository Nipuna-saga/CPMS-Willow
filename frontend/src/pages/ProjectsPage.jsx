import React, { useEffect, useState } from "react";
import {
  getProjects,
  deleteProject,
  createProject,
  editProject,
} from "../services/api";
import ProjectsList from "../components/projects/ProjectsList";
import { Button } from "antd";
import ProjectForm from "../components/projects/ProjectForm";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState("list-page");

  const [selectedProject, setSelectedProject] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getProjects();

        setProjects(data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const handleOnDelete = async (id) => {
    await deleteProject(id);
    const newList = projects.filter((project) => project.id !== id);

    setProjects(newList);
  };

  const handleOnCreate = async ({ values }) => {
    const { data } = await createProject(values);
    const newList = [...projects, data];
    setProjects(newList);
    setPage("list-page");
  };

  const handleOnEdit = async ({ id, values }) => {
    await editProject(id, values);
    const index = projects.findIndex((project) => project.id !== id);
    const newList = [
      ...projects.slice(0, index),
      values,
      ...projects.slice(index + 1),
    ];
    setProjects(newList);
    setPage("list-page");
  };

  return (
    <>
      {page === "list-page" ? (
        <>
          <Button
            onClick={() => {
              setSelectedProject(null);
              setPage("create-page");
            }}
          >
            Create
          </Button>
          <ProjectsList
            data={projects}
            onDelete={handleOnDelete}
            onEdit={(id) => {
              const project = projects.find((project) => project.id === id);
              setSelectedProject(project);
              setPage("create-page");
            }}
          />
        </>
      ) : (
        <ProjectForm
          selectedProject={selectedProject}
          onCreate={handleOnCreate}
          onEdit={handleOnEdit}
        />
      )}
    </>
  );
}

export default ProjectsPage;
