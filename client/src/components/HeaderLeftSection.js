import React, { useEffect, useRef, useState } from "react";
import profileImg from "../img/profileImg.jpg";
import {
  BsFillChatRightDotsFill,
  BsFilter,
  BsPersonFillAdd,
} from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useFilterContext } from "../context/filterContext";
import { RxCross1 } from "react-icons/rx";
import { AiFillDelete } from "react-icons/ai";
import { CgArrowsExpandDownLeft, CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const HeaderLeftSection = ({
  toggleMessages,
  contactId,
  toggleDeleteForm,
  toggleProfileForm,
}) => {
  const {
    updateFilterValue,
    clearSearch,
    sorting,
    filters: { searched },
  } = useFilterContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const boxRef = useRef(null);
  const filterBoxRef = useRef(null);
  const navigate = useNavigate();

  // logouthandler
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  // for add contact menu
  const toggleContactForm = () => {
    toggleMessages();
  };

  // for delete contact menu
  const toggleDeleteButton = () => {
    toggleDeleteForm();
  };

  // for menu icon
  const toggleMenuBox = () => {
    setIsOpen(!isOpen);
  };

  // for profileDataForm
  const toggleProfileData = () => {
    toggleProfileForm();
  };

  // for filter icon
  const toggleFilterBox = () => {
    setFilterOpen(!isFilterOpen);
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
    <div className="header">
      <div className="navbar-left">
        {/* <img src={profileImg} alt="Profile Image" /> */}
        <div className="image" onClick={toggleProfileData}>
          {" "}
          <CgProfile />{" "}
        </div>

        <div className="icons">
          <AiFillDelete
            onClick={toggleDeleteButton}
            className={contactId === null ? "hideDeleteIcon" : "showDeleteIcon"}
            style={{ marginLeft: "20px", fontSize: "25px", cursor: "pointer" }}
          />

          <BsPersonFillAdd
            onClick={toggleContactForm}
            style={{ marginLeft: "20px", fontSize: "25px", cursor: "pointer" }}
          />

          <div className={`menuContainer ${isOpen ? "open" : ""}`} ref={boxRef}>
            <HiOutlineDotsVertical
              onClick={toggleMenuBox}
              className="menuIcon"
              style={{ marginLeft: "20px", fontSize: "23px" }}
            />
            <div onClick={() => logoutHandler()} className="menuBox">
              logout
            </div>
          </div>
        </div>
      </div>

      <div className="searchbar">
        <input
          type="text"
          onChange={(event) => updateFilterValue(event)}
          value={searched}
          name="searched"
          className="search-input"
          placeholder="Search messages..."
        />

        {searched && (
          <div className="clear-icon" onClick={() => clearSearch()}>
            <RxCross1 style={{ color: "black", fontSize: "15px" }} />
          </div>
        )}

        <div
          className={`filterContainer ${isFilterOpen ? "filterBoxOpen" : ""}`}
          ref={filterBoxRef}
        >
          <div className="filter-icon">
            <BsFilter
              onClick={toggleFilterBox}
              className="filterIcon"
              style={{ color: "white", fontSize: "30px" }}
            />
          </div>
          <div className="filterBox">
            <p onClick={(event) => sorting(event)} value="none">
              none
            </p>
            <p onClick={(event) => sorting(event)} value="a-z">
              a-z
            </p>
            <p onClick={(event) => sorting(event)} value="z-a">
              z-a
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLeftSection;
