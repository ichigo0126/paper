import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

// Firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyBlQIVuvA8BSPcj0mB41_1TzyYYIcGJvw0",
  authDomain: "paper-427816.firebaseapp.com",
  projectId: "paper-427816",
  storageBucket: "paper-427816.appspot.com",
  messagingSenderId: "666039039325",
  appId: "1:666039039325:web:8caf04db30eb33026ba4b4",
  measurementId: "G-EJHXWPHXHV"
};

// Firebaseアプリの初期化
const app = initializeApp(firebaseConfig);

// Firestoreの取得
const db = getFirestore(app);

// 認証の取得
const auth = getAuth(app);

// Google認証プロバイダーの作成
const googleProvider = new GoogleAuthProvider();

async function initializeUserCollections(userId, userEmail, displayName) {
  const userRef = doc(db, 'users', userId);
  
  try {
    // ユーザードキュメントの存在確認
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      // ユーザーが存在しない場合、新規作成
      await setDoc(userRef, {
        username: displayName || userEmail.split('@')[0],
        email: userEmail,
        bio: '',
        website_url: '',
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      });

      // ユーザー固有のサブコレクションを作成
      const collections = ['books', 'articles', 'reviews', 'comments', 'bookmarks', 'notifications'];
      for (const collectionName of collections) {
        const collectionRef = doc(db, `users/${userId}/${collectionName}`, 'initial');
        await setDoc(collectionRef, {
          created_at: serverTimestamp(),
          // 各コレクションに応じた初期データをここに追加
        });
      }

      console.log('User collections initialized successfully');
    } else {
      console.log('User already exists, skipping collection initialization');
    }
  } catch (error) {
    console.error('Error initializing user collections:', error);
  }
}

// Google認証でサインイン
async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    await initializeUserCollections(user.uid, user.email, user.displayName);
    console.log("User signed in with Google and collections checked/initialized");
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
}

// 認証状態の監視
function onAuthStateChange(callback) {
  return onAuthStateChanged(auth, callback);
}

export { db, auth, signInWithGoogle, onAuthStateChange,initializeUserCollections };