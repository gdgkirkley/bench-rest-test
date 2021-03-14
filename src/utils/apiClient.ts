const endpoint = "https://resttest.bench.co/transactions";
const fileType = ".json";

async function client(page: number, { ...customConfig } = {}) {
  const config = {
    method: "GET",
    ...customConfig,
  };

  return window
    .fetch(`${endpoint}/${page}${fileType}`, config)
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { client };
