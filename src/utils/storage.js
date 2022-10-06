const saveToken = (token) => {
  localStorage.setItem("blastify-spotify-token", token);
};

const getToken = () => {
  return localStorage.getItem("blastify-spotify-token") || "-";
};

const removeToken = () => {
  localStorage.removeItem("blastify-spotify-token");
};

const saveTokenExp = (date) => {
  localStorage.setItem("blastify-spotify-token-exp", date);
};

const getTokenExp = () => {
  return localStorage.getItem("blastify-spotify-token-exp");
};

const removeTokenExp = () => {
  localStorage.removeItem("blastify-spotify-token-exp");
};

export {
  saveToken,
  getToken,
  removeToken,
  saveTokenExp,
  getTokenExp,
  removeTokenExp,
};
