import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';

interface UserInfo {
  id: string;
  name: string;
  username: string;
  description: string;
}

interface FollowContextType {
  followingUsers: UserInfo[];
  toggleFollow: (user: UserInfo) => void;
}

const FollowContext = createContext<FollowContextType | undefined>(undefined);

export const FollowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [followingUsers, setFollowingUsers] = useState<UserInfo[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userFollowingRef = doc(db, 'userFollowing', user.uid);
    const unsubscribe = onSnapshot(userFollowingRef, (doc) => {
      if (doc.exists()) {
        setFollowingUsers(doc.data().followingUsers || []);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleFollow = async (user: UserInfo) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const userFollowingRef = doc(db, 'userFollowing', currentUser.uid);
    const userFollowingDoc = await getDoc(userFollowingRef);

    let updatedFollowingUsers: UserInfo[];
    if (userFollowingDoc.exists()) {
      const currentFollowingUsers = userFollowingDoc.data().followingUsers || [];
      const userIndex = currentFollowingUsers.findIndex((u: UserInfo) => u.id === user.id);
      
      if (userIndex !== -1) {
        updatedFollowingUsers = [
          ...currentFollowingUsers.slice(0, userIndex),
          ...currentFollowingUsers.slice(userIndex + 1)
        ];
      } else {
        updatedFollowingUsers = [...currentFollowingUsers, user];
      }
    } else {
      updatedFollowingUsers = [user];
    }

    await setDoc(userFollowingRef, { followingUsers: updatedFollowingUsers }, { merge: true });
    setFollowingUsers(updatedFollowingUsers);
  };

  return (
    <FollowContext.Provider value={{ followingUsers, toggleFollow }}>
      {children}
    </FollowContext.Provider>
  );
};

export const useFollow = () => {
  const context = useContext(FollowContext);
  if (context === undefined) {
    throw new Error('useFollow must be used within a FollowProvider');
  }
  return context;
};