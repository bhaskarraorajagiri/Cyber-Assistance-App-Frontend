export function getOrCreateUserId(): string {
  let userId = localStorage.getItem("cyberAssistUserId");

  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("cyberAssistUserId", userId);
  }

  return userId;
}
