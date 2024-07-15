import { Route, Routes } from "react-router-dom";
import { SetStateAction, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import Home from "./Home";
import FollowPage from "./FollowPage";
import FollowedPage from "./FollowedPage";
import MyLikePage from "./MyLikePage";
import Header from "./detail_area/Header";
import SearchModal from "./SearchModal";
import ReviewModal from "./ReviewModal";
import ProfileSetting from "./ProfileSetting";
import BookmarkPage from "./BookmarkPage";
import OtherMypage from "./OtherMypage";
import Comments from "./detail_area/Comments";
import Mypage from "./Mypage";

interface UserData {
  email: string;
}

interface DashBoardProps {
  user: User & UserData;
}

const Dashboard: React.FC<DashBoardProps> = ({ user }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<{
    tags: string[];
    mediaType: string;
    difficulty: string;
  }>({ tags: [], mediaType: "", difficulty: "" });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (tags: string[], mediaType: string, difficulty: string) => {
    setSearchParams({ tags, mediaType, difficulty });
  };

  return (
    <>
      <SearchModal
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        onSearch={handleSearch}
      />
      <ReviewModal
        isReviewOpen={isReviewOpen}
        setIsReviewOpen={setIsReviewOpen}
        currentUser={user}
      />
      <Header
        setIsReviewOpen={setIsReviewOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
      <Routes>
        <Route 
          path="" 
          element={
            <Home 
              currentUserId={currentUserId} 
              searchParams={searchParams}
            />
          } 
        />
        <Route
          path="mypage"
          element={<Mypage currentUserId={currentUserId} />}
        />
        <Route path="mypage/setting" element={<ProfileSetting />} />
        <Route path="mypage/followpage" element={<FollowPage />} />
        <Route path="mypage/followedpage" element={<FollowedPage />} />
        <Route path="mypage/bookmarkpage" element={<BookmarkPage />} />
        <Route path="mypage/mylikepage" element={<MyLikePage />} />
        <Route path="comment/:id" element={<Comments />} />
        <Route
          path=":username"
          element={<OtherMypage currentUserId={currentUserId} />}
        />
      </Routes>
    </>
  );
};

export default Dashboard;