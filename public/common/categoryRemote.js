const API_BASE_URL = "http://34.22.80.21/api";

async function categories() {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  });
  return response.json();
}

export { categories };
