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
  } | null;
  createdAt: Date | { toDate: () => Date } | string;
  tags?: string[];
  photoURL?: string | null;  // この行を追加
}

interface LikeContextType {
  likedReviews: ReviewProps[];
  toggleLike: (review: ReviewProps) => void;
}

const LikeContext = createContext<LikeContextType | undefined>(undefined);

export const LikeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [likedReviews, setLikedReviews] = useState<ReviewProps[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userLikesRef = doc(db, 'userLikes', user.uid);
    const unsubscribe = onSnapshot(userLikesRef, (doc) => {
      if (doc.exists()) {
        setLikedReviews(doc.data().likedReviews || []);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleLike = async (review: ReviewProps) => {
    const user = auth.currentUser;
    if (!user) return;
  
    const userLikesRef = doc(db, 'userLikes', user.uid);
    const userLikesDoc = await getDoc(userLikesRef);
  
    let updatedLikedReviews: ReviewProps[];
    if (userLikesDoc.exists()) {
      const currentLikedReviews = userLikesDoc.data().likedReviews || [];
      const reviewIndex = currentLikedReviews.findIndex((r: ReviewProps) => r.id === review.id);
      
      if (reviewIndex !== -1) {
        updatedLikedReviews = [
          ...currentLikedReviews.slice(0, reviewIndex),
          ...currentLikedReviews.slice(reviewIndex + 1)
        ];
      } else {
        updatedLikedReviews = [...currentLikedReviews, review];
      }
    } else {
      updatedLikedReviews = [review];
    }
  
    const cleanUpdatedLikedReviews = updatedLikedReviews.map(review => {
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
  
    await setDoc(userLikesRef, { likedReviews: cleanUpdatedLikedReviews }, { merge: true });
    setLikedReviews(updatedLikedReviews);
  };

  return (
    <LikeContext.Provider value={{ likedReviews, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLike = () => {
  const context = useContext(LikeContext);
  if (context === undefined) {
    throw new Error('useLike must be used within a LikeProvider');
  }
  return context;
};