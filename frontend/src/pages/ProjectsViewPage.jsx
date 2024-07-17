import React, { useEffect, useState } from "react";
import { getProject } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import SitesList from "../components/sites/SitesList";
import SitesForm from "../components/sites/SitesForm";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { deleteSite, createSite, editSite } from "../services/api";

import { Button, Divider, Card, Tag } from "antd";
import Map from "../components/sites/Map";

function ProjectsViewPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProject, setCurrentProject] = useState();
  const [loading, setLoading] = useState(false);

  const [sites, setSites] = useState([]);

  const [page, setPage] = useState("list-page");

  const [selectedSite, setSelectedSite] = useState();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data } = await getProject(id);
      const { sites } = data;
      setCurrentProject(data);
      setSites(sites);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  const handleOnDelete = async (siteId) => {
    await deleteSite(id, siteId);
    const newList = sites.filter((site) => site.id !== siteId);

    setSites(newList);
  };

  const handleOnCreate = async ({ values }) => {
    const { data } = await createSite(id, values);
    const newList = [...sites, data];
    setSites(newList);
    setPage("list-page");
    setIsModalOpen(false);
  };

  const handleOnEdit = async ({ siteId, values }) => {
    await editSite(id, siteId, values);
    const index = sites.findIndex((site) => site.id === siteId);
    const newList = [
      ...sites.slice(0, index),
      { id: siteId, ...values },
      ...sites.slice(index + 1),
    ];
    setSites(newList);
    setPage("list-page");
    setIsModalOpen(false);
  };

  return (
    <div style={{textAlign:"right"}}>
      <div className="content-header-settings">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            style={{ color: "#070ba0" }}
            type="text"
            onClick={() => navigate("/projects")}
            icon={<ArrowLeftOutlined />}
          />
          <h2>&nbsp;&nbsp;Project Details</h2>
        </div>
      </div>
      <Divider orientation="left" orientationMargin="0">
        Details
      </Divider>
      <Card
        title={<h3>Title: {currentProject?.name}</h3>}
        bordered={false}
        style={{
          width: "100%",
          textAlign: "left",
        }}
      >
        <p>
          <strong>Desription: &nbsp;</strong>
          {currentProject?.description}
        </p>
        <strong>Project Status: &nbsp;</strong>
        <Tag color="#108ee9">{currentProject?.phase}</Tag>
      </Card>
      
      <Divider orientation="left" orientationMargin="0">
        Project Sites
      </Divider>
      <Button
        type="primary"
        onClick={() => {
          setSelectedSite(null);
          setPage("create-page");
          setIsModalOpen(true);
          setTitle("Create New Site");
        }}
        icon={<PlusOutlined />}
        style={{ marginBottom: "20px" }}
      >
        Create New Site
      </Button>

      <SitesList
        data={sites}
        onDelete={handleOnDelete}
        onEdit={(id) => {
          const site = sites.find((site) => site.id === id);
          setSelectedSite(site);
          setPage("create-page");
          setIsModalOpen(true);
          setTitle("Edit Site Details");
        }}
      />
      <Divider orientation="left" orientationMargin="0">
        Sites Locations
      </Divider>
      {loading ? "" : <Map sites={sites} project={currentProject} />}

      {isModalOpen ? (
        <SitesForm
          title={title}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedSite={selectedSite}
          onCreate={handleOnCreate}
          onEdit={handleOnEdit}
        />
      ) : null}
    </div>
  );
}

export default ProjectsViewPage;
