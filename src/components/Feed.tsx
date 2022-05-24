import type { FC } from "react";
import { useState, useEffect } from "react";
import styles from "./Feed.module.css";
import { db } from "../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import TweetInput from "./TweetInput";

const Feed: FC = () => {
  const [posts, setPosts] = useState([
    {
      avatar: "",
      id: "",
      image: "",
      text: "",
      timestamp: null,
      username: "",
    },
  ]);

  useEffect(() => {
    //Firebase ver9 compliant (modular)
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unSub = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          avatar: doc.data().avatar,
          id: doc.id,
          image: doc.data().image,
          text: doc.data().text,
          timestamp: doc.data().timestamp,
          username: doc.data().username,
        }))
      );
    });
    return () => {
      unSub();
    };
  }, []);
  
  return (
    <div className={styles.feed}>
      <TweetInput />
      {posts.map((post) => (
        <h3>{post.id}</h3>
      ))}
    </div>
  );
};

export default Feed;