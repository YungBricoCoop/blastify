const saveToken = (token) => {
  localStorage.setItem("blastify-spotify-token", token);
};

const getToken = () => {
  return localStorage.getItem("blastify-spotify-token") || "";
};

const removeToken = () => {
  localStorage.removeItem("blastify-spotify-token");
};

export { saveToken, getToken, removeToken };