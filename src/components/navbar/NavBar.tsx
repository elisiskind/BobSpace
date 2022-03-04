import { Link } from "react-router-dom";
import React from "react";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <div className="nav-bar__root">
      <h1 className="nav-bar__title">BobSpace</h1>
      <nav className="nav-bar__links">
        <Link className="nav-bar__link" to="/feed">
          Live Feed
        </Link>
        <Link className="nav-bar__link" to="/messaging">
          Messaging
        </Link>
      </nav>
    </div>
  );
};