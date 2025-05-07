/**
 * Centralized API address configuration.
 */
export const API_BASE_URL = "https://onlineshop.holosen.net/api/";

/**
 * Returns the full API URL for a given endpoint suffix.
 * @param {string} suffix - The endpoint path, e.g., 'slider', 'user/login'.
 * @returns {string} Full URL to call the API.
 */
export function getApiURL(suffix) {
  return `${API_BASE_URL}${suffix}`;
}
