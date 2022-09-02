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
  const [spotifyData, setSpotifyData] = useState({
    topArtists: [],
    topTracks: [],
  })
  
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
    getTopArtists(token).then((data) => {
      setSpotifyData({
        ...spotifyData,
        topArtists: data.items.map((item) => {
          return {
            name: item.name,
            image: item.images[0].url,
          };
        }),
      });
    });
  }, []);

  return (
    <div className="App">
      <Toolbar onLoginClick={onLoginClick} />
      <Dock data={spotifyData.topArtists} />
      <ArrowsCarousel />
    </div>
  );
}

export default App;
