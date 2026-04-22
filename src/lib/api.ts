/**
 * Central API helper
 * Uses VITE_API_URL env variable so the frontend always hits the correct backend.
 * In production: https://united-holidays-api.onrender.com/api
 * In development: /api (proxied by Vite)
 */
const API_BASE = import.meta.env.VITE_API_URL || '/api';

export function apiUrl(path: string): string {
  // path should start with /  e.g. '/packages'
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // Remove /api prefix from path if someone passes it
  const withoutApiPrefix = cleanPath.replace(/^\/api/, '');
  return `${API_BASE}${withoutApiPrefix}`;
}

export async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  return fetch(apiUrl(path), options);
}
