import { gallerySchema } from "./gallery.schema.js";

export const entityGalleryRelationSchema = {
  map: "entityGalleryRelations",
  label: "Entity Gallery Relation",

  fields: {
    gallery: {
      ...gallerySchema,
      source: "gallery_id",
    },
  },
};
