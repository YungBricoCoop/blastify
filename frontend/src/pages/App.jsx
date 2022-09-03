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
import { login, getTopArtists } from "../wrk/spotify";

function App() {
  // states
  const [spotifyData, setSpotifyData] = useState({
    topArtists: [],
    topTracks: [],
  });

  // handlers
  const onLoginClick = () => {
    login();
  };
  const handleLogin = async () => {
    const loginCompleted = await login();
    if (!loginCompleted) return;
    const topArtists = await getTopArtists();
  };

  // use effects
  useEffect(() => {
    handleLogin();
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
