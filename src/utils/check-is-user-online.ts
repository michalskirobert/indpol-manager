export const checkIsUserOnline = (lastSeenAt: Date) => {
  if (!lastSeenAt) return false;

  const last = new Date(lastSeenAt).getTime();
  const now = Date.now();

  const diffSeconds = (now - last) / 1000;

  return diffSeconds < 60;
};
