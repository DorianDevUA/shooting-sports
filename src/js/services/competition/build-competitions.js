import { resolveEntityGraph } from "../database/resolve-entity-graph.js";
import { competitionEditionSchema } from "../../schemas/competition/competition-edition.schema.js";
import { competitionEditionDTO } from "../../mappers/competition.mapper.js";

export function buildCompetitions(competitionEditions, maps) {
  return competitionEditions.map((edition) => {
    const schema = {
      ...competitionEditionSchema,
      id: edition.id,
    };

    const competitionEdition = resolveEntityGraph(schema, maps, edition.id);

    return {
      ...competitionEditionDTO(competitionEdition),
    };
  });
}
