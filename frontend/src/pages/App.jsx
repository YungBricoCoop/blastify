// react
import { useState, useEffect } from "react";

// css
import "../css/App.css";

// components
import Toolbar from "../components/Toolbar";
import Dock from "../components/Dock";
import ArrowsCarousel from "../components/ArrowsCarousel";
import ItemsGrid from "../components/ItemsGrid";

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
    if (topArtists) setSpotifyData({ ...spotifyData, topArtists });
  };

  // use effects
  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <div className="App">
      <Toolbar onLoginClick={onLoginClick} />
      <ItemsGrid data={spotifyData.topArtists} />
      <Dock
        data={spotifyData.topArtists}
        onDockItemClick={() => console.log("asd")}
      />
      <ArrowsCarousel />
    </div>
  );
}

export default App;
