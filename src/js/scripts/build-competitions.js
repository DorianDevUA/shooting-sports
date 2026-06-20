import { runBuild } from "../services/build/run-build.js";
import { competitionsBuild } from "../config/database/builds/competitions.js";
import { buildCompetitions } from "../services/competition/build-competitions.js";

try {
  runBuild(competitionsBuild, buildCompetitions);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
