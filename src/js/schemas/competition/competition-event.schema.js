import { eventSchema } from "../event/event.schema.js";
import { ageCategorySchema } from "../person/age-category.schema.js";

export const competitionEventSchema = {
  map: "competitionEvents",
  label: "Competition Event",

  fields: {
    event: eventSchema,
    age_category: ageCategorySchema,
  },
};
