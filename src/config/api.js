export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${p}`;
}

export function authHeaders() {
  const userToken = localStorage.getItem("userToken");
  const influencerToken = localStorage.getItem("influencerToken");
  const token = userToken || influencerToken;
  return token ? { Authorization: `Bearer ${token}` } : {};
}
