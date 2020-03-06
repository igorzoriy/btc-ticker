export const startPolling = (
  url: string,
  onSuccess: (data: any) => void,
  onFailure: (error: Error) => void,
  interval: number
): (() => void) => {
  let timer: NodeJS.Timeout;
  const controller = new AbortController();
  const signal = controller.signal;

  const task = () => {
    fetch(url, { signal })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          var error = new Error(response.statusText);
          return Promise.reject(error);
        }
      })
      .then(data => {
        onSuccess(data);
        timer = setTimeout(task, interval);
      })
      .catch(error => {
        onFailure(error);
        timer = setTimeout(task, interval);
      });
  };
  task();

  return () => {
    controller.abort();
    clearTimeout(timer);
  };
};
