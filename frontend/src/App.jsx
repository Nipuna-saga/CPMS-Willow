import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectsViewPage from "./pages/ProjectsViewPage";
import "./App.css";
import HeaderComponent from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Navigate to="projects" />} />
          <Route path="projects" element={<HeaderComponent />}>
            <Route path="" element={<ProjectsPage />} />
            <Route path=":id" element={<ProjectsViewPage />} />
          </Route>
        </Route>
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
