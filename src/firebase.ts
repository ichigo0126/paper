  import { initializeApp } from "firebase/app";
  import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
  import { collectionGroup, getFirestore  } from 'firebase/firestore';

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
  import {
    Timestamp,
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
  } from "firebase/firestore";
  // User

  /**
   * 新しいユーザーを作成する
   * @param userData - 新しいユーザーのユーザー名、メールアドレス、自己紹介、ウェブサイトURLを含むオブジェクト
   * @returns 新しく作成されたユーザーのID
   */
  export const createUser = async (userData: {
    username: string;
    email: string;
    bio?: string;
    websiteUrl?: string;
  }) => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      console.error("No authenticated user found");
      return null;
    }
  
    // ユーザーのuidを使用してドキュメント参照を作成
    const userDocRef = doc(db, "users", user.uid);
  
    // ドキュメントが既に存在するかチェック
    const userDocSnap = await getDoc(userDocRef);
  
    if (!userDocSnap.exists()) {
      // ドキュメントが存在しない場合、新しく作成
      await setDoc(userDocRef, {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log("New user document created with ID:", user.uid);
    } else {
      // ドキュメントが既に存在する場合、更新
      await setDoc(userDocRef, {
        ...userData,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      console.log("Existing user document updated with ID:", user.uid);
    }
  
    // ユーザーのuidを返す
    return user.uid;
  };
  
  /**
   * IDでユーザーを取得する
   * @param userId - 取得するユーザーのID
   * @returns ユーザーデータを含むオブジェクト、ユーザーが存在しない場合はnull
   */
  export const getUserById = async (userId: string) => {
    console.log("Fetching user with ID:", userId);
    // `users`コレクション内の特定のユーザーのドキュメントへの参照を取得します。
    const userDocRef = doc(db, "users", userId);

    // ドキュメントのスナップショットを取得します。
    // スナップショットは、特定の時点におけるドキュメントのデータの状態を表します。
    const userDocSnap = await getDoc(userDocRef);

    // ドキュメントが存在するかどうかを確認します。
    if (userDocSnap.exists()) {
      // ドキュメントが存在する場合は、ドキュメントのデータを取得して返します。
      return { id: userDocSnap.id, ...userDocSnap.data() };
    } else {
      // ドキュメントが存在しない場合は、nullを返します。
      return null;
    }
  };

  /**
   * ユーザー名でユーザーを検索する
   * @param username - 検索するユーザーのユーザー名
   * @returns ユーザーデータを含むオブジェクト、ユーザーが存在しない場合はnull
   */
  export const getUserByUsername = async (username: string) => {
    // 'users'コレクションへの参照を取得します。
    const usersRef = collection(db, "users");

    // ユーザー名でユーザーを検索するクエリを作成します。
    // where("username", "==", username) は、
    // "username"フィールドが指定されたusernameと等しいドキュメントのみを
    // 取得する条件を指定します。
    // limit(1) は、取得するドキュメントの数を1に制限します。
    const q = query(usersRef, where("username", "==", username), limit(1));

    // クエリを実行し、結果のスナップショットを取得します。
    const userQuerySnapshot = await getDocs(q);

    // 結果が空でないかどうかを確認します。
    if (!userQuerySnapshot.empty) {
      // 結果が空でない場合は、最初のドキュメントのデータを取得して返します。
      return userQuerySnapshot.docs[0].data();
    } else {
      // 結果が空の場合は、nullを返します。
      return null;
    }
  };

  /**
   * メールアドレスでユーザーを検索する
   * @param email - 検索するユーザーのメールアドレス
   * @returns ユーザーデータを含むオブジェクト、ユーザーが存在しない場合はnull
   */
  export const getUserByEmail = async (email: string) => {
    // 'users'コレクションへの参照を取得します。
    const usersRef = collection(db, "users");

    // メールアドレスでユーザーを検索するクエリを作成します。
    // where("email", "==", email) は、
    // "email"フィールドが指定されたemailと等しいドキュメントのみを
    // 取得する条件を指定します。
    // limit(1) は、取得するドキュメントの数を1に制限します。
    const q = query(usersRef, where("email", "==", email), limit(1));

    // クエリを実行し、結果のスナップショットを取得します。
    const userQuerySnapshot = await getDocs(q);

    // 結果が空でないかどうかを確認します。
    if (!userQuerySnapshot.empty) {
      // 結果が空でない場合は、最初のドキュメントのデータを取得して返します。
      return userQuerySnapshot.docs[0].data();
    } else {
      // 結果が空の場合は、nullを返します。
      return null;
    }
  };

  /**
   * 特定のユーザーのフォロワーを取得する
   * @param userId - フォロワーを取得したいユーザーのID
   * @returns フォロワーのユーザーIDのリスト
   */
  // export const getUserFollowers = async (userId: string) => {
  //   // 'userFollowers'コレクション内の、
  //   // 特定のユーザーのフォロワーを格納するサブコレクションへの参照を取得します。
  //   const followersRef = collection(db, "userFollowers", userId, "followers");

  //   // サブコレクション内のすべてのドキュメントのスナップショットを取得します。
  //   const followersSnapshot = await getDocs(followersRef);

  //   // 各ドキュメントからフォロワーのユーザーIDを抽出し、リストとして返します。
  //   return followersSnapshot.docs.map((doc) => doc.data());
  // };

  /**
   * 特定のユーザーがフォローしているユーザーを取得する
   * @param userId - フォローしているユーザーを取得したいユーザーのID
   * @returns フォローしているユーザーのユーザーIDのリスト
   */
  export const getUserFollowing = async (userId: string) => {
    // 'userFollows'コレクション内の、
    // 特定のユーザーがフォローしているユーザーを格納する
    // サブコレクションへの参照を取得します。
    const followingRef = collection(db, "userFollows", userId, "following");

    // サブコレクション内のすべてのドキュメントのスナップショットを取得します。
    const followingSnapshot = await getDocs(followingRef);

    // 各ドキュメントからフォローしているユーザーのユーザーIDを抽出し、リストとして返します。
    return followingSnapshot.docs.map((doc) => doc.data());
  };

  /**
   * 特定のユーザーが投稿したレビューを取得する
   * @param userId - レビューを取得したいユーザーのID
   * @returns レビューデータを含むオブジェクトのリスト
   */
  export const getUserReviews = async (userId: string) => {
    // 'reviews'コレクションへの参照を取得します。
    const reviewsRef = collection(db, "reviews");

    // ユーザーIDでレビューを検索するクエリを作成します。
    const q = query(reviewsRef, where("userId", "==", userId));

    // クエリを実行し、結果のスナップショットを取得します。
    const reviewQuerySnapshot = await getDocs(q);

    // 各ドキュメントからレビューデータを抽出し、リストとして返します。
    return reviewQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * 特定のユーザーがいいねしたレビューとコメントを取得する
   * @param userId - いいねを取得したいユーザーのID
   * @returns いいねデータを含むオブジェクトのリスト
   */
  export const getUserLikedReviewsAndComments = async (userId: string) => {
    // 'likes'コレクションへの参照を取得します。
    const likesRef = collection(db, "likes");

    // ユーザーIDでいいねを検索するクエリを作成します。
    const q = query(likesRef, where("userId", "==", userId));

    // クエリを実行し、結果のスナップショットを取得します。
    const likesQuerySnapshot = await getDocs(q);

    // 各ドキュメントからいいねデータを抽出し、リストとして返します。
    return likesQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * 特定のユーザーが投稿したコメントを取得する
   * @param userId - コメントを取得したいユーザーのID
   * @returns コメントデータを含むオブジェクトのリスト
   */
  export const getUserComments = async (userId: string) => {
    // 'comments'コレクションへの参照を取得します。
    const commentsRef = collection(db, "comments");

    // ユーザーIDでコメントを検索するクエリを作成します。
    const q = query(commentsRef, where("userId", "==", userId));

    // クエリを実行し、結果のスナップショットを取得します。
    const commentQuerySnapshot = await getDocs(q);

    // 各ドキュメントからコメントデータを抽出し、リストとして返します。
    return commentQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * 特定のユーザーへの通知を取得する
   * @param userId - 通知を取得したいユーザーのID
   * @returns 通知データを含むオブジェクトのリスト
   */
  export const getUserNotifications = async (userId: string) => {
    // 'notifications'コレクションへの参照を取得します。
    const notificationsRef = collection(db, "notifications");

    // ユーザーIDで通知を検索し、
    // 作成日時で降順にソートするクエリを作成します。
    const q = query(
      notificationsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    // クエリを実行し、結果のスナップショットを取得します。
    const notificationQuerySnapshot = await getDocs(q);

    // 各ドキュメントから通知データを抽出し、リストとして返します。
    return notificationQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * 特定のユーザーがブックマークした書籍を取得する
   * @param userId - ブックマークを取得したいユーザーのID
   * @returns ブックマークデータを含むオブジェクトのリスト
   */
  export const getUserBookmarkedBooks = async (userId: string) => {
    // 'userBookmarks'コレクション内の、
    // 特定のユーザーのブックマークを格納するサブコレクションへの参照を取得します。
    const bookmarksRef = collection(db, "userBookmarks", userId, "bookmarks");

    // サブコレクション内のすべてのドキュメントのスナップショットを取得します。
    const bookmarksSnapshot = await getDocs(bookmarksRef);

    // 各ドキュメントからブックマークデータを抽出し、リストとして返します。
    return bookmarksSnapshot.docs.map((doc) => doc.data());
  };

  /**
   * 特定のユーザーがブックマークした記事を取得する
   * @param userId - ブックマークを取得したいユーザーのID
   * @returns ブックマークデータを含むオブジェクトのリスト
   */
  export const getUserBookmarkedArticles = async (userId: string) => {
    // 'userBookmarks'コレクション内の、
    // 特定のユーザーのブックマークを格納するサブコレクションへの参照を取得します。
    const bookmarksRef = collection(db, "userBookmarks", userId, "bookmarks");

    // サブコレクション内のすべてのドキュメントのスナップショットを取得します。
    const bookmarksSnapshot = await getDocs(bookmarksRef);

    // 各ドキュメントからブックマークデータを抽出し、リストとして返します。
    return bookmarksSnapshot.docs.map((doc) => doc.data());
  };

  /**
   * ユーザー情報を更新する
   * @param userId - 更新するユーザーのID
   * @param userData - 更新するユーザー名、メールアドレス、自己紹介、ウェブサイトURLを含むオブジェクト
   */
  export const updateUser = async (
    userId: string,
    userData: {
      username?: string;
      email?: string;
      bio?: string;
      websiteUrl?: string;
    }
  ) => {
    // 'users'コレクション内の特定のユーザーのドキュメントへの参照を取得します。
    const userDocRef = doc(db, "users", userId);

    // ドキュメントを更新します。
    // serverTimestamp()は、Firestoreサーバーのタイムスタンプを使用して、
    // データの更新日時を自動的に設定します。
    await updateDoc(userDocRef, {
      ...userData,
      updatedAt: serverTimestamp(),
    });
  };

  /**
   * ユーザーを削除する
   * @param userId - 削除するユーザーのID
   */
  export const deleteUser = async (userId: string) => {
    // 'users'コレクション内の特定のユーザーのドキュメントへの参照を取得します。
    const userDocRef = doc(db, "users", userId);

    // ドキュメントを削除します。
    await deleteDoc(userDocRef);
  };

  // Book

  /**
   * 新しい書籍を作成する
   * @param bookData - 新しい書籍の画像パス、タイトル、著者、出版日、言語を含むオブジェクト
   * @returns 新しく作成された書籍のID
   */
  export const createBook = async (bookData: {
    imagePath: string;
    title: string;
    author: string;
    publicationDate: Timestamp;
    language: string;
  }) => {
    // 'books'コレクションへの参照を取得します。
    const booksRef = collection(db, "books");

    // 新しい書籍データを使用して新しいドキュメントを`books`コレクションに追加します。
    // serverTimestamp()は、Firestoreサーバーのタイムスタンプを使用して、
    // データの作成日時と更新日時を自動的に設定します。
    const newBookDoc = await addDoc(booksRef, {
      ...bookData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // 新しく作成された書籍のIDを返します。
    return newBookDoc.id;
  };

  /**
   * IDで書籍を取得する
   * @param bookId - 取得する書籍のID
   * @returns 書籍データを含むオブジェクト、書籍が存在しない場合はnull
   */
  export const getBookById = async (bookId: string) => {
    // `books`コレクション内の特定の書籍のドキュメントへの参照を取得します。
    const bookDocRef = doc(db, "books", bookId);

    // ドキュメントのスナップショットを取得します。
    const bookDocSnap = await getDoc(bookDocRef);

    // ドキュメントが存在するかどうかを確認します。
    if (bookDocSnap.exists()) {
      // ドキュメントが存在する場合は、ドキュメントのデータを取得して返します。
      return bookDocSnap.data();
    } else {
      // ドキュメントが存在しない場合は、nullを返します。
      return null;
    }
  };

  /**
   * タイトルで書籍を検索する
   * @param title - 検索する書籍のタイトル
   * @returns 書籍データを含むオブジェクトのリスト
   */
  export const searchBooksByTitle = async (title: string) => {
    // 'books'コレクションへの参照を取得します。
    const booksRef = collection(db, "books");

    // タイトルで書籍を検索するクエリを作成します。
    const q = query(booksRef, where("title", "==", title));

    // クエリを実行し、結果のスナップショットを取得します。
    const bookQuerySnapshot = await getDocs(q);

    // 各ドキュメントから書籍データを抽出し、リストとして返します。
    return bookQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * 著者で書籍を検索する
   * @param author - 検索する書籍の著者
   * @returns 書籍データを含むオブジェクトのリスト
   */
  export const searchBooksByAuthor = async (author: string) => {
    // 'books'コレクションへの参照を取得します。
    const booksRef = collection(db, "books");

    // 著者で書籍を検索するクエリを作成します。
    const q = query(booksRef, where("author", "==", author));

    // クエリを実行し、結果のスナップショットを取得します。
    const bookQuerySnapshot = await getDocs(q);

    // 各ドキュメントから書籍データを抽出し、リストとして返します。
    return bookQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * 特定の書籍に対するレビューを取得する
   * @param bookId - レビューを取得したい書籍のID
   * @returns レビューデータを含むオブジェクトのリスト
   */
  export const getReviewsForBook = async (bookId: string) => {
    // 'reviews'コレクションへの参照を取得します。
    const reviewsRef = collection(db, "reviews");

    // 書籍IDでレビューを検索するクエリを作成します。
    const q = query(reviewsRef, where("bookId", "==", bookId));

    // クエリを実行し、結果のスナップショットを取得します。
    const reviewQuerySnapshot = await getDocs(q);

    // 各ドキュメントからレビューデータを抽出し、リストとして返します。
    return reviewQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * 特定の書籍をブックマークしたユーザーを取得する
   * @param bookId - ブックマークしたユーザーを取得したい書籍のID
   * @returns ユーザーデータを含むオブジェクトのリスト
   */
  export const getUsersWhoBookmarkedBook = async (bookId: string) => {
    // 'bookmarks'コレクショングループへの参照を取得します。
    // コレクショングループを使用すると、
    // 複数のドキュメントにわたってサブコレクションをクエリできます。
    const userBookmarksRef = collectionGroup(db, "bookmarks");

    // 書籍IDでブックマークを検索するクエリを作成します。
    const q = query(userBookmarksRef, where("bookId", "==", bookId));

    // クエリを実行し、結果のスナップショットを取得します。
    const userBookmarksQuerySnapshot = await getDocs(q);

    // 各ドキュメントからユーザーデータを抽出し、リストとして返します。
    return userBookmarksQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * 書籍情報を更新する
   * @param bookId - 更新する書籍のID
   * @param bookData - 更新する書籍の画像パス、タイトル、著者、出版日、言語を含むオブジェクト
   */
  export const updateBook = async (
    bookId: string,
    bookData: {
      imagePath?: string;
      title?: string;
      author?: string;
      publicationDate?: Timestamp;
      language?: string;
    }
  ) => {
    // 'books'コレクション内の特定の書籍のドキュメントへの参照を取得します。
    const bookDocRef = doc(db, "books", bookId);

    // ドキュメントを更新します。
    // serverTimestamp()は、Firestoreサーバーのタイムスタンプを使用して、
    // データの更新日時を自動的に設定します。
    await updateDoc(bookDocRef, {
      ...bookData,
      updatedAt: serverTimestamp(),
    });
  };

  /**
   * 書籍を削除する
   * @param bookId - 削除する書籍のID
   */
  export const deleteBook = async (bookId: string) => {
    // 'books'コレクション内の特定の書籍のドキュメントへの参照を取得します。
    const bookDocRef = doc(db, "books", bookId);

    // ドキュメントを削除します。
    await deleteDoc(bookDocRef);
  };

  // Article
  // ... (Bookとほぼ同じなので省略)

  // Review

  /**
   * 新しいレビューを作成する
   * @param reviewData - 新しいレビューのユーザーID、説明、星の数、対象のタイプ、書籍ID / 記事ID、エンジニアスキルレベル、タグを含むオブジェクト
   * @returns 新しく作成されたレビューのID
   */
  export const createReview = async (reviewData: {
    userId: string;
    description: string;
    targetType: "BOOK" | "ARTICLE";
    bookId?: string;
    articleId?: string;
    engineerSkillLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    tags: string[];
  }) => {
    // 'reviews'コレクションへの参照を取得します。
    const reviewsRef = collection(db, "reviews");

    // 新しいレビューデータを使用して新しいドキュメントを`reviews`コレクションに追加します。
    // serverTimestamp()は、Firestoreサーバーのタイムスタンプを使用して、
    // データの作成日時と更新日時を自動的に設定します。
    const newReviewDoc = await addDoc(reviewsRef, {
      ...reviewData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // 新しく作成されたレビューのIDを返します。
    return newReviewDoc.id;
  };

  /**
 * すべてのレビューを取得する
 * @returns レビューデータを含むオブジェクトのリスト
 */
export const getReviews = async () => {
  // 'reviews'コレクションへの参照を取得します。
  const reviewsRef = collection(db, "reviews");

  // コレクション内のすべてのドキュメントのスナップショットを取得します。
  const reviewsSnapshot = await getDocs(reviewsRef);

  // 各ドキュメントからレビューデータを抽出し、リストとして返します。
  return reviewsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

  /**
   * IDでレビューを取得する
   * @param reviewId - 取得するレビューのID
   * @returns レビューデータを含むオブジェクト、レビューが存在しない場合はnull
   */
  export const getReviewById = async (reviewId: string) => {
    // `reviews`コレクション内の特定のレビューのドキュメントへの参照を取得します。
    const reviewDocRef = doc(db, "reviews", reviewId);

    // ドキュメントのスナップショットを取得します。
    const reviewDocSnap = await getDoc(reviewDocRef);

    // ドキュメントが存在するかどうかを確認します。
    if (reviewDocSnap.exists()) {
      // ドキュメントが存在する場合は、ドキュメントのデータを取得して返します。
      return reviewDocSnap.data();
    } else {
      // ドキュメントが存在しない場合は、nullを返します。
      return null;
    }
  };

  /**
   * ユーザーIDでレビューを取得する
   * @param userId - レビューを取得したいユーザーのID
   * @returns レビューデータを含むオブジェクトのリスト
   */
  export const getReviewsByUserId = async (userId: string) => {
    // 'reviews'コレクションへの参照を取得します。
    const reviewsRef = collection(db, "reviews");

    // ユーザーIDでレビューを検索するクエリを作成します。
    const q = query(reviewsRef, where("userId", "==", userId));

    // クエリを実行し、結果のスナップショットを取得します。
    const reviewQuerySnapshot = await getDocs(q);

    // 各ドキュメントからレビューデータを抽出し、リストとして返します。
    return reviewQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * 書籍IDでレビューを取得する
   * @param bookId - レビューを取得したい書籍のID
   * @returns レビューデータを含むオブジェクトのリスト
   */
  export const getReviewsByBookId = async (bookId: string) => {
    // 'reviews'コレクションへの参照を取得します。
    const reviewsRef = collection(db, "reviews");

    // 書籍IDでレビューを検索するクエリを作成します。
    const q = query(reviewsRef, where("bookId", "==", bookId));

    // クエリを実行し、結果のスナップショットを取得します。
    const reviewQuerySnapshot = await getDocs(q);

    // 各ドキュメントからレビューデータを抽出し、リストとして返します。
    return reviewQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * 記事IDでレビューを取得する
   * @param articleId - レビューを取得したい記事のID
   * @returns レビューデータを含むオブジェクトのリスト
   */
  export const getReviewsByArticleId = async (articleId: string) => {
    // 'reviews'コレクションへの参照を取得します。
    const reviewsRef = collection(db, "reviews");

    // 記事IDでレビューを検索するクエリを作成します。
    const q = query(reviewsRef, where("articleId", "==", articleId));

    // クエリを実行し、結果のスナップショットを取得します。
    const reviewQuerySnapshot = await getDocs(q);

    // 各ドキュメントからレビューデータを抽出し、リストとして返します。
    return reviewQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * 特定のレビューに対するいいねを取得する
   * @param reviewId - いいねを取得したいレビューのID
   * @returns いいねデータを含むオブジェクトのリスト
   */
  export const getLikesForReview = async (reviewId: string) => {
    // 'likes'コレクションへの参照を取得します。
    const likesRef = collection(db, "likes");

    // レビューIDでいいねを検索するクエリを作成します。
    const q = query(
      likesRef,
      where("targetType", "==", "REVIEW"),
      where("targetId", "==", reviewId)
    );

    // クエリを実行し、結果のスナップショットを取得します。
    const likesQuerySnapshot = await getDocs(q);

    // 各ドキュメントからいいねデータを抽出し、リストとして返します。
    return likesQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * 特定のレビューに対するコメントを取得する
   * @param reviewId - コメントを取得したいレビューのID
   * @returns コメントデータを含むオブジェクトのリスト
   */
  export const getCommentsForReview = async (reviewId: string) => {
    // 'comments'コレクションへの参照を取得します。
    const commentsRef = collection(db, "comments");

    // レビューIDでコメントを検索するクエリを作成します。
    const q = query(commentsRef, where("reviewId", "==", reviewId));

    // クエリを実行し、結果のスナップショットを取得します。
    const commentsQuerySnapshot = await getDocs(q);

    // 各ドキュメントからコメントデータを抽出し、リストとして返します。
    return commentsQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * 特定のレビューに付けられたタグを取得する
   * @param reviewId - タグを取得したいレビューのID
   * @returns タグのリスト
   */
  export const getTagsForReview = async (reviewId: string) => {
    // `reviews`コレクション内の特定のレビューのドキュメントへの参照を取得します。
    const reviewDocRef = doc(db, "reviews", reviewId);

    // ドキュメントのスナップショットを取得します。
    const reviewDocSnap = await getDoc(reviewDocRef);

    // ドキュメントが存在するかどうかを確認します。
    if (reviewDocSnap.exists()) {
      // ドキュメントが存在する場合は、ドキュメントのデータからタグを取得して返します。
      return reviewDocSnap.data().tags;
    } else {
      // ドキュメントが存在しない場合は、nullを返します。
      return null;
    }
  };

  /**
   * キーワードでレビューを検索する
   * @param keyword - 検索するキーワード
   * @returns レビューデータを含むオブジェクトのリスト
   */
  export const searchReviewsByKeyword = async (keyword: string) => {
    // 'reviews'コレクションへの参照を取得します。
    const reviewsRef = collection(db, "reviews");

    // キーワードでレビューを検索するクエリを作成します。
    // where("description", ">=", keyword) は、
    // "description"フィールドが指定されたキーワード以上であるドキュメントのみを
    // 取得する条件を指定します。
    // where("description", "<=", keyword + "\uf8ff") は、
    // "description"フィールドが指定されたキーワード以下であるドキュメントのみを
    // 取得する条件を指定します。
    // これにより、指定されたキーワードを含むすべてのドキュメントが取得されます。
    const q = query(
      reviewsRef,
      where("description", ">=", keyword),
      where("description", "<=", keyword + "\uf8ff")
    );

    // クエリを実行し、結果のスナップショットを取得します。
    const reviewQuerySnapshot = await getDocs(q);

    // 各ドキュメントからレビューデータを抽出し、リストとして返します。
    return reviewQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * タイプでレビューを検索する
   * @param targetType - 検索するタイプ ("BOOK" または "ARTICLE")
   * @returns レビューデータを含むオブジェクトのリスト
   */
  export const searchReviewsByType = async (targetType: "BOOK" | "ARTICLE") => {
    // 'reviews'コレクションへの参照を取得します。
    const reviewsRef = collection(db, "reviews");

    // タイプでレビューを検索するクエリを作成します。
    const q = query(reviewsRef, where("targetType", "==", targetType));

    // クエリを実行し、結果のスナップショットを取得します。
    const reviewQuerySnapshot = await getDocs(q);

    // 各ドキュメントからレビューデータを抽出し、リストとして返します。
    return reviewQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * 星の数でレビューを検索する
   * @param stars - 検索する星の数
   * @returns レビューデータを含むオブジェクトのリスト
   */
  export const searchReviewsByStars = async (stars: number) => {
    // 'reviews'コレクションへの参照を取得します。
    const reviewsRef = collection(db, "reviews");

    // 星の数でレビューを検索するクエリを作成します。
    const q = query(reviewsRef, where("stars", "==", stars));

    // クエリを実行し、結果のスナップショットを取得します。
    const reviewQuerySnapshot = await getDocs(q);

    // 各ドキュメントからレビューデータを抽出し、リストとして返します。
    return reviewQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * エンジニアスキルレベルでレビューを検索する
   * @param engineerSkillLevel - 検索するエンジニアスキルレベル ("BEGINNER"、"INTERMEDIATE"、または "ADVANCED")
   * @returns レビューデータを含むオブジェクトのリスト
   */
  export const searchReviewsBySkillLevel = async (
    engineerSkillLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  ) => {
    // 'reviews'コレクションへの参照を取得します。
    const reviewsRef = collection(db, "reviews");

    // エンジニアスキルレベルでレビューを検索するクエリを作成します。
    const q = query(
      reviewsRef,
      where("engineerSkillLevel", "==", engineerSkillLevel)
    );

    // クエリを実行し、結果のスナップショットを取得します。
    const reviewQuerySnapshot = await getDocs(q);

    // 各ドキュメントからレビューデータを抽出し、リストとして返します。
    return reviewQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * タグでレビューを検索する
   * @param tag - 検索するタグ
   * @returns レビューデータを含むオブジェクトのリスト
   */
  export const searchReviewsByTag = async (tag: string) => {
    // 'reviews'コレクションへの参照を取得します。
    const reviewsRef = collection(db, "reviews");

    // タグでレビューを検索するクエリを作成します。
    // array-contains演算子は、配列型のフィールドに特定の値が含まれているかどうかを
    // チェックするために使用されます。
    const q = query(reviewsRef, where("tags", "array-contains", tag));

    // クエリを実行し、結果のスナップショットを取得します。
    const reviewQuerySnapshot = await getDocs(q);

    // 各ドキュメントからレビューデータを抽出し、リストとして返します。
    return reviewQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * キーワードとタイプでレビューを検索する
   * @param keyword - 検索するキーワード
   * @param targetType - 検索するタイプ ("BOOK" または "ARTICLE")
   * @returns レビューデータを含むオブジェクトのリスト
   */
  export const searchReviewsByKeywordAndType = async (
    keyword: string,
    targetType: "BOOK" | "ARTICLE"
  ) => {
    // 'reviews'コレクションへの参照を取得します。
    const reviewsRef = collection(db, "reviews");

    // キーワードとタイプでレビューを検索するクエリを作成します。
    const q = query(
      reviewsRef,
      where("description", ">=", keyword),
      where("description", "<=", keyword + "\uf8ff"),
      where("targetType", "==", targetType)
    );

    // クエリを実行し、結果のスナップショットを取得します。
    const reviewQuerySnapshot = await getDocs(q);

    // 各ドキュメントからレビューデータを抽出し、リストとして返します。
    return reviewQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * レビューを更新する
   * @param reviewId - 更新するレビューのID
   * @param reviewData - 更新するレビューの説明、星の数を含むオブジェクト
   */
  export const updateReview = async (
    reviewId: string,
    reviewData: { description?: string; stars?: number }
  ) => {
    // `reviews`コレクション内の特定のレビューのドキュメントへの参照を取得します。
    const reviewDocRef = doc(db, "reviews", reviewId);

    // ドキュメントを更新します。
    // serverTimestamp()は、Firestoreサーバーのタイムスタンプを使用して、
    // データの更新日時を自動的に設定します。
    await updateDoc(reviewDocRef, {
      ...reviewData,
      updatedAt: serverTimestamp(),
    });
  };

  /**
   * レビューを削除する
   * @param reviewId - 削除するレビューのID
   */
  export const deleteReview = async (reviewId: string) => {
    // `reviews`コレクション内の特定のレビューのドキュメントへの参照を取得します。
    const reviewDocRef = doc(db, "reviews", reviewId);

    // ドキュメントを削除します。
    await deleteDoc(reviewDocRef);
  };

  // Like

  /**
   * レビューに対するいいねを作成する
   * @param userId - いいねをしたユーザーのID
   * @param reviewId - いいねが付けられたレビューのID
   */
  export const createLikeForReview = async (
    userId: string,
    reviewId: string
  ) => {
    // 'likes'コレクションへの参照を取得します。
    const likesRef = collection(db, "likes");

    // 新しいいいねデータを使用して新しいドキュメントを`likes`コレクションに追加します。
    // serverTimestamp()は、Firestoreサーバーのタイムスタンプを使用して、
    // データの作成日時を自動的に設定します。
    await setDoc(doc(likesRef), {
      userId: userId,
      targetType: "REVIEW",
      targetId: reviewId,
      createdAt: serverTimestamp(),
    });
  };

  /**
   * コメントに対するいいねを作成する
   * @param userId - いいねをしたユーザーのID
   * @param commentId - いいねが付けられたコメントのID
   */
  export const createLikeForComment = async (
    userId: string,
    commentId: string
  ) => {
    // 'likes'コレクションへの参照を取得します。
    const likesRef = collection(db, "likes");

    // 新しいいいねデータを使用して新しいドキュメントを`likes`コレクションに追加します。
    // serverTimestamp()は、Firestoreサーバーのタイムスタンプを使用して、
    // データの作成日時を自動的に設定します。
    await setDoc(doc(likesRef), {
      userId: userId,
      targetType: "COMMENT",
      targetId: commentId,
      createdAt: serverTimestamp(),
    });
  };

  /**
   * ユーザーとレビューの組み合わせでいいねを取得する
   * @param userId - いいねをしたユーザーのID
   * @param reviewId - いいねが付けられたレビューのID
   * @returns いいねデータを含むオブジェクト、いいねが存在しない場合はnull
   */
  export const getLikeByUserAndReview = async (
    userId: string,
    reviewId: string
  ) => {
    // 'likes'コレクションへの参照を取得します。
    const likesRef = collection(db, "likes");

    // ユーザーID、対象のタイプ、対象のIDでいいねを検索するクエリを作成します。
    const q = query(
      likesRef,
      where("userId", "==", userId),
      where("targetType", "==", "REVIEW"),
      where("targetId", "==", reviewId)
    );

    // クエリを実行し、結果のスナップショットを取得します。
    const likesQuerySnapshot = await getDocs(q);

    // 結果が空でないかどうかを確認します。
    if (!likesQuerySnapshot.empty) {
      // 結果が空でない場合は、最初のドキュメントのデータを取得して返します。
      return likesQuerySnapshot.docs[0].data();
    } else {
      // 結果が空の場合は、nullを返します。
      return null;
    }
  };

  /**
   * ユーザーとコメントの組み合わせでいいねを取得する
   * @param userId - いいねをしたユーザーのID
   * @param commentId - いいねが付けられたコメントのID
   * @returns いいねデータを含むオブジェクト、いいねが存在しない場合はnull
   */
  export const getLikeByUserAndComment = async (
    userId: string,
    commentId: string
  ) => {
    // 'likes'コレクションへの参照を取得します。
    const likesRef = collection(db, "likes");

    // ユーザーID、対象のタイプ、対象のIDでいいねを検索するクエリを作成します。
    const q = query(
      likesRef,
      where("userId", "==", userId),
      where("targetType", "==", "COMMENT"),
      where("targetId", "==", commentId)
    );

    // クエリを実行し、結果のスナップショットを取得します。
    const likesQuerySnapshot = await getDocs(q);

    // 結果が空でないかどうかを確認します。
    if (!likesQuerySnapshot.empty) {
      // 結果が空でない場合は、最初のドキュメントのデータを取得して返します。
      return likesQuerySnapshot.docs[0].data();
    } else {
      // 結果が空の場合は、nullを返します。
      return null;
    }
  };

  /**
   * レビューに対するいいねを削除する
   * @param userId - いいねを削除するユーザーのID
   * @param reviewId - いいねが付けられたレビューのID
   */
  export const deleteLikeForReview = async (
    userId: string,
    reviewId: string
  ) => {
    // 'likes'コレクションへの参照を取得します。
    const likesRef = collection(db, "likes");

    // ユーザーID、対象のタイプ、対象のIDでいいねを検索するクエリを作成します。
    const q = query(
      likesRef,
      where("userId", "==", userId),
      where("targetType", "==", "REVIEW"),
      where("targetId", "==", reviewId)
    );

    // クエリを実行し、結果のスナップショットを取得します。
    const likesQuerySnapshot = await getDocs(q);

    // 結果が空でないかどうかを確認します。
    if (!likesQuerySnapshot.empty) {
      // 結果が空でない場合は、最初のドキュメントを削除します。
      await deleteDoc(likesQuerySnapshot.docs[0].ref);
    }
  };

  /**
   * コメントに対するいいねを削除する
   * @param userId - いいねを削除するユーザーのID
   * @param commentId - いいねが付けられたコメントのID
   */
  export const deleteLikeForComment = async (
    userId: string,
    commentId: string
  ) => {
    // 'likes'コレクションへの参照を取得します。
    const likesRef = collection(db, "likes");

    // ユーザーID、対象のタイプ、対象のIDでいいねを検索するクエリを作成します。
    const q = query(
      likesRef,
      where("userId", "==", userId),
      where("targetType", "==", "COMMENT"),
      where("targetId", "==", commentId)
    );

    // クエリを実行し、結果のスナップショットを取得します。
    const likesQuerySnapshot = await getDocs(q);

    // 結果が空でないかどうかを確認します。
    if (!likesQuerySnapshot.empty) {
      // 結果が空でない場合は、最初のドキュメントを削除します。
      await deleteDoc(likesQuerySnapshot.docs[0].ref);
    }
  };

  // Comment

  /**
   * 新しいコメントを作成する
   * @param commentData - 新しいコメントのユーザーID、レビューID、親コメントID、説明を含むオブジェクト
   * @returns 新しく作成されたコメントのID
   */
  export const createComment = async (commentData: {
    userId: string;
    reviewId: string;
    parentCommentId?: string;
    description: string;
  }) => {
    // 'comments'コレクションへの参照を取得します。
    const commentsRef = collection(db, "comments");

    // 新しいコメントデータを使用して新しいドキュメントを`comments`コレクションに追加します。
    // serverTimestamp()は、Firestoreサーバーのタイムスタンプを使用して、
    // データの作成日時と更新日時を自動的に設定します。
    const newCommentDoc = await addDoc(commentsRef, {
      ...commentData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // 新しく作成されたコメントのIDを返します。
    return newCommentDoc.id;
  };

  /**
   * IDでコメントを取得する
   * @param commentId - 取得するコメントのID
   * @returns コメントデータを含むオブジェクト、コメントが存在しない場合はnull
   */
  export const getCommentById = async (commentId: string) => {
    // 'comments'コレクション内の特定のコメントのドキュメントへの参照を取得します。
    const commentDocRef = doc(db, "comments", commentId);

    // ドキュメントのスナップショットを取得します。
    const commentDocSnap = await getDoc(commentDocRef);

    // ドキュメントが存在するかどうかを確認します。
    if (commentDocSnap.exists()) {
      // ドキュメントが存在する場合は、ドキュメントのデータを取得して返します。
      return commentDocSnap.data();
    } else {
      // ドキュメントが存在しない場合は、nullを返します。
      return null;
    }
  };

  /**
   * ユーザーIDでコメントを取得する
   * @param userId - コメントを取得したいユーザーのID
   * @returns コメントデータを含むオブジェクトのリスト
   */
  export const getCommentsByUserId = async (userId: string) => {
    // 'comments'コレクションへの参照を取得します。
    const commentsRef = collection(db, "comments");

    // ユーザーIDでコメントを検索するクエリを作成します。
    const q = query(commentsRef, where("userId", "==", userId));

    // クエリを実行し、結果のスナップショットを取得します。
    const commentsQuerySnapshot = await getDocs(q);

    // 各ドキュメントからコメントデータを抽出し、リストとして返します。
    return commentsQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * レビューIDでコメントを取得する
   * @param reviewId - コメントを取得したいレビューのID
   * @returns コメントデータを含むオブジェクトのリスト
   */
  export const getCommentsByReviewId = async (reviewId: string) => {
    // 'comments'コレクションへの参照を取得します。
    const commentsRef = collection(db, "comments");

    // レビューIDでコメントを検索するクエリを作成します。
    const q = query(commentsRef, where("reviewId", "==", reviewId));

    // クエリを実行し、結果のスナップショットを取得します。
    const commentsQuerySnapshot = await getDocs(q);

    // 各ドキュメントからコメントデータを抽出し、リストとして返します。
    return commentsQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * 特定のコメントへの返信を取得する
   * @param parentCommentId - 返信を取得したいコメントのID
   * @returns コメントデータを含むオブジェクトのリスト
   */
  export const getRepliesToComment = async (parentCommentId: string) => {
    // 'comments'コレクションへの参照を取得します。
    const commentsRef = collection(db, "comments");

    // 親コメントIDでコメントを検索するクエリを作成します。
    const q = query(commentsRef, where("parentCommentId", "==", parentCommentId));

    // クエリを実行し、結果のスナップショットを取得します。
    const commentsQuerySnapshot = await getDocs(q);

    // 各ドキュメントからコメントデータを抽出し、リストとして返します。
    return commentsQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * 特定のコメントに対するいいねを取得する
   * @param commentId - いいねを取得したいコメントのID
   * @returns いいねデータを含むオブジェクトのリスト
   */
  export const getLikesForComment = async (commentId: string) => {
    // 'likes'コレクションへの参照を取得します。
    const likesRef = collection(db, "likes");

    // コメントIDでいいねを検索するクエリを作成します。
    const q = query(
      likesRef,
      where("targetType", "==", "COMMENT"),
      where("targetId", "==", commentId)
    );

    // クエリを実行し、結果のスナップショットを取得します。
    const likesQuerySnapshot = await getDocs(q);

    // 各ドキュメントからいいねデータを抽出し、リストとして返します。
    return likesQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * コメントを更新する
   * @param commentId - 更新するコメントのID
   * @param commentData - 更新するコメントの説明を含むオブジェクト
   */
  export const updateComment = async (
    commentId: string,
    commentData: { description: string }
  ) => {
    // 'comments'コレクション内の特定のコメントのドキュメントへの参照を取得します。
    const commentDocRef = doc(db, "comments", commentId);

    // ドキュメントを更新します。
    // serverTimestamp()は、Firestoreサーバーのタイムスタンプを使用して、
    // データの更新日時を自動的に設定します。
    await updateDoc(commentDocRef, {
      ...commentData,
      updatedAt: serverTimestamp(),
    });
  };

  /**
   * コメントを削除する
   * @param commentId - 削除するコメントのID
   */
  export const deleteComment = async (commentId: string) => {
    // 'comments'コレクション内の特定のコメントのドキュメントへの参照を取得します。
    const commentDocRef = doc(db, "comments", commentId);

    // ドキュメントを削除します。
    await deleteDoc(commentDocRef);
  };

  // Tag

  /**
   * 新しいタグを作成する
   * @param tagName - 新しいタグの名前
   * @returns 新しく作成されたタグのID
   */
  export const createTag = async (tagName: string) => {
    // 'tags'コレクションへの参照を取得します。
    const tagsRef = collection(db, "tags");

    // 新しいタグ名を使用して新しいドキュメントを'tags'コレクションに追加します。
    const newTagDoc = await addDoc(tagsRef, {
      name: tagName,
    });

    // 新しく作成されたタグのIDを返します。
    return newTagDoc.id;
  };

  /**
   * IDでタグを取得する
   * @param tagId - 取得するタグのID
   * @returns タグデータを含むオブジェクト、タグが存在しない場合はnull
   */
  export const getTagById = async (tagId: string) => {
    // 'tags'コレクション内の特定のタグのドキュメントへの参照を取得します。
    const tagDocRef = doc(db, "tags", tagId);

    // ドキュメントのスナップショットを取得します。
    const tagDocSnap = await getDoc(tagDocRef);

    // ドキュメントが存在するかどうかを確認します。
    if (tagDocSnap.exists()) {
      // ドキュメントが存在する場合は、ドキュメントのデータを取得して返します。
      return tagDocSnap.data();
    } else {
      // ドキュメントが存在しない場合は、nullを返します。
      return null;
    }
  };

  /**
   * タグ名でタグを取得する
   * @param tagName - 取得するタグのタグ名
   * @returns タグデータを含むオブジェクト、タグが存在しない場合はnull
   */
  export const getTagByName = async (tagName: string) => {
    // 'tags'コレクションへの参照を取得します。
    const tagsRef = collection(db, "tags");

    // タグ名でタグを検索するクエリを作成します。
    const q = query(tagsRef, where("name", "==", tagName));

    // クエリを実行し、結果のスナップショットを取得します。
    const tagsQuerySnapshot = await getDocs(q);

    // 結果が空でないかどうかを確認します。
    if (!tagsQuerySnapshot.empty) {
      // 結果が空でない場合は、最初のドキュメントのデータを取得して返します。
      return tagsQuerySnapshot.docs[0].data();
    } else {
      // 結果が空の場合は、nullを返します。
      return null;
    }
  };

  /**
   * タグ名でレビューを取得する
   * @param tagName - レビューを取得したいタグのタグ名
   * @returns レビューデータを含むオブジェクトのリスト
   */
  export const getReviewsByTagName = async (tagName: string) => {
    // 'reviews'コレクションへの参照を取得します。
    const reviewsRef = collection(db, "reviews");

    // タグ名でレビューを検索するクエリを作成します。
    // array-contains演算子は、配列型のフィールドに特定の値が含まれているかどうかを
    // チェックするために使用されます。
    const q = query(reviewsRef, where("tags", "array-contains", tagName));

    // クエリを実行し、結果のスナップショットを取得します。
    const reviewsQuerySnapshot = await getDocs(q);

    // 各ドキュメントからレビューデータを抽出し、リストとして返します。
    return reviewsQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * タグを更新する
   * @param tagId - 更新するタグのID
   * @param newName - 新しいタグ名
   */
  export const updateTag = async (tagId: string, newName: string) => {
    // 'tags'コレクション内の特定のタグのドキュメントへの参照を取得します。
    const tagDocRef = doc(db, "tags", tagId);

    // ドキュメントを更新します。
    await updateDoc(tagDocRef, {
      name: newName,
    });
  };

  /**
   * タグを削除する
   * @param tagId - 削除するタグのID
   */
  export const deleteTag = async (tagId: string) => {
    // 'tags'コレクション内の特定のタグのドキュメントへの参照を取得します。
    const tagDocRef = doc(db, "tags", tagId);

    // ドキュメントを削除します。
    await deleteDoc(tagDocRef);
  };

  // Notification

  /**
   * 新しい通知を作成する
   * @param notificationData - 新しい通知のユーザーID、タイプ、コンテンツ、レビューID / コメントID / フォロワーユーザーIDを含むオブジェクト
   * @returns 新しく作成された通知のID
   */
  export const createNotification = async (notificationData: {
    userId: string;
    type: "LIKE" | "COMMENT" | "FOLLOW";
    content: string;
    reviewId?: string;
    commentId?: string;
    followerUserId?: string;
  }) => {
    // 'notifications'コレクションへの参照を取得します。
    const notificationsRef = collection(db, "notifications");

    // 新しい通知データを使用して新しいドキュメントを
    // `notifications`コレクションに追加します。
    // serverTimestamp()は、Firestoreサーバーのタイムスタンプを使用して、
    // データの作成日時を自動的に設定します。
    const newNotificationDoc = await addDoc(notificationsRef, {
      ...notificationData,
      isRead: false,
      createdAt: serverTimestamp(),
    });

    // 新しく作成された通知のIDを返します。
    return newNotificationDoc.id;
  };

  /**
   * IDで通知を取得する
   * @param notificationId - 取得する通知のID
   * @returns 通知データを含むオブジェクト、通知が存在しない場合はnull
   */
  export const getNotificationById = async (notificationId: string) => {
    // 'notifications'コレクション内の特定の通知の
    // ドキュメントへの参照を取得します。
    const notificationDocRef = doc(db, "notifications", notificationId);

    // ドキュメントのスナップショットを取得します。
    const notificationDocSnap = await getDoc(notificationDocRef);

    // ドキュメントが存在するかどうかを確認します。
    if (notificationDocSnap.exists()) {
      // ドキュメントが存在する場合は、ドキュメントのデータを取得して返します。
      return notificationDocSnap.data();
    } else {
      // ドキュメントが存在しない場合は、nullを返します。
      return null;
    }
  };

  /**
   * ユーザーIDで通知を取得する
   * @param userId - 通知を取得したいユーザーのID
   * @returns 通知データを含むオブジェクトのリスト
   */
  export const getNotificationsByUserId = async (userId: string) => {
    // 'notifications'コレクションへの参照を取得します。
    const notificationsRef = collection(db, "notifications");

    // ユーザーIDで通知を検索し、
    // 作成日時で降順にソートするクエリを作成します。
    const q = query(
      notificationsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    // クエリを実行し、結果のスナップショットを取得します。
    const notificationsQuerySnapshot = await getDocs(q);

    // 各ドキュメントから通知データを抽出し、リストとして返します。
    return notificationsQuerySnapshot.docs.map((doc) => doc.data());
  };

  /**
   * 通知を既読にする
   * @param notificationId - 既読にする通知のID
   */
  export const markNotificationAsRead = async (notificationId: string) => {
    // 'notifications'コレクション内の特定の通知の
    // ドキュメントへの参照を取得します。
    const notificationDocRef = doc(db, "notifications", notificationId);

    // ドキュメントを更新します。
    await updateDoc(notificationDocRef, {
      isRead: true,
    });
  };

  /**
   * 通知を削除する
   * @param notificationId - 削除する通知のID
   */
  export const deleteNotification = async (notificationId: string) => {
    // 'notifications'コレクション内の特定の通知の
    // ドキュメントへの参照を取得します。
    const notificationDocRef = doc(db, "notifications", notificationId);

    // ドキュメントを削除します。
    await deleteDoc(notificationDocRef);
  };

  // BookmarkBook

  /**
   * 書籍をブックマークする
   * @param userId - ブックマークをしたユーザーのID
   * @param bookId - ブックマークされた書籍のID
   */
  export const bookmarkBook = async (userId: string, bookId: string) => {
    // 'userBookmarks'コレクション内の、
    // 特定のユーザーのブックマークを格納する
    // サブコレクションへの参照を取得します。
    const bookmarksRef = collection(db, "userBookmarks", userId, "bookmarks");

    // 新しいブックマークデータを使用して新しいドキュメントを
    // サブコレクションに追加します。
    // serverTimestamp()は、Firestoreサーバーのタイムスタンプを使用して、
    // データの作成日時を自動的に設定します。
    await setDoc(doc(bookmarksRef, bookId), {
      createdAt: serverTimestamp(),
    });
  };

  /**
   * ユーザーと書籍の組み合わせでブックマークを取得する
   * @param userId - ブックマークをしたユーザーのID
   * @param bookId - ブックマークされた書籍のID
   * @returns ブックマークデータを含むオブジェクト、ブックマークが存在しない場合はnull
   */
  export const getBookmarkByUserAndBook = async (
    userId: string,
    bookId: string
  ) => {
    // 'userBookmarks'コレクション内の、
    // 特定のユーザーのブックマークを格納する
    // サブコレクション内の特定のドキュメントへの参照を取得します。
    const bookmarkDocRef = doc(
      db,
      "userBookmarks",
      userId,
      "bookmarks",
      bookId
    );

    // ドキュメントのスナップショットを取得します。
    const bookmarkDocSnap = await getDoc(bookmarkDocRef);

    // ドキュメントが存在するかどうかを確認します。
    if (bookmarkDocSnap.exists()) {
      // ドキュメントが存在する場合は、ドキュメントのデータを取得して返します。
      return bookmarkDocSnap.data();
    } else {
      // ドキュメントが存在しない場合は、nullを返します。
      return null;
    }
  };

  /**
   * 書籍のブックマークを削除する
   * @param userId - ブックマークを削除するユーザーのID
   * @param bookId - ブックマークされた書籍のID
   */
  export const unbookmarkBook = async (userId: string, bookId: string) => {
    // 'userBookmarks'コレクション内の、
    // 特定のユーザーのブックマークを格納する
    // サブコレクション内の特定のドキュメントへの参照を取得します。
    const bookmarkDocRef = doc(
      db,
      "userBookmarks",
      userId,
      "bookmarks",
      bookId
    );

    // ドキュメントを削除します。
    await deleteDoc(bookmarkDocRef);
  };

  // BookmarkArticle
  // ... (BookmarkBookとほぼ同じなので省略)

  // Follow

  /**
   * ユーザーをフォローする
   * @param followerUserId - フォローするユーザーのID
   * @param followedUserId - フォローされるユーザーのID
   */
  export const followUser = async (
    followerUserId: string,
    followedUserId: string
  ) => {
    // 'userFollows'コレクション内の、
    // 特定のユーザーがフォローしているユーザーを格納する
    // サブコレクションへの参照を取得します。
    const followingRef = collection(
      db,
      "userFollows",
      followerUserId,
      "following"
    );

    // 新しいフォローデータを使用して新しいドキュメントを
    // サブコレクションに追加します。
    // serverTimestamp()は、Firestoreサーバーのタイムスタンプを使用して、
    // データの作成日時を自動的に設定します。
    await setDoc(doc(followingRef, followedUserId), {
      createdAt: serverTimestamp(),
    });

    // 'userFollowers'コレクション内の、
    // 特定のユーザーのフォロワーを格納する
    // サブコレクションへの参照を取得します。
    const followersRef = collection(
      db,
      "userFollowers",
      followedUserId,
      "followers"
    );

    // 新しいフォロワーデータを使用して新しいドキュメントを
    // サブコレクションに追加します。
    // serverTimestamp()は、Firestoreサーバーのタイムスタンプを使用して、
    // データの作成日時を自動的に設定します。
    await setDoc(doc(followersRef, followerUserId), {
      createdAt: serverTimestamp(),
    });
  };

  /**
   * フォロー関係を取得する
   * @param followerUserId - フォローするユーザーのID
   * @param followedUserId - フォローされるユーザーのID
   * @returns フォローデータを含むオブジェクト、フォロー関係が存在しない場合はnull
   */
  export const getFollowRelationship = async (
    followerUserId: string,
    followedUserId: string
  ) => {
    // 'userFollows'コレクション内の、
    // 特定のユーザーがフォローしているユーザーを格納する
    // サブコレクション内の特定のドキュメントへの参照を取得します。
    const followingDocRef = doc(
      db,
      "userFollows",
      followerUserId,
      "following",
      followedUserId
    );

    // ドキュメントのスナップショットを取得します。
    const followingDocSnap = await getDoc(followingDocRef);

    // ドキュメントが存在するかどうかを確認します。
    if (followingDocSnap.exists()) {
      // ドキュメントが存在する場合は、ドキュメントのデータを取得して返します。
      return followingDocSnap.data();
    } else {
      // ドキュメントが存在しない場合は、nullを返します。
      return null;
    }
  };

  /**
   * ユーザーのフォローを解除する
   * @param followerUserId - フォローを解除するユーザーのID
   * @param followedUserId - フォローが解除されるユーザーのID
   */
  export const unfollowUser = async (
    followerUserId: string,
    followedUserId: string
  ) => {
    // 'userFollows'コレクション内の、
    // 特定のユーザーがフォローしているユーザーを格納する
    // サブコレクション内の特定のドキュメントへの参照を取得します。
    const followingDocRef = doc(
      db,
      "userFollows",
      followerUserId,
      "following",
      followedUserId
    );

    // ドキュメントを削除します。
    await deleteDoc(followingDocRef);

    // 'userFollowers'コレクション内の、
    // 特定のユーザーのフォロワーを格納する
    // サブコレクション内の特定のドキュメントへの参照を取得します。
    const followersDocRef = doc(
      db,
      "userFollowers",
      followedUserId,
      "followers",
      followerUserId
    );

    // ドキュメントを削除します。
    await deleteDoc(followersDocRef);
  };

  /**
   * 特定のユーザーのフォロワー一覧を取得する
   * @param userId フォロワーを取得したいユーザーのID
   * @returns フォロワーのユーザー情報を含む配列
   */
  export const getUserFollowers = async (userId: string) => {
    // 'userFollowers'コレクション内の、
    // 特定のユーザーのフォロワーを格納するサブコレクションへの参照を取得します。
    const followersRef = collection(db, "userFollowers", userId, "followers");
    const followersSnapshot = await getDocs(followersRef);

    // フォロワーのスナップショットからフォロワーのIDを抽出します。
    const followerIds = followersSnapshot.docs.map((doc) => doc.id);

    // 各フォロワーのユーザー情報を取得します。
    const followerPromises = followerIds.map((followerId) =>
      getUserById(followerId)
    );
    const followerResults = await Promise.all(followerPromises);

    // 取得したユーザー情報からnullを取り除いたものを返します。
    return followerResults.filter(
      (follower): follower is Exclude<typeof follower, null> =>
        follower !== null
    );
  };

    // 認証状態の監視
    function onAuthStateChange(callback) {
      return onAuthStateChanged(auth, callback);
    }

// Google認証でサインイン
async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    if (user.displayName && user.email) {
      await createUser({
        username: user.displayName,
        email: user.email
      });
      console.log("User signed in with Google and user document checked/initialized");
    } else {
      console.warn("User signed in, but display name or email is missing");
    }
    
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
}



  export { db, auth, signInWithGoogle, onAuthStateChange};