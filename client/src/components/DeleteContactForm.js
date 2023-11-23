import React from 'react'
import styles from '../css/DeleteContactForm.module.css';
import { RxCross1 } from 'react-icons/rx';

const DeleteContactForm = ({ closeDeleteForm, showDeleteForm, handleContactDelete, contactId }) => {


    const toggleContactForm = () => {
        closeDeleteForm();
    };

    // for deleting contact
    const handleDeleteClick = (id) => {
        handleContactDelete(id);
    };


    return (
        <div className={styles.parent}>
            <div className={`${styles.container} ${!showDeleteForm ? styles.show : styles.hide}`}>
                <h1>Delete this Contact?</h1>
                <div className={styles.buttonContainer}>
                    <button onClick={toggleContactForm} type="submit">cancel</button>
                    <button onClick={() => handleDeleteClick(contactId)} type="submit">delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteContactForm