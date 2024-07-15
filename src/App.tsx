import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { onAuthStateChange, signInWithGoogle, createUser } from "./firebase";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { LikeProvider } from './components/LikeContext';
import { BookmarkProvider } from './components/BookmarkContext';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((currentUser: User | null) => {
      console.log("Auth state changed", currentUser);

      if (currentUser) {
        setUser(currentUser);

        if (currentUser.email) {
          try {
            createUser({
              username: currentUser.displayName || "",
              email: currentUser.email,
            })
              .then(() => {
                console.log("User document checked/initialized");
              })
              .catch((error) => {
                console.error(
                  "Error checking/initializing user document:",
                  error
                );
              });
          } catch (error) {
            console.error("Error in createUser:", error);
          }
        } else {
          console.error("User email is null");
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
    <LikeProvider>
      <BookmarkProvider>
        <div className="base-color">
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Auth onSignIn={handleSignIn} />
                )
              }
            />
            <Route path="/home/*" element={<Dashboard user={user as {email: string}}/>} />
          </Routes>
        </div>
      </BookmarkProvider>
    </LikeProvider>
  );
}

export default App;