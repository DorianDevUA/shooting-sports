import { mediaSchema } from "../media/media.schema.js";

export const galleryItemSchema = {
  map: "galleryItems",
  label: "Gallery Item",

  fields: {
    media: {
      ...mediaSchema,
      source: "media_id",
    },
  },
};
