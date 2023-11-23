import React, { useEffect, useRef, useState } from "react";
import profileImg from "../img/profileImg.jpg";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosContact } from "react-icons/io";
import { MdArrowBack } from "react-icons/md";
import styles from "../css/HeaderRightSection.module.css";

const HeaderRightSection = ({
  contactId,
  handleChatDelete,
  toggleMessageSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isFilterOpen, setFilterOpen] = useState(false);
  const boxRef = useRef(null);
  const filterBoxRef = useRef(null);

  //delete chat function
  const handleDeleteClick = (id) => {
    setIsOpen(false);
    handleChatDelete(id);
  };

  // to hide or false again the message or right section
  const handleMessageSection = () => {
    toggleMessageSection();
  };

  const toggleMenuBox = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchData();
  }, [contactId]);

  const fetchData = async () => {
    try {
      const res = await fetch("/contacts");
      const users = await res.json();
      const user = users.find((user) => user._id === contactId);
      if (user) {
        setName(user.name);
        setPhone(user.phone);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOutside = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setIsOpen(false);
    }

    if (filterBoxRef.current && !filterBoxRef.current.contains(event.target)) {
      setFilterOpen(false);
    }
  };

  useEffect(() => {
    console.log(contactId);
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles["navbar-right"]}>
      <div className={styles.ContactInfo}>
        <MdArrowBack
          onClick={() => handleMessageSection()}
          className={styles.backIcon}
        />
        {/* <img src={profileImg} alt="Profile Image" /> */}
        <div className={styles.image}>
          {" "}
          <IoIosContact />{" "}
        </div>
        <div className={styles.data}>
          <h2>{name}</h2>
          <p>{phone}</p>
        </div>
      </div>

      {/* <div className={styles.icons}>
                <BiDotsVerticalRounded onClick={toggleMenuBox} style={{ fontSize: '30px', cursor: "pointer" }} />
            </div> */}

      <div
        className={`${styles.menuContainer} ${isOpen ? styles.open : ""}`}
        ref={boxRef}
      >
        <BiDotsVerticalRounded
          onClick={toggleMenuBox}
          className="menuIcon"
          style={{ marginLeft: "20px", fontSize: "23px" }}
        />
        <div
          onClick={() => handleDeleteClick(contactId)}
          className={styles.menuBox}
        >
          <p>Delete Chat</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderRightSection;
