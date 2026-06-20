import { mediaSchema } from "./media.schema.js";
import { mediaUsageTypeSchema } from "./media-usage-type.schema.js";

export const entityMediaRelationSchema = {
  map: "entityMediaRelations",
  label: "Entity Media Relation",

  fields: {
    media: {
      ...mediaSchema,
      source: "media_id",
    },

    media_usage_type: {
      ...mediaUsageTypeSchema,
      source: "media_usage_type_id",
    },
  },
};
