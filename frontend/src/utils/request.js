const get = async (url, params, headers) => {
  const response = await fetch(_buildUrl(url, params), {
    headers: headers,
  });
  const data = await response.json();
  return data;
};

const post = async (url, params, headers) => {
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(params),
  });
  const data = await response.json();
  return data;
};

const redirect = (url, params) => {
  window.location.href = _buildUrl(url, params);
};

const _buildUrl = (url, params) => {
  if (!params) return url;
  const urlParams = new URLSearchParams(params);
  return `${url}?${urlParams.toString()}`;
};

export { get, post, redirect };
