import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashbord";
import "./App.css";
import { Text } from "@chakra-ui/react";
import FollowPage from "./components/FollowPage";
import {Route, Routes} from 'react-router-dom'

function App() {
  const [user, setUser] = useState(null);

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
      </Routes>
      {user ? <Dashboard user={user} /> : <Auth />}
    </div>
  );
}

export default App;
