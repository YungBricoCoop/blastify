const get = async (url, params, headers) => {
  const response = await fetch(
    _buildUrl(url, params),
    _buildBodyAndHeaders("GET", params, headers)
  );
  try {
    const data = await response.json();
    return data;
  } catch (e) {
    return {};
  }
};

const post = async (url, params, headers) => {
  const response = await fetch(
    url,
    _buildBodyAndHeaders("POST", params, headers)
  );
  try {
    const data = await response.json();
    return data;
  } catch (e) {
    return {};
  }
};

const put = async (url, params, headers) => {
  const response = await fetch(
    url,
    _buildBodyAndHeaders("PUT", params, headers)
  );
  try {
    const data = await response.json();
    return data;
  } catch (e) {
    return {};
  }
};

const redirect = (url, params) => {
  window.location.href = _buildUrl(url, params);
};

const _buildUrl = (url, params) => {
  if (!params) return url;
  const urlParams = new URLSearchParams(params);
  return `${url}?${urlParams.toString()}`;
};

const _buildBodyAndHeaders = (type = "GET", params = {}, headers = {}) => {
  if (type === "GET") return { headers: headers };
  else return { method: type, body: JSON.stringify(params), headers: headers };
};

export { get, post, put, redirect };
