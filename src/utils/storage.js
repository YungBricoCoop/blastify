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

const saveColorTheme = (theme) => {
  localStorage.setItem("blastify-color-theme", theme);
}

const getColorTheme = () => {
  return localStorage.getItem("blastify-color-theme") || "light";
}

const saveDisplayTimeRange = (timeRange) => {
  localStorage.setItem("blastify-display-time-range", timeRange);
}

const getDisplayTimeRange = () => {
  return localStorage.getItem("blastify-display-time-range") || "medium_term";
}



export {
  saveToken,
  getToken,
  removeToken,
  saveTokenExp,
  getTokenExp,
  removeTokenExp,
  saveColorTheme,
  getColorTheme,
  saveDisplayTimeRange,
  getDisplayTimeRange
};
