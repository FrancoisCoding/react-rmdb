import React from "react";
import "./LoadMoreBtn.css";

export default function LoadMoreBtn({ onClick, text }) {
  return (
    <div className="rmdb-loadmorebtn" onClick={onClick}>
      <p>{text}</p>
    </div>
  );
}
