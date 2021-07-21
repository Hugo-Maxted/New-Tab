import React from "react";
import {render} from "react-dom";
import "./main.css";

render(
  <React.StrictMode>
    <div className="content center">content moment</div>
    <div className="settings">
      <i className="fas fa-cog"></i>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
