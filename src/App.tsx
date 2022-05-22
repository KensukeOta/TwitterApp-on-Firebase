import React, { FC, useEffect } from "react";
import { useRecoilState } from "recoil";
import styles from "./App.module.css";
import Auth from "./components/Auth";
import Feed from "./components/Feed";
import { auth } from "./firebase";
import { userInfo } from "./store/userInfo";

const App: FC = () => {
  const [user, setUser] = useRecoilState(userInfo);
  
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser({
          uid: authUser.uid,
          photoUrl: authUser.photoURL,
          displayName: authUser.displayName,
        })
      } else {
        setUser({
          uid: "",
          photoUrl: "",
          displayName: "",
        })
      }
    })
    return () => {
      unSub();
    }
  }, []);
  
  return (
    <>
      {user.uid ? (
        <div className={styles.app}>
          <Feed />
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
