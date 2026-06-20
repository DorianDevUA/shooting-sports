import { cityDTO, countryDTO, venueDTO } from "./geo.mapper.js";

function organizationDTO(organization) {
  if (!organization) {
    return null;
  }

  return {
    id: organization.id,
    slug: organization.slug,
    code: organization.code,
    short_code: organization.short_code,

    name: organization.name,
    short_name: organization.short_name,
    acronym: organization.acronym,
    description: organization.description,

    type: organizationTypeDTO(organization.type),
    status: organizationStatusDTO(organization.status),

    location: {
      venue: venueDTO(organization.venue),
      city: cityDTO(organization.city),
      country: countryDTO(organization.country),
    },

    founded_date: organization.founded_date,

    contacts: {
      website: organization.website_url,
      email: organization.email,
      phone: organization.phone,
    },

    notes: organization.notes,
  };
}

function organizationTypeDTO(type) {
  if (!type) {
    return null;
  }

  return {
    id: type.id,
    code: type.code,
    slug: type.slug,
    name: type.name,
    description: type.description,
  };
}

function organizationStatusDTO(status) {
  if (!status) {
    return null;
  }

  return {
    id: status.id,
    code: status.code,
    slug: status.slug,
    name: status.name,
    description: status.description,
  };
}

export { organizationDTO, organizationTypeDTO, organizationStatusDTO };
