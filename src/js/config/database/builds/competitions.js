import { BUILD_DEPENDENCIES } from "../build-dependencies.js";
import { DATABASE_FILES } from "../database-files.js";
import { DATABASE_OUTPUTS } from "../database-outputs.js";

export const competitionsBuild = {
  input: DATABASE_FILES.competitionEditions,
  output: DATABASE_OUTPUTS.competitions,
  dependencies: BUILD_DEPENDENCIES.competitions,
};
