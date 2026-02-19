/**
 * Backend API Configuration
 *
 * Configures the connection to the Python FastAPI backend.
 */

// Backend API base URL
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

// API endpoints
export const API_ENDPOINTS = {
  // Analysis
  analyze: `${API_BASE_URL}/api/v1/analyze`,
  analyzeQuick: `${API_BASE_URL}/api/v1/analyze/quick`,

  // History
  history: (userId: string) => `${API_BASE_URL}/api/v1/history/${userId}`,
  historyStats: (userId: string) =>
    `${API_BASE_URL}/api/v1/history/${userId}/stats`,
  historyTrend: (userId: string) =>
    `${API_BASE_URL}/api/v1/history/${userId}/trend`,

  // Reports
  reports: (userId: string) => `${API_BASE_URL}/api/v1/reports/${userId}`,
  weeklyReport: (userId: string) =>
    `${API_BASE_URL}/api/v1/reports/${userId}/weekly`,
  comparison: (userId: string) =>
    `${API_BASE_URL}/api/v1/reports/${userId}/comparison`,
  exportCsv: (userId: string) =>
    `${API_BASE_URL}/api/v1/reports/${userId}/export/csv`,

  // CSV Upload
  uploadCsv: `${API_BASE_URL}/api/v1/upload-csv`,
  csvTemplate: `${API_BASE_URL}/api/v1/csv/template`,
  validateCsv: `${API_BASE_URL}/api/v1/csv/validate`,

  // Health
  health: `${API_BASE_URL}/health`,
  info: `${API_BASE_URL}/info`,
};

// Helper function for API calls
export async function apiCall<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      detail: response.statusText,
    }));
    throw new Error(error.detail || "API request failed");
  }

  return response.json();
}
