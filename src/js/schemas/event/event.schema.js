import { disciplineSchema } from "../discipline/discipline.schema.js";
import { genderSchema } from "../person/gender.schema.js";
import { eventFormatSchema } from "./event-format.schema.js";

export const eventSchema = {
  map: "events",
  label: "Event",

  fields: {
    discipline: disciplineSchema,
    format: eventFormatSchema,
    gender: genderSchema,
  },
};
