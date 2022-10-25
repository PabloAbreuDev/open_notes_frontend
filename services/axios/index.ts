import axios, { AxiosError } from "axios";
import { parseCookies, destroyCookie } from "nookies";

export function getApiClient(ctx?: any) {
  const { "@opennotes:token": token } = parseCookies();

  const api = axios.create({
    baseURL: "http://localhost:9000",
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
  });

  api.interceptors.response.use(
    function (config) {
      return config;
    },
    async function (error) {
      if (error.response.status === 403) {
        // Redirect pra home e destroy o cookie
        destroyCookie(ctx, "@opennotes:token");
        window.location.href = "/signin";
      }
    }
  );

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  return api;
}
