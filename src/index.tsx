import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import {render} from "react-dom";
import "./main.css";

interface linkType {
  [catagory: string]: {
    name: string;
    link: string;
  }[];
}

const UI: () => JSX.Element = () => {
  const [time, setTime] = useState<Date>(new Date());

  let links: linkType = {
    MEDIA: [{name: "Youtube", link: "https://www.youtube.com"}],
    SCHOOL: [
      {name: "Connect", link: "https://connect.det.wa.edu.au/group/students/ui/overview"},
      {name: "Mathspace", link: "https://mathspace.co/student/"},
      {name: "Stile App", link: "https://stileapp.com/au/PMS_WA-988"},
    ],
    CODING: [{name: "Github", link: "https://github.com/Hugo-Maxted"}],
  };

  useEffect((): void => {
    setInterval((): void => {
      setTime(new Date());
    }, 1000);
  }, []);

  return (
    <div className="ui">
      <div className="weather">
        <div>69°C</div>
        <div>Flood</div>
      </div>
      <div className="timetable">
        <div>Hass</div>
        <div>27:69:20</div>
        <br />
        <div>Lunch</div>
        <div>Learning for life</div>
      </div>
      <div className="time">
        <div className="time">
        {time.getHours()}:{time.getMinutes() < 10 ? "0" : ""}
        {time.getMinutes()}:{time.getSeconds() < 10 ? "0" : ""}{time.getSeconds()}</div>
        <div className="date">
          {["Sunday", "Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday"][time.getDay()]}, {" "}
          {time.getDate()}
          {time.getDate() === 1 ? "st" : time.getDate() === 2 ? "nd" : time.getDate() === 3 ? "rd" : "th"} of{" "}
          {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][time.getMonth()]} {time.getFullYear()}
        </div>
      </div>
      <div className="links" style={{gridTemplateColumns: "1fr " + "auto 50px ".repeat(Object.keys(links).length - 1) + "auto 1fr"}}>
        <div></div>
        {Object.keys(links).map(
          (catagory: string): JSX.Element => (
            <>
              <div className="catagory">
                <div className="title">{catagory}</div>
                {links[catagory].map(
                  (link: {name: string; link: string}): JSX.Element => (
                      <a href={link.link}>{link.name}</a>
                  ),
                )}
              </div>
              <div></div>
            </>
          ),
        )}
      </div>
    </div>
  );
};

render(
  <React.StrictMode>
    <UI />
  </React.StrictMode>,
  document.getElementById("root"),
);
