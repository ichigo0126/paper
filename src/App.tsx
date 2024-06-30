import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashbord";
import "./App.css";

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

      {user ? <Dashboard user={user} /> : <Auth />}
    </div>
  );
}

export default App;
