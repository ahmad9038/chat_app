import React, { useEffect, useState } from "react";
import axios from "axios";

//components
import ContactBox from "../components/ContactBox";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useFilterContext } from "../context/filterContext";
import HeaderLeftSection from "../components/HeaderLeftSection";
import AddContactForm from "../components/AddContactForm";
import DeleteContactForm from "../components/DeleteContactForm";
import HeaderRightSection from "../components/HeaderRightSection";
import TextBox from "../components/TextBox";
import { useMessageContext } from "../context/messageContext";
import MessageTypeSection from "../components/MessageTypeSection";
import ProfileData from "../components/ProfileData";
import { useChatState } from "../context/chatProvider";

const Home = () => {
  const { user } = useChatState();
  const { filterContacts } = useFilterContext();
  const { allMessages } = useMessageContext();
  // we create useState and function here and define this function as attribute in HeaderLeftSection and then in the HeaderLeftSection we created another function and define this function to that and on click the icon in HeaderLeftSection our function works
  const [showMessages, setShowMessages] = useState(true);
  const toggleMessages = () => {
    setShowMessages(false);
  };

  const [showDeleteForm, setShowDeleteForm] = useState(true);
  const toggleDeleteForm = () => {
    setShowDeleteForm(false);
  };

  // for showing profile data
  const [showProfileForm, setShowProfileForm] = useState(true);
  const toggleProfileForm = () => {
    setShowProfileForm(false);
  };

  // for responsive show message section
  const [messageSection, setMessagesSection] = useState(false);
  const toggleMessageSection = () => {
    console.log(messageSection);
    setMessagesSection(!messageSection);
  };

  //to open the contact form
  const [isAddContactModalOpen, setAddContactModalOpen] = useState(false);

  // Open the add contact modal
  const openAddContactModal = () => {
    setAddContactModalOpen(true);
  };

  // Close the add contact modal
  const closeAddContactModal = () => {
    setAddContactModalOpen(false);
  };

  // when i press this cross icon which is present in contact form then this show messages again true
  const closeContactForm = () => {
    setShowMessages(true);
  };

  const closeDeleteForm = () => {
    setShowDeleteForm(true);
  };

  // for closing profile data form
  const closeProfileForm = () => {
    setShowProfileForm(true);
  };

  // select current contact
  const [selectedContact, setSelectedContact] = useState(null);
  const handleContactClick = (id) => {
    setSelectedContact(id);
    console.log(selectedContact);
  };

  // delete contact
  const handleContactDelete = (id) => {
    axios
      .delete(`/deleteContact/${id}`)
      .then((response) => {
        console.log(response.data.message);
        // Handle success, e.g., update the contact list
      })
      .catch((error) => {
        console.error(error);
        // Handle error, e.g., display an error message
      });

    setShowDeleteForm(true);
  };

  //delete chat
  const handleChatDelete = (id) => {
    axios
      .delete(`/deleteChat/${id}`)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  let isSelected;
  return (
    <>
      <div className="parent">
        <div className="container">
          {/* left section  */}
          <div className="left-section">
            <div
              className={`content-wrapper ${
                !showMessages || !showDeleteForm || !showProfileForm
                  ? "blur"
                  : ""
              }`}
            >
              {/* header */}
              <HeaderLeftSection
                contactId={selectedContact}
                toggleMessages={toggleMessages}
                toggleDeleteForm={toggleDeleteForm}
                toggleProfileForm={toggleProfileForm}
              />

              {/* contacts here */}
              <div className="messages">
                {filterContacts.map((cur) => (
                  <div
                    onClick={() => {
                      handleContactClick(cur._id);
                      toggleMessageSection();
                    }}
                    key={cur._id}
                  >
                    <ContactBox
                      name={cur.name}
                      phone={cur.phone}
                      isSelected={selectedContact === cur._id}
                    />
                  </div>
                ))}
              </div>
            </div>

            {
              <AddContactForm
                showMessages={showMessages}
                closeContactForm={closeContactForm}
                openModal={openAddContactModal}
                isOpen={isAddContactModalOpen}
                onClose={closeAddContactModal}
              />
            }
            {
              <DeleteContactForm
                handleContactDelete={handleContactDelete}
                showDeleteForm={showDeleteForm}
                contactId={selectedContact}
                closeDeleteForm={closeDeleteForm}
              />
            }
            {user && (
              <ProfileData
                user={user}
                showProfileForm={showProfileForm}
                closeProfileForm={closeProfileForm}
              />
            )}
          </div>

          {/* right section  */}
          <div
            className={
              messageSection ? "right-section show" : "right-section hide"
            }
          >
            <div className="header">
              <HeaderRightSection
                toggleMessageSection={toggleMessageSection}
                handleChatDelete={handleChatDelete}
                contactId={selectedContact}
              />
            </div>

            {/* messages */}
            <div className="messages">
              {allMessages
                .filter((cur) => cur.contactId === selectedContact)
                .map((cur) => (
                  <TextBox key={cur._id} cur={cur} />
                ))}
              {allMessages.filter((cur) => cur.contactId === selectedContact)
                .length === 0 && <div className="empty-message">No Chat</div>}
            </div>

            {/* type section  */}
            <div className="message-input">
              <MessageTypeSection selectedContact={selectedContact} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
