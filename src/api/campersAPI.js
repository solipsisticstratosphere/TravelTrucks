const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

export const campersAPI = {
  getCampers: async (page = 1, filters = {}) => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: "8",
    });

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "" && value !== false) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${BASE_URL}/campers?${queryParams}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  getCamperById: async (id) => {
    const response = await fetch(`${BASE_URL}/campers/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};
