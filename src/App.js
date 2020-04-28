/*global chrome*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [domain, setDomain] = useState("");
  const [success, setSuccess] = useState("");
  const [fullUrl, setFullUrl] = useState("");
  const now = new Date();
  const utc_timestamp = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
    now.getUTCMilliseconds()
  );
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = new URL(tabs[0].url);
      setDomain(url.hostname);
      setFullUrl(tabs[0].url);
      // this.getHeadlines(domain);
    });
  }, []);
  const onClick = () => {
    const obj = {
      timestamp: utc_timestamp,
      username: "user@user.com",
      domain: domain,
      url: fullUrl,
    };
    const username = {
      username: "admin",
      password: "admin",
    };
    console.log(JSON.stringify(username));
    return new Promise((resolve, reject) => {
      fetch("http://youta-api.ngrok.io/starter-project", {
        method: "post",
        headers: {
          Origin: "",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
          "Access-Control-Max-Age": "0",
          "Content-Security-Policy":
            "default-src *; connect-src *; script-src *; object-src *;",
          "X-Content-Security-Policy":
            "default-src *; connect-src *; script-src *; object-src *;",
          "X-Webkit-CSP":
            "default-src *; connect-src *; script-src 'unsafe-inline' 'unsafe-eval' *; object-src *",
        },
        body: JSON.stringify(obj),
      }).then((response) => {
        console.log(response);
        setSuccess(response.status);
      });
    });
  };
  return (
    <div className="App">
      <header className="Container">
        <h1>{domain}</h1>
        <button onClick={() => onClick()} className="submit_button">
          Submit
        </button>
        <h2>{success === 200 ? "Success" : ""}</h2>
      </header>
    </div>
  );
}

export default App;
