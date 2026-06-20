/**
 * DTO(Data Transfer Object)
 *
 * Повертаємо тільки потрібні поля,
 * щоб фронт не залежав від внутрішньої структури entities.
 */

import { disciplineCategoryDTO } from "./discipline.mapper.js";

function handednessDTO(handedness) {
  if (!handedness) {
    return null;
  }

  return {
    id: handedness.id,
    code: handedness.code,
    name: handedness.name,
    short_name: handedness.short_name,
    description: handedness.description,
  };
}

function dominantEyeDTO(dominantEye) {
  if (!dominantEye) {
    return null;
  }

  return {
    id: dominantEye.id,
    code: dominantEye.code,
    name: dominantEye.name,
    short_name: dominantEye.short_name,
    description: dominantEye.description,
  };
}

function sportGradeDTO(sportGrade) {
  if (!sportGrade) {
    return null;
  }

  return {
    id: sportGrade.id,
    code: sportGrade.code,
    name: sportGrade.name,
    short_name: sportGrade.short_name,

    level: sportGrade.level,
    description: sportGrade.description,
    discipline_category: disciplineCategoryDTO(sportGrade.discipline_category),

    is_ranked: sportGrade.is_ranked,
    certificate_number: sportGrade.certificate_number,
    awarded_at: sportGrade.awarded_at,
    notes: sportGrade.notes,
  };
}

function maritalStatusDTO(status) {
  if (!status) {
    return null;
  }

  return {
    id: status.id,
    code: status.code,
    name: status.name,
    description: status.description,
  };
}

function athleteProfileDTO(profile) {
  if (!profile) {
    return null;
  }

  return {
    height: profile.height ?? null,
    weight: profile.weight ?? null,
    handedness: handednessDTO(profile.handedness),
    dominant_eye: dominantEyeDTO(profile.dominant_eye),
    started_shooting_year: profile.started_shooting_year ?? null,
    started_competing_year: profile.started_competing_year ?? null,
    biography: profile.biography ?? null,
  };
}

function athleteOccupationDTO(occupation) {
  if (!occupation) {
    return null;
  }

  return {
    id: occupation.id,
    name: occupation.name,
    started_at: occupation.started_at,
    ended_at: occupation.ended_at,
    is_primary: occupation.is_primary,
  };
}

function nationalityDTO(nationality) {
  if (!nationality) {
    return null;
  }

  return {
    id: nationality.id,
    name: nationality.name,
  };
}

function hobbyDTO(hobby) {
  if (!hobby) {
    return null;
  }

  return {
    id: hobby.id,
    code: hobby.code,
    name: hobby.name,
    description: hobby.description,
    sort_order: hobby.sort_order,
  };
}

function educationDTO(edu) {
  if (!edu) {
    return null;
  }

  return {
    institution_name: edu.institution_name,
    level: eduLevelDTO(edu.level),
    qualification: edu.qualification
      ? eduQualificationDTO(edu.qualification)
      : null,
    specialization: edu.specialization
      ? eduSpecializationDTO(edu.specialization)
      : null,
    started_at: edu.started_at,
    graduated_at: edu.graduated_at,
    notes: edu.notes,
  };
}

function eduQualificationDTO(qualification) {
  if (!qualification) {
    return null;
  }

  return {
    id: qualification.id,
    code: qualification.code,
    name: qualification.name,
    short_name: qualification.short_name,
    description: qualification.description,
    level: qualification.level,
  };
}

function eduLevelDTO(eduLevel) {
  if (!eduLevel) {
    return null;
  }

  return {
    id: eduLevel.id,
    code: eduLevel.code,
    name: eduLevel.name,
    short_name: eduLevel.short_name,
    description: eduLevel.description,
    level: eduLevel.level,
  };
}

function eduSpecializationDTO(specialization) {
  if (!specialization) {
    return null;
  }

  return {
    id: specialization.id,
    code: specialization.code,

    name: specialization.name,
    short_name: specialization.short_name,

    description: specialization.description,

    category: eduSpecializationCategoryDTO(specialization.category),
  };
}

function eduSpecializationCategoryDTO(category) {
  if (!category) {
    return null;
  }

  return {
    id: category.id,
    code: category.code,

    name: category.name,
    short_name: category.short_name,
    description: category.description,
  };
}

export {
  handednessDTO,
  dominantEyeDTO,
  sportGradeDTO,
  maritalStatusDTO,
  nationalityDTO,
  educationDTO,
  athleteProfileDTO,
  athleteOccupationDTO,
  hobbyDTO,
};
