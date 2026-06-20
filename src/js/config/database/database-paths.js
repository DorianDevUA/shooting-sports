import path from "path";

// Тека з сирими даними
const SRC = "src/database/raw";

// Теки з довідниками
const ENTITIES = path.join(SRC, "entities");
const REFERENCE = path.join(SRC, "reference");
const RELATIONS = path.join(SRC, "relations");

// Теки для згенерованих файлів
const GENERATED = "src/database/generated";
const PUBLIC_DATA = "public/assets/data";

export const DB_PATHS = {
  SRC,
  ENTITIES,
  REFERENCE,
  RELATIONS,
  GENERATED,
  PUBLIC_DATA,
};
