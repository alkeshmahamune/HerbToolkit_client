export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${p}`;
}

export function authHeaders() {
  const influencerToken = localStorage.getItem("influencerToken");
  const userToken = localStorage.getItem("userToken");
  const token = influencerToken || userToken;
  return token ? { Authorization: `Bearer ${token}` } : {};
}
