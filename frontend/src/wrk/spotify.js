import { get, post, put, redirect } from "../utils/request";
import {
  saveToken,
  getToken,
  removeToken,
  saveTokenExp,
  getTokenExp,
  removeTokenExp,
} from "../utils/storage";
import { getUrlParam } from "../utils/url";
import { millisToTime } from "../utils/time";
import constants from "../constants/constants";

const headers = {
  Authorization: `Bearer ${getToken()}`,
};

const imageQuality = 1;

const login = async () => {
  const token = getUrlParam("#access_token");
  const tokenExp = getUrlParam("expires_in");

  if (token && tokenExp) {
    saveToken(token);
    saveTokenExp(_calculateTokenExpTimestamp(tokenExp));
    redirect(constants.REDIRECT_URI);
    return false;
  }

  if (_testTokenExp() && getToken() !== "-") return true;

  removeToken();
  removeTokenExp();

  const params = {
    client_id: constants.CLIENT_ID,
    redirect_uri: constants.REDIRECT_URI,
    response_type: constants.RESPONSE_TYPE,
    scope: constants.SCOPES,
  };
  redirect("https://accounts.spotify.com/authorize", params);
};

const _calculateTokenExpTimestamp = (tokenExp) => {
  return new Date().getTime() + tokenExp * 1000;
};

const _testTokenExp = () => {
  const tokenExp = getTokenExp();
  if (!tokenExp) return false;
  if (new Date().getTime() > tokenExp) return false;
  return true;
};

const _checkTokenValidity = (response) => {
  if (response?.error?.status == 401) {
    removeToken();
    removeTokenExp();
    return login();
  }
  return true;
};

const getTopArtists = async () => {
  const params = {
    time_range: "medium_term",
    limit: 10,
  };

  let result = await get(
    "https://api.spotify.com/v1/me/top/artists",
    params,
    headers
  );

  const isTokenValid = _checkTokenValidity(result);
  if (!isTokenValid) return [];
  return _parseArtists(result);
};

const getTopTracks = async () => {
  const params = {
    time_range: "medium_term",
    limit: 50,
  };

  let result = await get(
    "https://api.spotify.com/v1/me/top/tracks",
    params,
    headers
  );

  const isTokenValid = _checkTokenValidity(result);
  if (!isTokenValid) return [];
  return _parseTracks(result.items);
};

const searchTracksAlbumPlaylistArtists = async (query) => {
  const params = {
    q: encodeURI(query),
    type: "track,album,playlist,artist",
    limit: 10,
  };

  let result = await get("https://api.spotify.com/v1/search", params, headers);

  const isTokenValid = _checkTokenValidity(result);
  if (!isTokenValid) return [];
  const tracks = _parseTracks(result.tracks.items);
  const albums = _parseAlbums(result.albums);
  const playlists = _parsePlaylists(result.playlists);
  const artists = _parseArtists(result.artists);

  return tracks.concat(albums, playlists, artists);
};

const skipToNext = async () => {
  const result = await post(
    "https://api.spotify.com/v1/me/player/next",
    null,
    headers
  );

  const isTokenValid = _checkTokenValidity(result);
  if (!isTokenValid) return [];
  return result;
};

const skipToPrevious = async () => {
  const result = await post(
    "https://api.spotify.com/v1/me/player/previous",
    null,
    headers
  );

  const isTokenValid = _checkTokenValidity(result);
  if (!isTokenValid) return [];
  return result;
};

const getArtist = async (id) => {
  let result = await get(
    "https://api.spotify.com/v1/artists/" + id,
    null,
    headers
  );

  const isTokenValid = _checkTokenValidity(result);
  if (!isTokenValid) return [];
  return result;
};

const getArtistAlbums = async (id) => {
  let result = await get(
    "https://api.spotify.com/v1/artists/" + id + "/albums",
    null,
    headers
  );

  const isTokenValid = _checkTokenValidity(result);
  if (!isTokenValid) return [];
  return _parseAlbums(result);
};

const getArtidtTopTracks = async (id) => {
  const params = {
    market: "CH",
  };

  let result = await get(
    "https://api.spotify.com/v1/artists/" + id + "/top-tracks",
    params,
    headers
  );

  const isTokenValid = _checkTokenValidity(result);
  if (!isTokenValid) return [];
  return _parseTracks(result.tracks);
};

const getPlaylists = async () => {
  const params = {
    limit: 50,
  };
  let result = await get(
    "https://api.spotify.com/v1/me/playlists",
    params,
    headers
  );

  const isTokenValid = _checkTokenValidity(result);
  if (!isTokenValid) return [];
  return _parsePlaylists(result);
};

const getPlaylist = async (id) => {
  let result = await get(
    "https://api.spotify.com/v1/playlists/" + id,
    null,
    headers
  );

  const isTokenValid = _checkTokenValidity(result);
  if (!isTokenValid) return [];
  return _parseTracks(result.tracks.items);
};

const getAlbum = async (id) => {
  let result = await get(
    "https://api.spotify.com/v1/albums/" + id,
    null,
    headers
  );

  const isTokenValid = _checkTokenValidity(result);
  if (!isTokenValid) return [];
  console.log(result.tracks.items);
  return _parseTracks(result.tracks.items);
};

const playTrack = async (id) => {
  const params = {
    uris: ["spotify:track:" + id],
  };

  const result = await put(
    "https://api.spotify.com/v1/me/player/play",
    params,
    headers
  );

  const isTokenValid = _checkTokenValidity(result);
  if (!isTokenValid) return [];
  return result;
};

const _parseArtists = (result) => {
  return result.items.map((item) => {
    return {
      name: item.name,
      id: item.id,
      image: item.images[imageQuality]?.url,
      type: item.type,
    };
  });
};

const _parseArtistsNames = (result) => {
  return result.artists.map((artist) => artist.name).join(" - ");
};

const _parseAlbums = (result) => {
  return result.items.map((item) => {
    return {
      name: item.name,
      id: item.id,
      artist: _parseArtistsNames(item),
      image: item.images[imageQuality].url,
      type: item.type,
    };
  });
};

const _parseTracks = (result) => {
  return result
    .map((item) => {
      if (item?.track) item = item.track;
      if (!item?.name) return null;
      return {
        name: item.name,
        artist: _parseArtistsNames(item),
        id: item.id,
        image: item.album?.images[imageQuality].url || "",
        type: item.type,
        duration: millisToTime(item.duration_ms),
      };
    })
    .filter((item) => item !== null);
};

const _parsePlaylists = (result) => {
  return result.items.map((item) => {
    return {
      name: item.name,
      id: item.id,
      image: item.images[imageQuality]
        ? item.images[imageQuality].url
        : item.images[0].url,
      type: item.type,
    };
  });
};

export {
  login,
  getTopArtists,
  getTopTracks,
  searchTracksAlbumPlaylistArtists,
  skipToNext,
  skipToPrevious,
  getArtist,
  getArtistAlbums,
  getArtidtTopTracks,
  getPlaylists,
  getPlaylist,
  getAlbum,
  playTrack,
};
