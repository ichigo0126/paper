import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { onAuthStateChange, signInWithGoogle, createUser } from "./firebase";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import FollowPage from "./components/FollowPage";
import MyLikePage from "./components/MyLikePage";
import Header from "./components/detail_area/Header";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((currentUser: User | null) => {
      console.log("Auth state changed", currentUser);

      if (currentUser) {
        setUser(currentUser);

        try {
          await initializeUserCollections(
            currentUser.uid,
            currentUser.email || "",
            currentUser.displayName || ""
          );
          console.log("User collections initialized or checked");
        } catch (error) {
          console.error("Error initializing user collections:", error);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="base-color">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/mypage" replace /> : <Auth onSignIn={handleSignIn} />}
        />
        <Route path="/mypage/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
