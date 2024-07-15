import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';

export interface ReviewProps {
  id: number;
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

interface BookmarkContextType {
  bookmarkedReviews: ReviewProps[];
  toggleBookmark: (review: ReviewProps) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookmarkedReviews, setBookmarkedReviews] = useState<ReviewProps[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userBookmarksRef = doc(db, 'userBookmarks', user.uid);
    const unsubscribe = onSnapshot(userBookmarksRef, (doc) => {
      if (doc.exists()) {
        setBookmarkedReviews(doc.data().bookmarkedReviews || []);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleBookmark = async (review: ReviewProps) => {
    const user = auth.currentUser;
    if (!user) return;
  
    const userBookmarksRef = doc(db, 'userBookmarks', user.uid);
    const userBookmarksDoc = await getDoc(userBookmarksRef);
  
    let updatedBookmarkedReviews: ReviewProps[];
    if (userBookmarksDoc.exists()) {
      const currentBookmarkedReviews = userBookmarksDoc.data().bookmarkedReviews || [];
      const reviewIndex = currentBookmarkedReviews.findIndex((r: ReviewProps) => r.id === review.id);
      
      if (reviewIndex !== -1) {
        updatedBookmarkedReviews = [
          ...currentBookmarkedReviews.slice(0, reviewIndex),
          ...currentBookmarkedReviews.slice(reviewIndex + 1)
        ];
      } else {
        updatedBookmarkedReviews = [...currentBookmarkedReviews, review];
      }
    } else {
      updatedBookmarkedReviews = [review];
    }
  
    const cleanUpdatedBookmarkedReviews = updatedBookmarkedReviews.map(review => {
      const cleanReview: Partial<ReviewProps> = {};
      
      // 必要なプロパティのみを含め、undefinedチェックを行う
      if (review.id !== undefined) cleanReview.id = review.id;
      if (review.username) cleanReview.username = review.username;
      if (review.description) cleanReview.description = review.description;
      if (review.targetType) cleanReview.targetType = review.targetType;
      if (review.bookId) cleanReview.bookId = review.bookId;
      if (review.engineerSkillLevel) cleanReview.engineerSkillLevel = review.engineerSkillLevel;
      if (review.valueCount !== undefined) cleanReview.valueCount = review.valueCount;
      if (review.bookmarkCount !== undefined) cleanReview.bookmarkCount = review.bookmarkCount;
      if (review.bookDetails) cleanReview.bookDetails = review.bookDetails;
      if (review.tags) cleanReview.tags = review.tags;
  
      // createdAtの処理
      if (review.createdAt) {
        let date: Date;
        if (typeof review.createdAt === 'object' && 'toDate' in review.createdAt) {
          date = review.createdAt.toDate();
        } else if (review.createdAt instanceof Date) {
          date = review.createdAt;
        } else if (typeof review.createdAt === 'string') {
          date = new Date(review.createdAt);
        } else {
          date = new Date();
        }
  
        if (isNaN(date.getTime())) {
          date = new Date();
        }
  
        cleanReview.createdAt = date.toISOString();
      }
  
      return cleanReview as ReviewProps;
    });
  
    await setDoc(userBookmarksRef, { bookmarkedReviews: cleanUpdatedBookmarkedReviews }, { merge: true });
    setBookmarkedReviews(updatedBookmarkedReviews);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedReviews, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmark must be used within a BookmarkProvider');
  }
  return context;
};