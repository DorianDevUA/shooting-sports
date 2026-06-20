import { venueSchema } from "../geo/venue.schema.js";
import { citySchema } from "../geo/city.schema.js";
import { competitionSchema } from "./competition-schema.js";
import { competitionCategorySchema } from "./competition-category.schema.js";
import { competitionEventSchema } from "./competition-event.schema.js";
import { competitionEditionOrganizationSchema } from "./competition-edition-organization.schema.js";
import { entityMediaRelationSchema } from "../media/entity-media-relation.schema.js";
import { entityGalleryRelationSchema } from "../gallery/entity-gallery-relation.schema.js";

// Schema описує (Поле | Значення)
// map: де шукати
// fields: що вкладено
// objectKey: як назвати output
// source: звідки взяти id
export const competitionEditionSchema = {
  map: "competitionEditions",
  label: "Competition Edition",

  fields: {
    competition: competitionSchema,
    category: {
      ...competitionCategorySchema,
      source: "competition_category_id",
    },
    venue: venueSchema,
    city: {
      ...citySchema,
      source: "city_id",
    },

    organizations: {
      type: "many",
      collection: "competitionEditionOrganizations",

      where: {
        competition_edition_id: "$id",
      },

      schema: competitionEditionOrganizationSchema,
    },

    events: {
      type: "many",
      collection: "competitionEvents",

      where: {
        competition_edition_id: "$id",
      },

      schema: competitionEventSchema,
    },

    media: {
      type: "many",
      collection: "entityMediaRelations",

      where: {
        entity_id: "$id",
      },

      schema: entityMediaRelationSchema,
    },
  },
};
