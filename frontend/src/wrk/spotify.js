import { get, post, redirect } from "../utils/request";
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
  result = result.items.map((item) => {
    return {
      name: item.name,
      id: item.id,
      image: item.images[0].url,
      type: item.type,
    };
  });

  return result;
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
  result = result.items.map((item) => {
    return {
      name: item.name,
      artist: item.artists.map((artist) => artist.name).join(" - "),
      id: item.id,
      image: item.album.images[0].url,
      type: item.type,
    };
  });
  return result;
};

const searchTracksAndAlbums = async (query) => {
  const params = {
    q: encodeURI(query),
    type: "track,album,artist",
    limit: 10,
  };

  let result = await get("https://api.spotify.com/v1/search", params, headers);

  const isTokenValid = _checkTokenValidity(result);
  if (!isTokenValid) return [];
  console.log(result);
  result = result.tracks.items.map((item) => {
    return {
      name: item.name,
      artist: item.artists.map((artist) => artist.name).join(" - "),
      id: item.id,
      image: item.album.images[0].url,
      type: item.type,
    };
  });

  return result;
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
  result = result.items.map((item) => {
    return {
      name: item.name,
      id: item.id,
      artist: item.artists.map((artist) => artist.name).join(" - "),
      image: item.images[0].url,
      type: item.type,
    };
  });
  return result;
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
  result = result.tracks.map((item) => {
    return {
      name: item.name,
      artist: item.artists.map((artist) => artist.name).join(" - "),
      id: item.id,
      image: item.album.images[0].url,
      duration : millisToTime(item.duration_ms) ,
      type: item.type,
    };
  });
  console.log(result)
  return result;
};

export {
  login,
  getTopArtists,
  getTopTracks,
  searchTracksAndAlbums,
  skipToNext,
  skipToPrevious,
  getArtist,
  getArtistAlbums,
  getArtidtTopTracks,
};
