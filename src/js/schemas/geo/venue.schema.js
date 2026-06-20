import { citySchema } from "./city.schema.js";
import { venueTypeSchema } from "./venue-type.schema.js";

// Schema описує:

// Поле | Значення
// key: як назвати output
// source: звідки взяти id
// map: де шукати
// fields: що вкладено
export const venueSchema = {
  map: "venues",
  label: "Venue",

  fields: {
    venue_type: venueTypeSchema,
    city: {
      ...citySchema,
      source: "city_id",
    },
  },
};
