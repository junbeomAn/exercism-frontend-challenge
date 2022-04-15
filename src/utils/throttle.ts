function throttle() {
  let timeout: NodeJS.Timeout | null = null;

  return function <T>(cb: Function, time: number, ...args: T[]) {
    if (timeout) {
      return;
    }

    timeout = setTimeout(() => {
      timeout = null;
      cb(...args);
    }, time);
  };
}

export default throttle();
