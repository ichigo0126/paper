import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import Home from "./Home";
// import FollowPage from "./FollowPage";
// import FollowedPage from "./FollowedPage";
import MyLikePage from "./MyLikePage";
import Header from "./detail_area/Header";
import SearchModal from "./SearchModal";
import ReviewModal from "./ReviewModal";
import ProfileSetting from "./ProfileSetting";
import BookmarkPage from "./BookmarkPage";
import OtherMypage from "./OtherMypage";
import Comments from "./Comments";
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
    searchText: string;
  }>({ tags: [], mediaType: "", difficulty: "", searchText: "" });

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

  const handleSearch = (searchText: string) => {
    setSearchParams((prev) => ({ ...prev, searchText }));
  };

  const handleAdvancedSearch = (
    tags: string[],
    mediaType: string,
    difficulty: string
  ) => {
    setSearchParams((prev) => ({ ...prev, tags, mediaType, difficulty }));
  };


  return (
    <>
      <Header
        setIsReviewOpen={setIsReviewOpen}
        setIsSearchOpen={setIsSearchOpen}
        onSearch={handleSearch}
      />
      <SearchModal
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        onSearch={handleAdvancedSearch}
      />
      <ReviewModal
        isReviewOpen={isReviewOpen}
        setIsReviewOpen={setIsReviewOpen}
        currentUser={user}
      />
      <Routes>
        <Route
          path=""
          element={
            <Home currentUserId={currentUserId} searchParams={searchParams} currentUsername={user}/>
          }
        />
        <Route
          path="mypage"
          element={<Mypage currentUserId={currentUserId} />}
        />
        <Route path="mypage/setting" element={<ProfileSetting />} />
        {/* <Route path="mypage/followpage" element={<FollowPage />} />
        <Route path="mypage/followedpage" element={<FollowedPage />} /> */}
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
