// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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

export const auth = getAuth(app);

async function createCollections() {
  try {
    // 1. users コレクション
    await addDoc(collection(db, 'users'), {
      username: 'sampleUser',
      email: 'sample@example.com',
      bio: 'This is a sample user',
      website_url: 'https://example.com',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });

    // 2. books コレクション
    await addDoc(collection(db, 'books'), {
      image_path: '/images/sample-book.jpg',
      title: 'Sample Book',
      author: 'John Doe',
      publication_date: serverTimestamp(),
      language: 'Japanese',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });

    // 3. articles コレクション
    await addDoc(collection(db, 'articles'), {
      image_path: '/images/sample-article.jpg',
      title: 'Sample Article',
      author: 'Jane Smith',
      publication_date: serverTimestamp(),
      language: 'English',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });

    // 4. reviews コレクション
    await addDoc(collection(db, 'reviews'), {
      user_id: 'sampleUserId',
      description: 'This is a sample review',
      stars: 4,
      target_type: 'BOOK',
      book_id: 'sampleBookId',
      engineer_skill_level: 'INTERMEDIATE',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      tags: ['sample', 'review']
    });

    // 5. comments コレクション
    await addDoc(collection(db, 'comments'), {
      user_id: 'sampleUserId',
      review_id: 'sampleReviewId',
      description: 'This is a sample comment',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });

    // 6. tags コレクション
    await addDoc(collection(db, 'tags'), {
      name: 'sample tag'
    });

    // 7. notifications コレクション
    await addDoc(collection(db, 'notifications'), {
      user_id: 'sampleUserId',
      type: 'LIKE',
      is_read: false,
      content: 'You received a new like',
      created_at: serverTimestamp(),
      review_id: 'sampleReviewId'
    });

    // 8. bookmarks コレクション
    await addDoc(collection(db, 'bookmarks'), {
      user_id: 'sampleUserId',
      target_type: 'BOOK',
      target_id: 'sampleBookId',
      created_at: serverTimestamp()
    });

    // 9. follows コレクション
    await addDoc(collection(db, 'follows'), {
      follower_user_id: 'sampleFollowerId',
      followed_user_id: 'sampleFollowedId',
      created_at: serverTimestamp()
    });

    console.log('All collections created successfully');
  } catch (error) {
    console.error('Error creating collections:', error);
  }
}

export { db, createCollections };
