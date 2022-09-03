import { get, redirect } from "../utils/request";
import {
  saveToken,
  getToken,
  removeToken,
  saveTokenExp,
  getTokenExp,
  removeTokenExp,
} from "../utils/storage";
import { getUrlParam } from "../utils/url";
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
      album_type: item.album.album_type,
    };
  });
  return result;
};

const searchTracksAndAlbums = async (query) => {
  const params = {
    q: encodeURI(query),
    type: "track,album",
    limit: 10,
  };

  let result = await get("https://api.spotify.com/v1/search", params, headers);

  const isTokenValid = _checkTokenValidity(result);
  if (!isTokenValid) return [];

  result = result.tracks.items.map((item) => {
    return {
      name: item.name,
      artist: item.artists.map((artist) => artist.name).join(" - "),
      id: item.id,
      image: item.album.images[0].url,
      type: item.type,
      album_type: item.album.album_type,
    };
  });

  return result;
};

export { login, getTopArtists, getTopTracks, searchTracksAndAlbums };
