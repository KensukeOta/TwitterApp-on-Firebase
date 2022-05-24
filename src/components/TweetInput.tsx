import React from "react";
import styles from "./TweetInput.module.css";
import { auth } from "../firebase";
import { useRecoilValue } from "recoil";
import { userInfo } from "../store/userInfo";
import { Avatar } from "@mui/material";

const TweetInput = () => {
  const user = useRecoilValue(userInfo);

  return (
    <div>
      <Avatar
        className={styles.tweet_avatar}
        src={user.photoUrl}
        onClick={async () => {
          await auth.signOut();
        }}
      />
    </div>
  );
};

export default TweetInput;