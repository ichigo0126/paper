import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Home from "./Home";
import FollowPage from "./FollowPage";
import MyLikePage from "./MyLikePage";
import { SetStateAction, useEffect, useState } from "react";
import Header from "./detail_area/Header";
import SearchModal from "./SearchModal";
import ReviewModal from "./ReviewModal";
import Comments from "./detail_area/Comments";


const Dashboard = () => {
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
        <Route path="mypage/followpage" element={<FollowPage />} />
        <Route path="mypage/mylikepage" element={<MyLikePage />} />
        <Route path="comment/:id" element={<Comments />} />
      </Routes>
    </>
  );
};

export default Dashboard;
