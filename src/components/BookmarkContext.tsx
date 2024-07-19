import React, { createContext, useState, useContext, useEffect } from 'react';
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
  };
  createdAt: Date | { toDate: () => Date } | string;
  tags?: string[];
}

interface Review {
  id: string;
  username: string;
  photoURL: string | null;
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
  tags: string[];
}

interface BookmarkContextType {
  bookmarkedReviews: Review[];
  toggleBookmark: (review: Review) => void;
  isBookmarked: (reviewId: number) => boolean;
}


const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmark must be used within a BookmarkProvider');
  }
  return context;
};

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarkedReviews, setBookmarkedReviews] = useState<Review[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.uid);
        const userBookmarksRef = doc(db, "userBookmarks", user.uid);
        const bookmarksUnsubscribe = onSnapshot(userBookmarksRef, (doc) => {
          if (doc.exists()) {
            setBookmarkedReviews(doc.data().bookmarkedReviews || []);
          } else {
            setBookmarkedReviews([]);
          }
        });
        return () => bookmarksUnsubscribe();
      } else {
        setCurrentUser(null);
        setBookmarkedReviews([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleBookmark = async (review: Review) => {
    if (!currentUser) return;

    const userBookmarksRef = doc(db, "userBookmarks", currentUser);
    
    setBookmarkedReviews(prevBookmarks => {
      const isAlreadyBookmarked = prevBookmarks.some(r => r.id === review.id);
      let updatedBookmarks;
      
      if (isAlreadyBookmarked) {
        updatedBookmarks = prevBookmarks.filter(r => r.id !== review.id);
      } else {
        updatedBookmarks = [...prevBookmarks, review];
      }

      setDoc(userBookmarksRef, { bookmarkedReviews: updatedBookmarks }, { merge: true })
        .catch(error => console.error("Error updating bookmarks:", error));

      return updatedBookmarks;
    });
  };

  const isBookmarked = (reviewId: string): boolean => {
    return bookmarkedReviews.some((review) => review.id === reviewId);
  };

  const value = {
    bookmarkedReviews,
    toggleBookmark,
    isBookmarked
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};