import React from "react";
import styles from "../css/ProfileData.module.css";
import { RxCross1 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";

const ProfileData = ({ showProfileForm, closeProfileForm, user }) => {
  const toggleCrossButton = () => {
    closeProfileForm();
  };

  return (
    <div className={styles.parent}>
      <div
        className={`${styles.container} ${
          !showProfileForm ? styles.show : styles.hide
        }`}
      >
        <div onClick={toggleCrossButton} className={styles.crossIcon}>
          <RxCross1 />
        </div>
        <div className={styles.data}>
          <h1 className={styles.name}>{user.name}</h1>
          <h1 className={styles.email}>{user.email}</h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
