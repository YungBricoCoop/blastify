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

const getTopArtists = async (access_token) => {
  const url = `?time_range=medium_term&limit=10`;
  const params = {
    time_range: "medium_term",
    limit: 10,
  };
  const result = await get(
    "https://api.spotify.com/v1/me/top/artists",
    params,
    headers
  );
  return result;
};

export { login, getTopArtists };
