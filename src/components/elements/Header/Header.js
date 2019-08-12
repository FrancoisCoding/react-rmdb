import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <div className="rmdb-header">
      <div className="rmdb-header-content">
        <Link to="/">
          <img
            src="./images/reactMovie_logo.png"
            alt="RMDB-Logo"
            className="rmdb-logo"
          />
        </Link>
        <img
          src="./images/tmdb_logo.png"
          alt="TMDB-Logo"
          className="rmdb-tmdb-logo"
        />
      </div>
    </div>
  );
}
