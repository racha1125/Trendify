// Get API base URL from environment variables (set in frontend/.env)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://trendify-alpha.vercel.app";

// Helper function to safely join base URL and path
export function apiUrl(path) {
  // Ensure only one slash between base and path
  if (!path.startsWith('/')) path = '/' + path;
  // Remove trailing slash from base if present
  const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  return base + path;
}

// Example: Use with fetch or axios
// fetch(apiUrl('/api/products/new-arrivals'))
// axios.get(apiUrl('/api/products/new-arrivals'))

// Optionally, you can export a default configured axios instance:
import axios from 'axios';

const api = axios.create({
  baseURL: API_BASE_URL,
  // You can add other default configs here, like headers, timeout, etc.
});

export default api;