import axios from "axios";

export const $http = axios.create({
  baseURL: `https://data.jsdelivr.com/v1`,
});
