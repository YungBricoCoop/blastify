// react
import { useState, useEffect } from "react";

// css
import "../css/App.css";

// components
import Toolbar from "../components/Toolbar";
import Dock from "../components/Dock";
import ArrowsCarousel from "../components/ArrowsCarousel";
import ItemsGrid from "../components/ItemsGrid";
import MultiDisplayItems from "../components/MultiDisplayItems";
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
  getPlaylists,
  getPlaylist,
  getAlbum,
  playTrack,
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
  const [displaySettings, setDisplaySettings] = useState(false);
  // search, top-tracks, playlists, album, artist, artist-albums
  const [displayType, setDisplayType] = useState("top-tracks");
  const [displayHistory, setDisplayHistory] = useState([]);

  // handlers
  const onLoginClick = () => {
    login();
  };

  const handleLogin = async () => {
    const loginCompleted = await login();
    if (!loginCompleted) return;
    const topArtists = await getTopArtists();
    const topTracks = await getTopTracks();
    const playlists = await getPlaylists();
    if (topArtists && topTracks && playlists)
      setSpotifyData({ ...spotifyData, topArtists, topTracks, playlists });
  };

  const handleNext = () => {
    setOffset(offset + 1);
  };

  const handlePrevious = () => {
    if (offset > 0) setOffset(offset - 1);
  };

  const handleDisplayArtist = async (artist) => {
    const artistAlbums = await getArtistAlbums(artist.id);
    const artistTopTracks = await getArtidtTopTracks(artist.id);
    setDisplayType("artist");
    setOffset(0);
    setSpotifyData({
      ...spotifyData,
      artist,
      artistAlbums,
      artistTopTracks,
    });
  };

  const handleDisplayPlaylist = async (playlist) => {
    const playlistTracks = await getPlaylist(playlist.id);
    setDisplayType("playlist");
    setSpotifyData({
      ...spotifyData,
      playlistTracks,
      playlist,
    });
  };

  const handleDisplayAlbum = async (album) => {
    const albumTracks = await getAlbum(album.id);
    setDisplayType("album");
    setSpotifyData({
      ...spotifyData,
      albumTracks,
      album,
    });
  };

  const handleItemClick = async (item) => {
    addDisplayToHistory();
    if (item === "playlists" || item === "top-tracks") {
      setDisplayType(item);
      return;
    }

    if (item?.type === "artist") {
      handleDisplayArtist(item);
    }
    if (item?.type === "track") {
      playTrack(item.id);
    }
    if (item?.type === "playlist") {
      handleDisplayPlaylist(item);
    }
    if (item?.type === "album") {
      handleDisplayAlbum(item);
    }
  };

  const handleShowLastDisplay = () => {
    const display = displayHistory.reverse().find((display) => {
      return display.displayType !== displayType;
    });
    if (display) {
      setDisplayType(display.displayType);
      setOffset(display.offset);
    }
  };

  const addDisplayToHistory = () => {
    setDisplayHistory([...displayHistory, { displayType, offset }]);
  };
  // use effects
  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <div className="App">
      <Toolbar
        onLoginClick={onLoginClick}
        onHomeClick={() => handleItemClick("top-tracks")}
        onLibraryClick={() => handleItemClick("playlists")}
        onPreviousTrack={skipToPrevious}
        onNextTrack={skipToNext}
        onSearchClick={() => setDisplaySearch(true)}
        onSettingsClick={() => setDisplaySettings(true)}
      />
      {displayType === "top-tracks" && (
        <ItemsGrid
          data={spotifyData.topTracks}
          offset={offset}
          onItemGridClick={handleItemClick}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
      {displayType === "playlists" && (
        <ItemsGrid
          data={spotifyData.playlists}
          offset={offset}
          onItemGridClick={handleItemClick}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
      {displayType === "artist" && (
        <MultiDisplayItems
          list={spotifyData.artistTopTracks}
          grid={spotifyData.artistAlbums}
          data={spotifyData.artist}
          display={offset === 0 ? "list" : "grid"}
          offset={offset}
          onItemClick={handleItemClick}
          onClose={handleShowLastDisplay}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
      {(displayType === "playlist" ||
        displayType === "album") && (
          <MultiDisplayItems
            list={displayType === "playlist" ? spotifyData.playlistTracks : spotifyData.albumTracks}
            data={displayType === "playlist" ? spotifyData.playlist : spotifyData.album}
            offset={offset}
            onItemClick={handleItemClick}
            onClose={handleShowLastDisplay}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}

      <Dock data={spotifyData.topArtists} onDockItemClick={handleItemClick} />
      <Search
        display={displaySearch}
        onChange={setSearch}
        onEnter={() => {}}
        onClose={() => {
          setDisplaySearch(false);
        }}
      />
    </div>
  );
}

export default App;
