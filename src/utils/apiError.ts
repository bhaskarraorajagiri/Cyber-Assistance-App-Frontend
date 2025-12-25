export function parseApiError(res: Response, body: any) {
  if (res.status === 429) {
    return {
      type: "RATE_LIMIT",
      message:
        body?.message ||
        "Too many requests. Please wait a few minutes and try again.",
    };
  }

  return {
    type: "GENERIC",
    message: body?.error || "Something went wrong",
  };
}
