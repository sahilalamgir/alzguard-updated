const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

export const API_ENDPOINTS = {
  assessRisk: `${API_BASE_URL}/assess-risk`,
} as const;
