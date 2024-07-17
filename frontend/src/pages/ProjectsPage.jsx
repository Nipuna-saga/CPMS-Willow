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
import { PlusOutlined } from "@ant-design/icons";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
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
    setIsModalOpen(false);
  };

  const handleOnEdit = async ({ id, values }) => {
    await editProject(id, values);
    const index = projects.findIndex((project) => project.id === id);
    const newList = [
      ...projects.slice(0, index),
      values,
      ...projects.slice(index + 1),
    ];
    setProjects(newList);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="content-header-settings">
        <h2>Projects</h2>
        <Button
          type="primary"
          onClick={() => {
            setSelectedProject(null);
            setIsModalOpen(true);
            setTitle("Create New Project");
          }}
          icon={<PlusOutlined />}
        >
          Create New Project
        </Button>
      </div>

      <ProjectsList
        data={projects}
        onDelete={handleOnDelete}
        onEdit={(id) => {
          const project = projects.find((project) => project.id === id);
          setSelectedProject(project);
          setIsModalOpen(true);
          setTitle("Edit Project Details");
        }}
      />
      {isModalOpen ? (
        <ProjectForm
          title={title}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          selectedProject={selectedProject}
          onCreate={handleOnCreate}
          onEdit={handleOnEdit}
        />
      ) : null}
    </>
  );
}

export default ProjectsPage;
