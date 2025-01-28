export const logoFetcher = (...args) =>
  fetch(...args).then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.text();
  });
export const jsonFetcher = (...args) => fetch(...args).then((res) => res.json());
