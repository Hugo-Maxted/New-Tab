(this["webpackJsonpnew-tab"]=this["webpackJsonpnew-tab"]||[]).push([[0],{13:function(e,t,a){},7:function(e,t,a){"use strict";a.r(t);var n=a(4),c=a.n(n),s=a(5),r=a(2),i=a(1),o=a.n(i),l=a(6),u=(a(13),a(0)),d={links:{Media:[{name:"Youtube",link:"https://www.youtube.com"},{name:"Github",link:"https://github.com/Hugo-Maxted"}],Email:[{name:"IONOS Email",link:"https://email.ionos.co.uk/appsuite/?tl=y#!!&app=io.ox/mail&folder=default0/INBOX"},{name:"Gmail",link:"https://mail.google.com/mail/u/0/#inbox"}],School:[{name:"Outlook",link:"https://outlook.office.com/mail/inbox"},{name:"Nexus",link:"https://nexus.ccgs.wa.edu.au/"}]},city:"Perth"};localStorage.getItem("config")||localStorage.setItem("config",JSON.stringify(d)),d=JSON.parse(localStorage.getItem("config")||"");var h=function(){var e=Object(i.useState)(new Date),t=Object(r.a)(e,2),a=t[0],n=t[1],o=Object(i.useState)(null),l=Object(r.a)(o,2),h=l[0],m=l[1],b=Object(i.useState)("th"),j=Object(r.a)(b,2),p=j[0],f=j[1],O=d.links;return Object(i.useEffect)((function(){function e(){return t.apply(this,arguments)}function t(){return(t=Object(s.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(t=new Headers).append("pragma","no-cache"),t.append("cache-control","no-cache"),e.next=5,fetch(new Request("https://api.weatherapi.com/v1/current.json?key=e1830767ff0446e7a47132846211907&q="+d.city),{method:"GET",headers:t}).then((function(e){return e.json()})).then((function(e){m(e)}));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function a(){switch((new Date).getDate()){case 1:case 21:case 31:f("st");break;case 2:case 22:f("nd");break;case 3:case 23:f("rd");break;default:f("th")}}e(),a(),setInterval((function(){n(new Date),a()}),1e3),setInterval(e,6e4)}),[]),Object(u.jsxs)("div",{className:"ui",children:[Object(u.jsxs)("div",{className:"weather",children:[Object(u.jsx)("div",{children:null===h?"Loading...":h.current.temp_c+"\xb0C"}),Object(u.jsx)("div",{children:Object(u.jsx)("a",{href:"http://www.bom.gov.au/products/IDR704.loop.shtml",target:"_blank",rel:"noreferrer",children:null===h?"":h.current.condition.text})})]}),Object(u.jsxs)("div",{className:"time",children:[Object(u.jsxs)("div",{className:"time",children:[a.getHours(),":",a.getMinutes()<10?"0"+a.getMinutes():a.getMinutes()]}),Object(u.jsxs)("div",{className:"date",children:[["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][a.getDay()],", ",a.getDate(),p," of"," ",["January","February","March","April","May","June","July","August","September","October","November","December"][a.getMonth()]," ",a.getFullYear()]})]}),Object(u.jsxs)("div",{className:"links",style:{gridTemplateColumns:"1fr auto ".repeat(Object.keys(O).length)+" 1fr"},children:[Object(u.jsx)("div",{}),Object.keys(O).map((function(e){return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)("div",{className:"catagory",children:[Object(u.jsx)("div",{className:"title",children:e.toUpperCase()}),O[e].map((function(e){return Object(u.jsx)("a",{href:e.link,children:e.name})}))]}),Object(u.jsx)("div",{})]})}))]})]})};Object(l.render)(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(h,{})}),document.getElementById("root"))}},[[7,1,2]]]);