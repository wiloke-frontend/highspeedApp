export default function sleep(ms: number) {
  return new Promise((resolve: () => void) => {
    const timeout = setTimeout(() => {
      resolve();
      clearTimeout(timeout);
    }, ms);
    return timeout;
  });
}
