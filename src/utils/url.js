const getUrlParam = (param) => {
  return new URLSearchParams(window.location.hash).get(param);
};

export { getUrlParam };
