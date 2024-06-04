import axios from "axios";

async function fetchImages(searchQuery, page) {
  const API_KEY = "IsQoAZJWf-s1DwdRqxH2vcjcxO2GNLQJWlqGy8AJkrI";

  const baseUrl = "https://api.unsplash.com/search/photos/";

  const params = new URLSearchParams({
    query: searchQuery,
    client_id: API_KEY,
    per_page: 9,
    page: page,
  });

  try {
    const response = await axios.get(`${baseUrl}?${params}`);
    const { results, total } = response.data;
    return { results, total };
  } catch (error) {
    console.log(error);
  }
}
export default fetchImages;
