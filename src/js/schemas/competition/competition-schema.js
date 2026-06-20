import { competitionLevelSchema } from "./competition-level.schema.js";

export const competitionSchema = {
  map: "competitions",
  label: "Competitions",

  fields: {
    level: competitionLevelSchema,
  },
};
