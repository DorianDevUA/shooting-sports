import { citySchema } from "../geo/city.schema.js";
import { countrySchema } from "../geo/country.schema.js";
import { venueSchema } from "../geo/venue.schema.js";
import { organizationStatusSchema } from "./organization-status.schema.js";
import { organizationTypeSchema } from "./organization-type.schema.js";

export const organizationSchema = {
  map: "organizations",
  label: "Organization",

  fields: {
    type: {
      ...organizationTypeSchema,
      source: "organization_type_id",
    },
    status: {
      ...organizationStatusSchema,
      source: "organization_status_id",
    },
    venue: venueSchema,
    city: citySchema,
    country: countrySchema,
  },
};
