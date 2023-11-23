const getSenderName = (loggedUser, users) => {
  if (users && users.length >= 2 && loggedUser && loggedUser._id) {
    return users[0]._id === loggedUser._id
      ? users[1].userName
      : users[0].userName;
  } else {
    // Handle the case when the data is not available yet
    return "Loading...";
  }
};

const getSenderFull = (loggedUser, users) => {
  if (users && users.length >= 2 && loggedUser && loggedUser._id) {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  } else {
    // Handle the case when the data is not available yet
    return "Loading...";
  }
};

const getSenderPhone = (loggedUser, users) => {
  if (users && users.length >= 2 && loggedUser && loggedUser._id) {
    return users[0]._id === loggedUser._id ? users[1].phone : users[0].phone;
  } else {
    // Handle the case when the data is not available yet
    return "Loading...";
  }
};

const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i + 1].sender._id !== userId
  );
};

const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 0;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

module.exports = {
  getSenderName,
  getSenderPhone,
  getSenderFull,
  isSameSender,
  isLastMessage,
  isSameSenderMargin,
  isSameUser,
};
