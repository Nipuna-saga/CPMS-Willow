import { useNavigate } from "react-router-dom";
import { Button } from "antd";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="container m-auto flex flex-col items-center justify-center">
      <Button type="primary" onClick={() => navigate("/projects")}>Login</Button>
    </div>
  );
}

export default LandingPage;
