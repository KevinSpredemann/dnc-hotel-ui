import axios from "axios";

const APP_API = process.env.APP_API_URL;

const instance = axios.create({
  baseURL: APP_API ?? "http://localhost:3000",
  timeout: 10000,
});

export default instance;
