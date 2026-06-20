import { cityDTO, countryDTO, venueDTO } from "./geo.mapper.js";

/**
 * DTO(Data Transfer Object)
 *
 * Повертаємо тільки потрібні поля,
 * щоб фронт не залежав від внутрішньої структури entities.
 */
function clubDTO(club) {
  if (!club) {
    return null;
  }

  return {
    id: club.id,
    slug: club.slug,
    code: club.code,
    short_code: club.short_code,

    name: club.name,
    short_name: club.short_name,
    acronym: club.acronym,
    description: club.description,

    type: typeDTO(club.type),
    status: statusDTO(club.status),

    location: {
      venue: venueDTO(club.venue),
      city: cityDTO(club.city),
      country: countryDTO(club.country),
    },

    founded_date: club.founded_date,

    contacts: {
      website: club.website_url,
      email: club.email,
      phone: club.phone,
    },

    notes: club.notes,
  };
}

function typeDTO(type) {
  return {
    id: type.id,
    code: type.code,
    slug: type.slug,
    name: type.name,
    description: type.description,
  };
}

function statusDTO(status) {
  return {
    id: status.id,
    code: status.code,
    slug: status.slug,
    name: status.name,
    description: status.description,
  };
}

export { clubDTO };
