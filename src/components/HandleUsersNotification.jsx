import axios from "../api/axios";

const USERS_URL = "/users";
const NOTIFICATIONS_URL = "/notifications";

const handleUsersNotification = async (
  auth,
  getUserNotifications,
  errRef,
  setErrMsg,
  title,
  description,
  link
) => {
  const sendUserNotifications = (allUsers) => {
    for (let i = 0; i < allUsers.length; i++) {
      handleNotification(allUsers[i]);
    }
  };

  const handleNotification = async (user) => {
    try {
      const result = await axios.post(
        NOTIFICATIONS_URL,
        JSON.stringify({
          user_id: user._id,
          title: title,
          description: description,
          link: link,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(result?.data);
      getUserNotifications(auth.id);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg(err.response?.message);
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Order creation Failed");
        console.log(err);
      }
      errRef.current.focus();
    }
  };

  try {
    const result = await axios.get(USERS_URL);
    console.log(result?.data);
    sendUserNotifications(result?.data);
  } catch (err) {
    if (!err?.response) {
      setErrMsg("No Server Response");
    } else if (err.response?.status === 400) {
      setErrMsg(err.response?.message);
    } else if (err.response?.status === 401) {
      setErrMsg("Unauthorized");
    } else {
      setErrMsg("Get users not found!");
      console.log(err);
    }
    errRef.current.focus();
  }
};

export default handleUsersNotification;
