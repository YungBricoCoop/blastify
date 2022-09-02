const login = async (client_id, redirect_uri, scope) => {
  const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=token`;
  window.location.href = url;
};

const getTopArtists = async (access_token) => {
  const url = `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const data = await response.json();
  return data;
};

export { login, getTopArtists };
