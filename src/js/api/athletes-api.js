async function fetchAthletes() {
  try {
    const response = await fetch("assets/data/athletes.json");

    if (!response.ok) {
      throw new Error(`Failed to fetch statuses: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching Athletes:", error);
    return [];
  }
}

export { fetchAthletes };
