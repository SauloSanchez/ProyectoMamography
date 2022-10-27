import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = import.meta.env.VITE_LANDING_PAGE_PRODUCCION;

axiosClient.defaults.headers = {
  "Content-Type": "multipart/form-data",
  "Access-Control-Allow-Origin": "*",
  Accept: "*/*",
};

export function postRequestNode(URL, payload) {
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
