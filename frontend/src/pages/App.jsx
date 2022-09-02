// react
import { useState, useEffect } from "react";

// css
import "../css/App.css";

// components
import Toolbar from "../components/Toolbar";
import Dock from "../components/Dock";
import ArrowsCarousel from "../components/ArrowsCarousel";
import constants from "../constants/constants";

// functions
import { login,getTopArtists } from "../api/spotify";

function App() {
  // states
  const [token, setToken] = useState("")
  
  // handlers
  const onLoginClick = () => {
    login(constants.CLIENT_ID, constants.REDIRECT_URI, constants.SCOPES);
  };

  // use effects
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
    getTopArtists(token);
  }, []);

  return (
    <div className="App">
      <Toolbar onLoginClick={onLoginClick} />
      <Dock />
      <ArrowsCarousel />
    </div>
  );
}

export default App;
