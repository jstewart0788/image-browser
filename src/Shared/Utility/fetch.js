import axios from "axios";

export const restVerbs = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE"
};

export const fetchConfig = async (url, method, body) => {
  const base = {
    url,
    method: (method || restVerbs.GET).toLowerCase(),
    data: method !== restVerbs.GET ? body || {} : undefined,
    params: method === restVerbs.GET ? body || {} : undefined,
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (!method || method === restVerbs.get || method === restVerbs.DELETE)
    delete base.body;
  return { ...base };
};

export const fetch = async (url, method, body) => {
  const config = await fetchConfig(url, method, body);
  return axios(config);
};

export const errorHandler = (err, push) => {
  if (!err.response) {
    const errorPackage = typeof err === "string" ? err : JSON.stringify(err);
    console.log(`Error: ${errorPackage}`);
  } else {
    const message = err.response.data.message
      ? err.response.data.message
      : err.response.data;
    console.log(`Error: ${message}`);
    if (err.response.status === 401 || err.response.status === 401) {
      if (push) {
        push("/login");
      }
    }
  }
};
