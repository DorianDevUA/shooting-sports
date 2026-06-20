/**
 * DTO(Data Transfer Object)
 *
 * Повертаємо тільки потрібні поля,
 * щоб фронт не залежав від внутрішньої структури entities.
 */
function regionDTO(region) {
  if (!region) {
    return null;
  }

  return {
    id: region.id,
    name: region.name,
    code: region.code,
  };
}

function countryDTO(country) {
  if (!country) {
    return null;
  }

  return {
    id: country.id,
    slug: country.slug,
    name: country.name,
    code: country.code,
    region: regionDTO(country.region),
    alpha2: country.alpha2,
    alpha3: country.alpha3,
    flag: country.flag,
  };
}

function cityDTO(city) {
  if (!city) {
    return null;
  }

  return {
    id: city.id,
    name: city.name,
    country: countryDTO(city.country),
  };
}

function venueDTO(venue) {
  if (!venue) {
    return null;
  }

  return {
    id: venue.id,
    slug: venue.slug,
    code: venue.code,

    name: venue.name,
    short_name: venue.short_name,
    description: venue.description,

    type: venueTypeDTO(venue.venue_type),

    address: venue.address,
    postal_code: venue.postal_code,
    latitude: venue.latitude,
    longitude: venue.longitude,

    city: cityDTO(venue.city),

    notes: venue.notes,
  };
}

function venueTypeDTO(type) {
  if (!type) {
    return null;
  }

  return {
    id: type.id,
    code: type.code,
    slug: type.slug,
    name: type.name,
    short_name: type.short_name,
    description: type.description,
  };
}

function buildRegion(region) {
  return region ? { ...region } : null;
}

function buildCountry({ country, region }) {
  return country ? { ...country, region: buildRegion(region) } : null;
}

function buildCity({ city, country, region }) {
  return city ? { ...city, country: buildCountry({ country, region }) } : null;
}

function buildVenue({ venue, city, country, region }) {
  return venue
    ? { ...venue, city: buildCity({ city, country, region }) }
    : null;
}

export {
  regionDTO,
  countryDTO,
  cityDTO,
  venueDTO,
  buildRegion,
  buildCountry,
  buildCity,
  buildVenue,
};
