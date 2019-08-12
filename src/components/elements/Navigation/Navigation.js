import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

export default function Navigation({ movie }) {
  return (
    <div className="rmdb-navigation">
      <div className="rmdb-navigation-content">
        <Link to="/">
          <p>Home</p>
          <p>/</p>
          <p>{movie}</p>
        </Link>
      </div>
    </div>
  );
}
