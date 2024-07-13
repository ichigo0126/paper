import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import FollowPage from "./FollowPage";
import MyLikePage from "./MyLikePage";
import { SetStateAction, useEffect, useState } from "react";
import Header from "./detail_area/Header";
import SearchModal from "./SearchModal";
import ReviewModal from "./ReviewModal";

 
interface DashBoardProps {
  user: {
    email: string;
  }
}

const Dashboard: React.FC<DashBoardProps> = ({ user }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <SearchModal
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
      <ReviewModal
        isReviewOpen={isReviewOpen}
        setIsReviewOpen={setIsReviewOpen}
      />
      <Header
        setIsReviewOpen={setIsReviewOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="followpage" element={<FollowPage />} />
        <Route path="mylikepage" element={<MyLikePage />} />
      </Routes>
    </>
  );
};
export default Dashboard;
