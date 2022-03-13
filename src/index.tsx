import React, {useEffect, useState} from "react";
import {render} from "react-dom";
import "./main.css";

let config: {
  links: linkType
  city: string
} = {
  links: {
    Media: [
      {name: "Youtube", link: "https://www.youtube.com"},
      {name: "Github", link: "https://github.com/Hugo-Maxted"},
    ],
    Email: [
      {name: "IONOS Email", link: "https://email.ionos.co.uk/appsuite/?tl=y#!!&app=io.ox/mail&folder=default0/INBOX"},
      {name: "Gmail", link: "https://mail.google.com/mail/u/0/#inbox"},
    ],
    School: [
      {name: "Outlook", link: "https://outlook.office.com/mail/inbox"},
      {name: "Nexus", link: "https://nexus.ccgs.wa.edu.au/"},
    ],
  },
  city: "Perth"
}

if (!localStorage.getItem("config")) localStorage.setItem("config", JSON.stringify(config));

config = JSON.parse(localStorage.getItem("config") || "") as {
  links: linkType
  city: string
};

interface linkType {
  [catagory: string]: {
    name: string;
    link: string;
  }[];
}

const UI: () => JSX.Element = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [weather, setWeather] = useState<any>(null);
  const [suffix, setSuffix] = useState<string>("th");

  let links: linkType = config.links;

  useEffect((): void => {
    async function getWeather(): Promise<any> {
      let header: Headers = new Headers();
      header.append("pragma", "no-cache");
      header.append("cache-control", "no-cache");

      await fetch(new Request("https://api.weatherapi.com/v1/current.json?key=e1830767ff0446e7a47132846211907&q="  + config.city), {
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

    function getSuffix(): void {
      switch (new Date().getDate()) {
        case 1:
        case 21:
        case 31:
          setSuffix("st");
          break;
        case 2:
        case 22:
          setSuffix("nd");
          break;
        case 3:
        case 23:
          setSuffix("rd");
          break;
        default:
          setSuffix("th");
          break;
      }
    }

    getWeather();
    getSuffix();

    setInterval((): void => {
      setTime(new Date());

      getSuffix();
    }, 1000);

    setInterval(getWeather, 60000);
  }, []);

  return (
    <div className="ui">
      <div className="weather">
        <div>{weather === null ? "Loading..." : weather.current.temp_c + "°C"}</div>
        <div>
          <a href="http://www.bom.gov.au/products/IDR704.loop.shtml" target="_blank" rel="noreferrer">
            {weather === null ? "" : weather.current.condition.text}
          </a>
        </div>
      </div>
      <div className="time">
        <div className="time">
          {time.getHours()}:{time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}
        </div>
        <div className="date">
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][time.getDay()]}, {time.getDate()}
          {suffix} of{" "}
          {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][time.getMonth()]} {time.getFullYear()}
        </div>
      </div>
      <div className="links" style={{ gridTemplateColumns: "1fr auto ".repeat(Object.keys(links).length) + " 1fr" }}>
        <div></div>
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
