import people from "../../raw/entities/people.json";
import disciplines from "../../raw/entities/disciplines.json";
import events from "../../raw/entities/events.json";
import stages from "../../raw/reference/stages.json";
import participants from "../../raw/relations/participants.json";

import competitions from "../entities/competitions.json";
import competitionEditions from "../entities/competition-editions.json";
import competitionEvents from "../events/competition-events.json";
import results from "../events/results.json";
import resultSeries from "../events/result-series.json";
import achievements from "../events/achievements.json";
import rankingSnapshots from "../events/ranking-snapshots.json";

import { createResultsResolver } from "./results-resolver.js";

export const resultsResolver = createResultsResolver({
  people,
  disciplines,
  events,
  stages,
  participants,
  competitions,
  competitionEditions,
  competitionEvents,
  results,
  resultSeries,
  achievements,
  rankingSnapshots,
});

export const {
  getCompetitionContext,
  getResultDetails,
  getResultsByPerson,
  getAchievementsByPerson,
  getRankingByEvent,
  getAthleteResultsSummary,
} = resultsResolver;
