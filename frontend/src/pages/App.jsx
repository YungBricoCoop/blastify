// react
import { useState, useEffect } from "react";

// css
import "../css/App.css";

// components
import Toolbar from "../components/Toolbar";
import Dock from "../components/Dock";
import ArrowsCarousel from "../components/ArrowsCarousel";
import ItemsGrid from "../components/ItemsGrid";
import ListItems from "../components/ListItems";
import Search from "../components/Search";

// functions
import {
  login,
  getTopArtists,
  getTopTracks,
  searchTracksAndAlbums,
  skipToNext,
  skipToPrevious,
  getArtist,
  getArtistAlbums,
  getArtidtTopTracks,
} from "../wrk/spotify";
import { getToken } from "../utils/storage";

function App() {
  // states
  const [spotifyData, setSpotifyData] = useState({
    topArtists: [],
    topTracks: [],
    searchResults: [],
    artist: {},
    artistAlbums: [],
    artistTopTracks: [],
  });
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  // search, top-tracks, playlists, album, artist, artist-albums
  const [displayType, setDisplayType] = useState("top-tracks");
  const [displayTypeHistory, setDisplayTypeHistory] = useState([]);

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
  };

  const handlePrevious = () => {
    if (offset > 0) setOffset(offset - 1);
  };

  const handleDisplayArtist = async (artist) => {
    setDisplayType("artist");
    const artistAlbums = await getArtistAlbums(artist.id);
    const artistTopTracks = await getArtidtTopTracks(artist.id);
    setSpotifyData({
      ...spotifyData,
      artist,
      artistAlbums,
      artistTopTracks,
    });
  };

  const handleItemClick = async (item) => {
    addDisplayTypeToHistory();
    if (item?.type === "artist") {
      handleDisplayArtist(item);
    }
  };

  const handleDisplayLastType = () => {
    const lastType = displayTypeHistory[displayTypeHistory.length - 1];
    if (lastType) {
      setDisplayType(lastType);
    }
  };

  const addDisplayTypeToHistory = () => {
    setDisplayTypeHistory([...displayTypeHistory, displayType]);
  };
  // use effects
  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <div className="App">
      <Toolbar
        onLoginClick={onLoginClick}
        onSearchClick={() => setDisplaySearch(true)}
        onPreviousTrack={skipToPrevious}
        onNextTrack={skipToNext}
      />
      {displayType === "top-tracks" && (
        <ItemsGrid
          data={spotifyData.topTracks}
          offset={offset}
          onItemGridClick={console.log}
        />
      )}
      {displayType === "artist" && (
        <ListItems
          list={spotifyData.artistTopTracks}
          grid={spotifyData.artistAlbums}
          data={spotifyData.artist}
          onListItemClick={handleItemClick}
          onCloseClick={handleDisplayLastType}
        />
      )}

      <Dock data={spotifyData.topArtists} onDockItemClick={handleItemClick} />
      <ArrowsCarousel onNext={handleNext} onPrevious={handlePrevious} />
      <Search
        display={displaySearch}
        onChange={setSearch}
        onEnter={() => {}}
        onClose={() => {
          setDisplaySearch(false);
          handleDisplayLastType();
        }}
      />
    </div>
  );
}

export default App;
