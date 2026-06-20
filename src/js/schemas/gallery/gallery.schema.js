import { galleryItemSchema } from "./gallery-item.schema.js";
import { entityMediaRelationSchema } from "../media/entity-media-relation.schema.js";

export const gallerySchema = {
  map: "galleries",
  label: "Gallery",

  fields: {
    media: {
      type: "many",
      collection: "entityMediaRelations",

      where: {
        entity_id: "$id",
      },

      schema: entityMediaRelationSchema,
    },

    items: {
      type: "many",
      collection: "galleryItems",

      where: {
        gallery_id: "$id",
      },

      schema: galleryItemSchema,
    },
  },
};
