import { readJSON, writeJSON } from "../../utils/fs.js";
import { loadMaps } from "../database/load-maps.js";

export function runBuild(build, builderFn) {
  const maps = loadMaps(build.dependencies);

  const input = readJSON(build.input);

  const data = builderFn(input, maps);

  writeJSON(build.output, data);

  console.log(`✅ Build finished: ${build.output}`);
}
