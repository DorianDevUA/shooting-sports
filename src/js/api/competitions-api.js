async function fetchCompetitions() {
  try {
    const response = await fetch("assets/data/competitions.json");

    if (!response.ok) {
      throw new Error(`Failed to fetch statuses: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching Competitions:", error);
    return [];
  }
}

export { fetchCompetitions };
