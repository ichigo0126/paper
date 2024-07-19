import React, { createContext, useState, useContext, useCallback } from 'react';

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

  const toggleBookmark = useCallback((review: Review) => {
    setBookmarkedReviews((prevBookmarks) => {
      const isAlreadyBookmarked = prevBookmarks.some((r) => r.id === review.id);
      if (isAlreadyBookmarked) {
        return prevBookmarks.filter((r) => r.id !== review.id);
      } else {
        return [...prevBookmarks, review];
      }
    });
  }, []);

  const isBookmarked = useCallback((reviewId: string) => {
    return bookmarkedReviews.some((review) => review.id === reviewId);
  }, [bookmarkedReviews]);

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
