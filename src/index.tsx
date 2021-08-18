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
interface period {
  current: string;
  left: string;
  next1: string;
  next2: string;
}

const UI: () => JSX.Element = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [weather, setWeather] = useState<any>(null);
  const [period, setPeriod] = useState<period>({} as period);

  let links: linkType = {
    Media: [{name: "Youtube", link: "https://www.youtube.com"}],
    School: [
      {name: "Connect", link: "https://connect.det.wa.edu.au/group/students/ui/overview"},
      {name: "Mathspace", link: "https://mathspace.co/student/"},
      {name: "Stile App", link: "https://stileapp.com/au/PMS_WA-988"},
    ],
    Coding: [{name: "Github", link: "https://github.com/Hugo-Maxted"}],
  };

  let periods: number[][][] = [
    [
      [8, 45],
      [9, 0],
      [9, 55],
      [10, 50],
      [11, 15],
      [12, 10],
      [13, 5],
      [13, 40],
      [14, 35],
      [15, 30],
    ],
    [
      [8, 45],
      [9, 40],
      [10, 35],
      [10, 55],
      [11, 50],
      [12, 45],
      [13, 25],
      [14, 20],
      [15, 15],
    ],
    [
      [8, 45],
      [9, 40],
      [10, 35],
      [10, 55],
      [11, 50],
      [12, 45],
      [13, 25],
      [14, 20],
      [15, 15],
    ],
    [
      [8, 45],
      [9, 40],
      [10, 35],
      [10, 55],
      [11, 50],
      [12, 30],
      [13, 10],
      [14, 5],
      [15, 0],
    ],
    [
      [8, 45],
      [9, 0],
      [9, 55],
      [10, 50],
      [11, 15],
      [12, 10],
      [13, 5],
      [13, 40],
      [14, 35],
      [15, 30],
    ],
  ];

  let timetable = [
    [
      ["Advo", "Maths", "Maths", "Recess", "PE", "Careers", "Lunch", "Science", "Wood"],
      ["Food", "Food", "Recess", "Italian", "Coding", "Lunch", "HASS", "English"],
      ["Learning For Life", "Learning For Life", "Recess", "HASS", "HASS", "Lunch", "Innovations", "Innovations"],
      ["English", "English", "Recess", "Innovations", "Advo", "Lunch", "Health", "Wood"],
      ["Italian", "Italian", "Recess", "Science", "Science", "Lunch", "PE", "Maths"],
    ],
  ];

  useEffect((): void => {
    async function getWeather(): Promise<any> {
      let header: Headers = new Headers();
      header.append("pragma", "no-cache");
      header.append("cache-control", "no-cache");

      await fetch(new Request("https://api.weatherapi.com/v1/current.json?key=e1830767ff0446e7a47132846211907&q=Perth"), {
        method: "GET",
        headers: header,
      })
        .then((response: Response): Promise<any> => {
          return response.json();
        })
        .then((data: any): void => {
          setWeather(data);
        });
    }

    function getPeriod(): void {
      let currentTime = new Date().getTime();

      function getPeriodTime(period: number[]): number {
        let date = new Date();

        date.setHours(period[0]);
        date.setMinutes(period[1]);
        date.setSeconds(0);

        return date.getTime();
      }

      periods[time.getDay() - 1].forEach((val: number[], index: number): void => {
        if (currentTime >= getPeriodTime(val) && currentTime < getPeriodTime(periods[time.getDay() - 1][index + 1])) {
          let left = new Date(getPeriodTime(periods[time.getDay() - 1][index + 1]) - currentTime);

          let minutes = left.getMinutes();
          let seconds = left.getSeconds();

          setPeriod({
            current: timetable[0][time.getDay() - 1][index] || "",
            left: (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds),
            next1: timetable[0][time.getDay() - 1][index + 1] || "",
            next2: timetable[0][time.getDay() - 1][index + 2] || "",
          });
        }
      });
    }

    getWeather();
    getPeriod();

    setInterval((): void => {
      setTime(new Date());

      getPeriod();
    }, 1000);

    setInterval(getWeather, 60000);
  }, []);

  return (
    <div className="ui">
      <div className="weather">
        <div>{weather === null ? "Loading..." : weather.current.temp_c + "°C"}</div>
        <div>{weather === null ? "" : weather.current.condition.text}</div>
      </div>
      <div className="timetable">
        {time.getDay() === 0 || time.getDay() === 6 ? (
          ""
        ) : (
          <>
            <div>{period.current}</div>
            <div>{period.left}</div>
            <br />
            <div>{period.next1}</div>
            <div>{period.next2}</div>
          </>
        )}
      </div>
      <div className="time">
        <div className="time">
          {time.getHours()}:{time.getMinutes() < 10 ? "0" : ""}
          {time.getMinutes()}:{time.getSeconds() < 10 ? "0" : ""}
          {time.getSeconds()}
        </div>
        <div className="date">
          {["Sunday", "Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday"][time.getDay()]}, {time.getDate()}
          {time.getDate().toString().split("")[1] === "1" ? "st" : time.getDate().toString().split("")[1] === "2" ? "nd" : time.getDate().toString().split("")[1] === "3" ? "rd" : "th"} of{" "}
          {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][time.getMonth()]} {time.getFullYear()}
        </div>
      </div>
      <div className="links" style={{gridTemplateColumns: "auto 50px ".repeat(Object.keys(links).length - 1) + "auto"}}>
        {Object.keys(links).map(
          (catagory: string): JSX.Element => (
            <>
              <div className="catagory">
                <div className="title">{catagory.toUpperCase()}</div>
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
