function getAthletesFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);

  return {
    query: params.get("query") || "",

    gender: params.getAll("gender"),
    age_category: params.getAll("age_category"),
    discipline: params.getAll("discipline"),
    club: params.getAll("club"),
    grade: params.getAll("grade"),
  };
}

export { getAthletesFiltersFromUrl };
