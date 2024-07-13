import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashbord";
import "./App.css";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="base-color">
      {user ? <Dashboard user={user} /> : <Auth />}
    </div>
  );
}

export default App;
