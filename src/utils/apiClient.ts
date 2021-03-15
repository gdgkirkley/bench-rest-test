const endpoint = "https://resttest.bench.co/transactions";
const fileType = ".json";

// This application only fetches pages from the same endpoint
// but this could easily become a reusable client for other
// resources with a small refactor
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
