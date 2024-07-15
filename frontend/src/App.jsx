import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import  SitesPage  from "./pages/SitesPage";
import LandingPage from "./pages/LandingPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<LandingPage />} />

          {/* <Route path="login" element={<LoginPage />} /> */}

          {/* <Route element={<RequiredAuth />}> */}
          <Route path="sites" element={<SitesPage />} />
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
