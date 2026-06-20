function competitionMediaRelationDTO(rel) {
  const media = mediaDTO(rel.media);

  return {
    ...media,
    media_usage_type: rel.media_usage_type,
    alt: rel.alt,
    is_primary: rel.is_primary,
  };
}

function mediaDTO(media) {
  if (!media) {
    return null;
  }

  return {
    id: media.id,

    type: mediaTypeDTO(media.type),
    mime_type: mediaMimeTypeDTO(media.mime_type),

    url: media.url,

    width: media.width,
    height: media.height,
  };
}

function mediaTypeDTO(type) {
  if (!type) {
    return null;
  }

  return {
    id: type.id,
    code: type.code,
    name: type.name,
  };
}

function mediaMimeTypeDTO(type) {
  if (!type) {
    return null;
  }

  return {
    id: type.id,
    code: type.code,
    slug: type.slug,

    name: type.name,
    extension: type.extension,
  };
}

function mediaUsageTypeDTO(type) {
  if (!type) {
    return null;
  }

  return {
    id: type.id,
    code: type.code,
    name: type.name,
    description: type.description,

    aspect_ratio: type.aspect_ratio,
    recommended_width: type.recommended_width,
    recommended_height: type.recommended_height,
  };
}

export {
  mediaDTO,
  mediaTypeDTO,
  mediaMimeTypeDTO,
  competitionMediaRelationDTO,
};
