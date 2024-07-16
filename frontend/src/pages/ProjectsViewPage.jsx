import React, { useEffect, useState } from "react";
import { getProject } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import SitesList from "../components/sites/SitesList";
import SitesForm from "../components/sites/SitesForm";

import { deleteSite, createSite, editSite } from "../services/api";

import { Button } from "antd";
import Map from "../components/sites/Map";

function ProjectsViewPage() {
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
  };

  return (
    <div>
      ProjectsView
      <Button onClick={() => navigate("/projects")}>Back</Button>
      {loading ? <div>Loading</div> : ""}
      <div>{currentProject?.name}</div>
      <div>{currentProject?.description}</div>
      <div>{currentProject?.phase}</div>
      {page === "list-page" ? (
        <>
          <Button
            onClick={() => {
              setSelectedSite(null);
              setPage("create-page");
            }}
          >
            Create
          </Button>
          <SitesList
            data={sites}
            onDelete={handleOnDelete}
            onEdit={(id) => {
              const site = sites.find((site) => site.id === id);
              setSelectedSite(site);
              setPage("create-page");
            }}
          />
          {loading ? "" : <Map sites={sites} project={currentProject} />}
        </>
      ) : (
        <SitesForm
          selectedSite={selectedSite}
          onCreate={handleOnCreate}
          onEdit={handleOnEdit}
        />
      )}
    </div>
  );
}

export default ProjectsViewPage;
