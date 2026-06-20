import { organizationSchema } from "../organization/organization.schema.js";
import { competitionEditionOrganizationRoleSchema } from "./competition-edition-organization-role.schema.js";

export const competitionEditionOrganizationSchema = {
  map: "competitionEditionOrganizations",
  label: "Competition Edition Organization",

  fields: {
    organization: {
      ...organizationSchema,
      source: "organization_id",
    },
    role: {
      ...competitionEditionOrganizationRoleSchema,
      source: "role_id",
    },
  },
};
