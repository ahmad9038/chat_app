import React from "react";
import styles from "../css/TextBox.module.css";

const TextBox = ({ cur }) => {
  const { content, timestamp } = cur;
  const date = new Date(timestamp);

  // Format the date
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  // Format the time
  const hour = date.getHours();
  const minute = date.getMinutes();
  const meridiem = hour >= 12 ? "pm" : "am";
  const formattedTime = `${hour % 12 || 12}:${minute
    .toString()
    .padStart(2, "0")}${meridiem}`;

  // Combine the formatted date and time
  const formattedDateTime = `${formattedDate}_${formattedTime}`;

  return (
    <div className={styles.messageBox}>
      <div className={styles.messageText}>{content}</div>
      <div className={styles.time}>{formattedDateTime}</div>
    </div>
  );
};

export default TextBox;
