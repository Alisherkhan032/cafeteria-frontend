import { API_BASE_URL } from "@/utils/apiConfigs";
import axios from "axios";

function axiosAuthConfig(method, url, body = {}, params = {}) {
  const token = localStorage.getItem("token");

  return {
    method,
    url,
    data: body,
    params,  // Include params properly
    headers: {
      Authorization: `Bearer ${token}`,
    },
    baseURL: API_BASE_URL,
  };
}

export async function makeApiCall(method, url, body, params) {
  const response = await axios.request(axiosAuthConfig(method, url, body, params));
  return response.data;
}
