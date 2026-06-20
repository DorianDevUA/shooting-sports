import { countrySchema } from "./country.schema.js";

export const citySchema = {
  map: "cities",
  label: "City",

  fields: {
    country: countrySchema,
  },
};
