import React from "react";

const HorizonLine = ({ text }) => {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        borderBottom: "1px solid #d9d9d9",
        lineHeight: "0.1em",
        // margin: "10px 0 20px",
      }}
    >
      {text && (
        <span style={{ background: "#fff", padding: "0 10px" }}>{text}</span>
      )}
    </div>
  );
};

export default HorizonLine;
