import React, { useEffect, useState } from "react";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashborad";
import "./App.css";
import FollowPage from "./components/FollowPage";
import { Route, Routes } from "react-router-dom";
import { supabase } from "./supabase";
import Comments from "./components/detail_area/Comments";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

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
      <Routes>
        <Route path="/FollowPage" element={<FollowPage />} />
        <Route path="/" element={user ? <Dashboard user={user} /> : <Auth />} />
        <Route path="/review/:id" element={<Comments />} />
      </Routes>
    </div>
  );
};

export default App;
