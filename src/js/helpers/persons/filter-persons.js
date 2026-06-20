function filterPersonsByRoleRels(persons, role, personRoleRels) {
  const personsMap = new Map(persons.map((p) => [p.id, p]));
  // console.log("PersonsMap:", personsMap);

  const relations = personRoleRels.filter((rel) => rel.role_id === role);

  if (!relations.length) {
    return [];
  }

  return relations.map((rel) => personsMap.get(rel.person_id));
}

export { filterPersonsByRoleRels };
