import React, { useEffect } from "react";
import { getProject } from "../services/api";
import { useParams } from "react-router-dom";

function ProjectsViewPage() {
  let { id } = useParams();

  useEffect(async () => {
    await getProject(id);
  }, []);
  return <div>ProjectsView</div>;
}

export default ProjectsViewPage;
