import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import SitesPage from "./pages/SitesPage";
import LandingPage from "./pages/LandingPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectsViewPage from "./pages/ProjectsViewPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<LandingPage />} />

          {/* <Route path="login" element={<LoginPage />} /> */}

          {/* <Route element={<RequiredAuth />}> */}
          <Route path="sites" element={<SitesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<ProjectsViewPage />} />
        </Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

const Layout = () => {
  return <Outlet />;
};

const NoPage = () => {
  return <div>No Page</div>;
};

export default App;
