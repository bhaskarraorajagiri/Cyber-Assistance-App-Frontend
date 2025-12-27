import { parseApiError } from "../utils/apiError";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";


export async function checkPassword(password: string) {
  const res = await fetch(`${BASE_URL}/api/security/password-check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const parsed = parseApiError(res, body);
    throw new Error(parsed.message);
  }

  return body;
}

export async function checkPhishing(
  mode: "url" | "message",
  input: string
) {
  const payload =
    mode === "url"
      ? { url: input }
      : { text: input };

  const res = await fetch(`${BASE_URL}/api/security/phishing-check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const parsed = parseApiError(res, body);
    throw new Error(parsed.message);
  }

  return body;
}


export async function checkRiskScore(payload: any) {
  const res = await fetch(`${BASE_URL}/api/security/risk-score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const parsed = parseApiError(res, body);
    throw new Error(parsed.message);
  }

  return body;
}

export async function fetchHistory() {
  const res = await fetch(`${BASE_URL}/api/history`);
  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
}
