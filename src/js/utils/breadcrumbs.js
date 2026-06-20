/**
 * Генерує breadcrumb для athlete сторінки
 */
export function buildAthleteBreadcrumbs(athlete) {
  return [
    {
      label: "Home",
      url: "",
    },
    {
      label: "Athletes",
      url: "athletes/",
    },
    {
      label: `${athlete.surname} ${athlete.name}`,
      url: null, // останній елемент без лінка
    },
  ];
}
