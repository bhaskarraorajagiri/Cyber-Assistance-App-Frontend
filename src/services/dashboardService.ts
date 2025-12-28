import { parseApiError } from "../utils/apiError";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchDashboard(userId: string) {
  const res = await fetch(`${BASE_URL}/api/security/dashboard/${userId}`);

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const parsed = parseApiError(res, body);
    throw new Error(parsed.message);
  }

  return body;
}
