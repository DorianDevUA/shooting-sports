import path from "path";
import { DB_PATHS } from "./database-paths.js";

const { GENERATED, PUBLIC_DATA } = DB_PATHS;

const DATABASE_OUTPUTS = {
  competitions: path.join(PUBLIC_DATA, "competitions.json"),
  athletes: path.join(PUBLIC_DATA, "athletes.json"),
  news: path.join(PUBLIC_DATA, "articles.json"),

  // internal builds (якщо потрібно)
  competitionsInternal: path.join(GENERATED, "competitions.json"),
};

export { DATABASE_OUTPUTS };
