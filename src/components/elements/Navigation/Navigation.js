import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

export default function Navigation(props) {
  return (
    <div className="rmdb-navigation">
      <div className="rmdb-navigation-content">
        <Link to="/">
          <p>Home</p>
          <p>/</p>
          <p>{props.movie}</p>
        </Link>
      </div>
    </div>
  );
}
