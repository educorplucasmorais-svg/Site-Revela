/**
 * Centralized API configuration for frontend clients.
 * Reads VITE_API_URL from environment or defaults to relative path for local dev.
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Build a full API endpoint URL.
 * @param path - Relative path starting with `/`
 */
export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}
