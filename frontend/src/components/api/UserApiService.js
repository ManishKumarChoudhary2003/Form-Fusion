import { ApiClient } from "./ApiClient";

export const welcomeApi = () =>
  ApiClient.get(`/auth/welcome`);
