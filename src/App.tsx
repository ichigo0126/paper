import React, { useEffect, useState } from "react";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashborad";
import "./App.css";
import FollowPage from "./components/FollowPage";
import MyLikePage from "./components/MyLikePage";
import { Route, Routes } from "react-router-dom";
import { supabase } from "./supabase";
import Comments from "./components/detail_area/Comments";
import Header from "./components/detail_area/Header";
import ReviewModal from "./components/ReviewModal";
import SearchModal from "./components/SearchModal";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="base-color">
      {user ? <Header setIsReviewOpen={setIsReviewOpen} setIsSearchOpen={setIsSearchOpen} /> : <></>}

      <ReviewModal isReviewOpen={isReviewOpen} setIsReviewOpen={setIsReviewOpen} />
      <SearchModal isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      <Routes>
        <Route path="/Mypage/FollowPage" element={<FollowPage />} />
        <Route path="/Mypage/MyLikePage" element={<MyLikePage />} />
        <Route path="/" element={user ? <Dashboard user={user} /> : <Auth />} />
        <Route path="/review/:id" element={<Comments />} />
      </Routes>
    </div>
  );
};

export default App;
