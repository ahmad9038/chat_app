import React, { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import styles from '../css/MessageTypSection.module.css';

const MessageTypeSection = ({ selectedContact }) => {
    const [content, setContent] = useState('');

    const postData = async (e) => {
        e.preventDefault();
        const res = await fetch('/createMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ contactId: selectedContact, content }),
        });
        const data = await res.json();

        if (data.message) {
            setContent('');
        }
    };

    const handleInputs = (e) => {
        setContent(e.target.value);
    };

    return (
        <form method="POST" className={styles.form}>
            <input
                value={content}
                onChange={handleInputs}
                type="text"
                placeholder="Type a message..."
                className={styles.inputField}
            />
            {content !== '' && (
                <div onClick={postData} type="submit" className={styles.sendIcon}>
                    <AiOutlineSend />
                </div>
            )}
        </form>
    );
};

export default MessageTypeSection;
