import React from "react";
import "App.css";
import { Outlet } from "react-router-dom";
import { NavBar } from "./components/navbar";

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <div className="app__content">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
