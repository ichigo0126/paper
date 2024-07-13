import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import FollowPage from "./FollowPage";

const Dashboard = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/followpage" element={<FollowPage />} />
      </Routes>
    </>
  );
};
export default Dashboard;
