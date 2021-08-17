import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { render } from "react-dom";
import "./main.css";

const UI: () => JSX.Element = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect((): void => {
    setInterval((): void => {
      setTime(new Date());
    }, 1000);
  }, []);

  return (
    <div className="ui">
      <div className="time">
        {time.getHours()}:{time.getMinutes()}:{time.getSeconds()}
      </div>
    </div>
  );
};

render(
  <React.StrictMode>
    <UI />
  </React.StrictMode>,
  document.getElementById("root")
);
