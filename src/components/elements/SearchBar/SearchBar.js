import React, { useState } from "react";
import FontAwesome from "react-fontawesome";
import "./SearchBar.css";

export default function SearchBar(props) {
  const [value, setValue] = useState("");

  var timeout = null;

  const doSearch = event => {
    setValue(event.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      props.callback(value);
    }, 500);
  };
  return (
    <div className="rmdb-searchbar">
      <div className="rmdb-searchbar-content">
        <FontAwesome className="rmdb-fa-search" name="search" size="2x" />
        <input
          type="text"
          className="rmdb-searchbar-input"
          placeholder="Search Movies..."
          value={value}
          onChange={doSearch}
        />
      </div>
    </div>
  );
}
