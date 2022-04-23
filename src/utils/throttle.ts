function throttle() {
  let timeout: NodeJS.Timeout | null = null;

  return function <T>(cb: Function, time: number = 200, ...args: T[]) {
    if (timeout) {
      return;
    }
    cb(...args);
    timeout = setTimeout(() => {
      timeout = null;
    }, time);
  };
}

export default throttle();
