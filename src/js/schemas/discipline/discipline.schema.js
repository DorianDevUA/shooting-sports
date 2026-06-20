import { disciplineCategorySchema } from "./discipline-category.schema.js";
import { distanceSchema } from "./distance.schema.js";

export const disciplineSchema = {
  map: "disciplines",
  label: "Discipline",

  fields: {
    category: disciplineCategorySchema,
    distance: distanceSchema,
  },
};
