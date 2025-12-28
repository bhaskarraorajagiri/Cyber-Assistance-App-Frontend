import { parseApiError } from "../utils/apiError";
import { getOrCreateUserId } from "../utils/userId";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

/* ---------------- PASSWORD ---------------- */
export async function checkPassword(password: string) {
  const userId = getOrCreateUserId();

  const res = await fetch(`${BASE_URL}/api/security/password-check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password,
      userId,
    }),
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const parsed = parseApiError(res, body);
    throw new Error(parsed.message);
  }

  return body;
}

/* ---------------- PHISHING ---------------- */
export async function checkPhishing(
  mode: "url" | "message",
  input: string
) {
  const userId = getOrCreateUserId();

  const payload =
    mode === "url"
      ? { url: input, userId }
      : { text: input, userId };

  const res = await fetch(`${BASE_URL}/api/security/phishing-check`, {
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

/* ---------------- RISK SCORE ---------------- */
export async function checkRiskScore(answers: any) {
  const userId = getOrCreateUserId();

  const res = await fetch(`${BASE_URL}/api/security/risk-score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...answers,
      userId,
    }),
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const parsed = parseApiError(res, body);
    throw new Error(parsed.message);
  }

  return body;
}

/* ---------------- HISTORY ---------------- */
export async function fetchHistory() {
  const res = await fetch(`${BASE_URL}/api/history`);
  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
}