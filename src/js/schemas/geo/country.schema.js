import { regionSchema } from "./region.schema.js";

export const countrySchema = {
  map: "countries",
  label: "Country",

  fields: {
    region: regionSchema,
  },
};
