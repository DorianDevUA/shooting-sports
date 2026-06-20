const byId = (items) => new Map(items.map((item) => [item.id, item]));

export function createResultsResolver(database) {
  const {
    people = [],
    disciplines = [],
    events = [],
    stages = [],
    participants = [],
    competitions = [],
    competitionEditions = [],
    competitionEvents = [],
    results = [],
    resultSeries = [],
    achievements = [],
    rankingSnapshots = [],
  } = database;

  const peopleById = byId(people);
  const disciplinesById = byId(disciplines);
  const eventsById = byId(events);
  const stagesById = byId(stages);
  const participantsById = byId(participants);
  const competitionsById = byId(competitions);
  const competitionEditionsById = byId(competitionEditions);
  const competitionEventsById = byId(competitionEvents);

  function getCompetitionContext(competitionEventId) {
    const competitionEvent = competitionEventsById.get(competitionEventId);

    if (!competitionEvent) {
      return null;
    }

    const edition = competitionEditionsById.get(
      competitionEvent.competition_edition_id,
    );
    const competition = edition
      ? competitionsById.get(edition.competition_id)
      : null;

    return {
      competitionEvent,
      edition,
      competition,
      event: eventsById.get(competitionEvent.event_id),
      discipline: disciplinesById.get(competitionEvent.discipline_id),
    };
  }

  function getResultDetails(result) {
    const context = getCompetitionContext(result.competition_event_id);

    return {
      ...result,
      person: peopleById.get(result.person_id),
      participant: participantsById.get(result.participant_id),
      stage: stagesById.get(result.stage_id),
      series: resultSeries.filter((series) => series.result_id === result.id),
      competitionEvent: context?.competitionEvent ?? null,
      competitionEdition: context?.edition ?? null,
      competition: context?.competition ?? null,
      event: context?.event ?? null,
      discipline: context?.discipline ?? null,
    };
  }

  function getResultsByPerson(personId, filters = {}) {
    return results
      .filter((result) => result.person_id === personId)
      .map(getResultDetails)
      .filter((result) => {
        if (filters.eventId && result.event?.id !== filters.eventId) {
          return false;
        }

        if (
          filters.disciplineId &&
          result.discipline?.id !== filters.disciplineId
        ) {
          return false;
        }

        if (filters.stageId && result.stage_id !== filters.stageId) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const aDate = a.competitionEvent?.date ?? "";
        const bDate = b.competitionEvent?.date ?? "";

        return bDate.localeCompare(aDate);
      });
  }

  function getAchievementsByPerson(personId) {
    return achievements
      .filter((achievement) => achievement.person_id === personId)
      .map((achievement) => ({
        ...achievement,
        result: results.find((result) => result.id === achievement.result_id),
        context: getCompetitionContext(achievement.competition_event_id),
      }));
  }

  function getRankingByEvent(eventId, rankingTypeId = "national") {
    return rankingSnapshots
      .filter(
        (ranking) =>
          ranking.event_id === eventId &&
          ranking.ranking_type_id === rankingTypeId,
      )
      .map((ranking) => ({
        ...ranking,
        person: peopleById.get(ranking.person_id),
        event: eventsById.get(ranking.event_id),
        discipline: disciplinesById.get(ranking.discipline_id),
      }))
      .sort((a, b) => a.rank - b.rank);
  }

  function getAthleteResultsSummary(personId) {
    const athleteResults = getResultsByPerson(personId);
    const athleteAchievements = getAchievementsByPerson(personId);

    return {
      person: peopleById.get(personId),
      results: athleteResults,
      achievements: athleteAchievements,
      medals: athleteAchievements.filter(
        (achievement) => achievement.type_id === "medal",
      ),
    };
  }

  return {
    getCompetitionContext,
    getResultDetails,
    getResultsByPerson,
    getAchievementsByPerson,
    getRankingByEvent,
    getAthleteResultsSummary,
  };
}
