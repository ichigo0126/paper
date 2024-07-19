import React, { createContext, useState, useContext, useEffect } from "react";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";

export interface ReviewProps {
  id: string;
  username: string;
  description: string;
  targetType: string;
  bookId: string;
  engineerSkillLevel: string;
  valueCount: number;
  bookmarkCount: number;
  bookDetails: {
    title: string;
    thumbnail: string;
  } | null;
  createdAt: Date | { toDate: () => Date } | string;
  tags?: string[];
  photoURL?: string | null;
}

interface LikeContextType {
  likedReviews: ReviewProps[];
  toggleLike: (review: ReviewProps) => Promise<void>;
  isLiked: (reviewId: string) => boolean;
}

const LikeContext = createContext<LikeContextType | undefined>(undefined);

export const LikeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [likedReviews, setLikedReviews] = useState<ReviewProps[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.uid);
        const userLikesRef = doc(db, "userLikes", user.uid);
        const likesUnsubscribe = onSnapshot(userLikesRef, (doc) => {
          if (doc.exists()) {
            setLikedReviews(doc.data().likedReviews || []);
          } else {
            setLikedReviews([]);
          }
        });
        return () => likesUnsubscribe();
      } else {
        setCurrentUser(null);
        setLikedReviews([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleLike = async (review: ReviewProps) => {
    if (!currentUser) return;

    const userLikesRef = doc(db, "userLikes", currentUser);
    
    setLikedReviews(prevLikedReviews => {
      const isAlreadyLiked = prevLikedReviews.some(r => r.id === review.id);
      let updatedLikedReviews;
      
      if (isAlreadyLiked) {
        updatedLikedReviews = prevLikedReviews.filter(r => r.id !== review.id);
      } else {
        updatedLikedReviews = [...prevLikedReviews, review];
      }

      setDoc(userLikesRef, { likedReviews: updatedLikedReviews }, { merge: true })
        .catch(error => console.error("Error updating likes:", error));

      return updatedLikedReviews;
    });
  };

  const isLiked = (reviewId: string): boolean => {
    return likedReviews.some((review) => review.id === reviewId);
  };

  return (
    <LikeContext.Provider value={{ likedReviews, toggleLike, isLiked }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLike = () => {
  const context = useContext(LikeContext);
  if (context === undefined) {
    throw new Error("useLike must be used within a LikeProvider");
  }
  return context;
};