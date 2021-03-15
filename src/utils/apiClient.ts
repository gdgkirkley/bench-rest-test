const endpoint = "https://resttest.bench.co/transactions";
const fileType = ".json";

async function client(page: number) {
  return window
    .fetch(`${endpoint}/${page}${fileType}`, {
      method: "GET",
    })
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
