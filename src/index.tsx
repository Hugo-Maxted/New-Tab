import React, {useEffect, useState} from "react";
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
  next: string[];
}

const UI: () => JSX.Element = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [weather, setWeather] = useState<any>(null);
  const [period, setPeriod] = useState<period>({} as period);
  const [suffix, setSuffix] = useState<string>("th");

  let links: linkType = {
    Media: [
      {name: "Youtube", link: "https://www.youtube.com"},
      {name: "Github", link: "https://github.com/Hugo-Maxted"},
    ],
    School: [
      {name: "Connect", link: "https://connect.det.wa.edu.au/group/students/ui/overview"},
      {name: "Mathspace", link: "https://mathspace.co/student/"},
      {name: "Stile App", link: "https://stileapp.com/au/PMS_WA-988"},
    ],
    Apps: [
      {name: "Outlook", link: "https://outlook.office.com/mail/inbox"},
      {name: "IONOS Email", link: "https://email.ionos.co.uk/appsuite/?tl=y#!!&app=io.ox/mail&folder=default0/INBOX"},
      {name: "Passwords", link: "https://passwords.google.com/"},
    ],
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
      ["Advo", "Italian", "Italian", "Recess", "Science", "Science", "Lunch", "PE", "Maths"],
    ],
    [
      ["Advo", "Maths", "Maths", "Recess", "Science", "Food", "Lunch", "Learning For Life", "Careers"],
      ["Wood", "Wood", "Recess", "Italian", "Coding", "Lunch", "HASS", "English"],
      ["HASS", "HASS", "Recess", "PE", "PE", "Lunch", "Innovations", "Innovations"],
      ["English", "English", "Recess", "Innovations", "Advo", "Lunch", "Food", "Health"],
      ["Advo", "Science", "Science", "Recess", "Italian", "Italian", "Lunch", "Maths", "Learning For Life"],
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
      let week = Math.ceil(((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / 86400000 + new Date(new Date().getFullYear(), 0, 1).getDay() + 1) / 7) % 2 === 0 ? 0 : 1;

      function getPeriodTime(period: number[]): number {
        let date = new Date();

        date.setHours(period[0]);
        date.setMinutes(period[1]);
        date.setSeconds(0);

        return date.getTime();
      }

      if (new Date().getDay() === 0 || new Date().getDay() === 6) {
        setPeriod({
          current: "",
          left: "",
          next: [],
        });

        return;
      } else if (getPeriodTime(periods[time.getDay() - 1][periods[time.getDay() - 1].length - 1]) < currentTime) {
        setPeriod({
          current: "",
          left: "",
          next: [],
        });
      } else {
        periods[time.getDay() - 1].forEach((val: number[], index: number): void => {
          if (index === 0 && currentTime < getPeriodTime(val)) {
            let hours = new Date(getPeriodTime(val)).getHours() - new Date(currentTime).getHours();
            let minutes = new Date(getPeriodTime(val) - currentTime).getMinutes();
            let seconds = new Date(getPeriodTime(val) - currentTime).getSeconds();

            setPeriod({
              current: "",
              left: (hours - (minutes > val[1] ? 1 : 0)) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds),
              next: timetable[week][time.getDay() - 1],
            });
          } else if (currentTime >= getPeriodTime(val) && currentTime < getPeriodTime(periods[time.getDay() - 1][index + 1])) {
            let minutes = new Date(getPeriodTime(periods[time.getDay() - 1][index + 1]) - currentTime).getMinutes();
            let seconds = new Date(getPeriodTime(periods[time.getDay() - 1][index + 1]) - currentTime).getSeconds();

            setPeriod({
              current: timetable[week][time.getDay() - 1][index],
              left: "0:" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds),
              next: timetable[week][time.getDay() - 1].slice(index + 1),
            });
          }
        });
      }
    }

    function getSuffix(): void {
      switch (new Date().getDate()) {
        case 1:
        case 11:
        case 21:
        case 31:
          setSuffix("st");
          break;
        case 2:
        case 12:
        case 22:
          setSuffix("nd");
          break;
        case 3:
        case 13:
        case 23:
          setSuffix("rd");
          break;
        default:
          setSuffix("th");
          break;
      }
    }

    getWeather();
    getPeriod();
    getSuffix();

    setInterval((): void => {
      setTime(new Date());

      getPeriod();

      getSuffix();
    }, 1000);

    setInterval(getWeather, 60000);
  }, []);

  return (
    <div className="ui">
      <div className="weather">
        <div>{weather === null ? "Loading..." : weather.current.temp_c + "°C"}</div>
        <div>
          <a href="http://www.bom.gov.au/products/IDR704.loop.shtml" target="_blank">
            {weather === null ? "" : weather.current.condition.text}
          </a>
        </div>
      </div>
      <div className="timetable">
        <div className={period.current}>{period.current}</div>
        <div>{period.left}</div>
        <br />
        {period.next?.map((val: string): JSX.Element => {
          return <div className={val}>{val}</div>;
        })}
      </div>
      <div className="time">
        <div className="time">
          {time.getHours()}:{time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}:{time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()}
        </div>
        <div className="date">
          {["Sunday", "Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday"][time.getDay()]}, {time.getDate()}
          {suffix} of{" "}
          {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][time.getMonth()]} {time.getFullYear()}
        </div>
      </div>
      <div className="links" style={{gridTemplateColumns: "auto 1fr ".repeat(Object.keys(links).length - 1) + "auto"}}>
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
