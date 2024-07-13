import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, createCollections } from "./firebase";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashbord";
import "./App.css";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed", currentUser);
      setUser(currentUser);

      // 開発環境でのみ、ユーザーが認証された後にコレクションを作成
      if (process.env.NODE_ENV === 'development' && currentUser) {
        try {
          await createCollections();
          console.log("Collections created successfully");
        } catch (error) {
          console.error("Error creating collections:", error);
        }
      }

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