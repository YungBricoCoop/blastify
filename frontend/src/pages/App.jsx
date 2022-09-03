// react
import { useState, useEffect, useRef } from "react";

// css
import "../css/App.css";

// components
import Toolbar from "../components/Toolbar";
import Dock from "../components/Dock";
import ArrowsCarousel from "../components/ArrowsCarousel";
import ItemsGrid from "../components/ItemsGrid";
import Search from "../components/Search";

// functions
import { login, getTopArtists, getTopTracks } from "../wrk/spotify";
import { getToken } from "../utils/storage";

function App() {
  // states
  const [spotifyData, setSpotifyData] = useState({
    topArtists: [],
    topTracks: [],
  });
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  // handlers
  const onLoginClick = () => {
    login();
  };

  const handleLogin = async () => {
    const loginCompleted = await login();
    if (!loginCompleted) return;
    const topArtists = await getTopArtists();
    const topTracks = await getTopTracks();
    if (topArtists && topTracks)
      setSpotifyData({ ...spotifyData, topArtists, topTracks });
  };

  const handleNext = () => {
    setOffset(offset + 1);
  }
  const handlePrevious = () => {
    if(offset > 0) setOffset(offset - 1);
  }

  // use effects
  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <div className="App">
      <Toolbar onLoginClick={onLoginClick} onSearchClick={() => setDisplaySearch(true)} />
      <ItemsGrid data={spotifyData.topTracks} offset={offset}  />
      <Dock
        data={spotifyData.topArtists}
        onDockItemClick={() => {}}
      />
      <ArrowsCarousel onNext={handleNext} onPrevious={handlePrevious}/>
      <Search display={displaySearch} onChange={setSearch} onEnter={() => setDisplaySearch(false)}/>
    </div>
  );
}

export default App;
