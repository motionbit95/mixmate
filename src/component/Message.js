import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { useAuthState } from "../js/Hooks";
import firebase from "firebase/compat/app";

export const formatDate = (date) => {
  let formattedDate = "";
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = format(date, "a hh:mm");
  }
  return formattedDate;
};

const Message = ({
  createdAt = null,
  text = "",
  uid = "",
  displayName = "",
  photoURL = "",
}) => {
  const { user } = useAuthState(firebase.auth());

  const isSender = user?.uid === uid;

  if (!text) return null;

  return (
    <div className={isSender ? "message-reverse" : "message"}>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-end",
          flexDirection: isSender ? "row-reverse" : "row",
        }}
      >
        {/* {photoURL ? (
          <img
            src={photoURL}
            alt="Avatar"
            className="circle"
            width={45}
            height={45}
          />
        ) : null} */}
        <div
          style={{
            width: "fit-content",
          }}
          className={isSender ? "sender" : "receiver"}
        >
          <p>{text}</p>
        </div>
        <div>
          {createdAt?.seconds ? (
            <div style={{ fontSize: "13px", color: "#8c8c8c" }}>
              {formatDate(new Date(createdAt.seconds * 1000))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string,
  createdAt: PropTypes.shape({
    seconds: PropTypes.number,
  }),
  uid: PropTypes.string,
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
};

export default Message;
