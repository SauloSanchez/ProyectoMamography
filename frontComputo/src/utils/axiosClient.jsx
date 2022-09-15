import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = import.meta.env.VITE_LANDING_PAGE_PRUEBAS;

axiosClient.defaults.headers = {
  "Content-Type": "multipart/form-data",
  "Access-Control-Allow-Origin": "*",
  Accept: "*/*",
};

export function postRequest(URL, payload) {
  return new Promise((resolve, reject) => {
    axiosClient
      .post(`/${URL}`, payload)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

axiosClient.interceptors.request.use(
  function (request) {
    request.headers["Authorization"] = `Bearer ${sessionStorage.getItem(
      "token"
    )}`;
    return request;
  },
  null,
  { synchronous: true }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      sessionStorage.clear();
      localStorage.clear();
      toast.error("Sesión expirada, por favor inicia sesión nuevamente", {
        theme: "colored",
        autoClose: 2000,
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 2500);
    }
    return Promise.reject(error);
  }
);
