export const startPolling = (
  url,
  onSuccess,
  onFailure,
  interval
) => {
  let timer;
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
