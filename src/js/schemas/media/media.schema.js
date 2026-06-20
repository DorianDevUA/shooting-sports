import { mediaMimeTypeSchema } from "./media-mime-type.schema.js";
import { mediaTypeSchema } from "./media-type.schema.js";

export const mediaSchema = {
  map: "media",
  label: "Media",

  fields: {
    type: {
      ...mediaTypeSchema,
      source: "type_id",
    },
    mime_type: {
      ...mediaMimeTypeSchema,
      source: "mime_type_id",
    },
  },
};
