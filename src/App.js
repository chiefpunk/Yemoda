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
    axios
      .post("http://youta-api.ngrok.io/starter-project", {
        timestamp: utc_timestamp,
        username: "user@user.com",
        domain: domain,
        url: fullUrl,
      })
      .then((response) => {
        console.log(response);
        //setData(response.data);
      });
  };
  return (
    <div className="App">
      <header className="Container">
        <h1>{domain}</h1>
        <button onClick={() => onClick()} className="submit_button">
          Submit
        </button>
      </header>
    </div>
  );
}

export default App;
