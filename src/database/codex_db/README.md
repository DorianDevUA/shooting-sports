# Codex DB proposal: results and rankings

This folder is a proposed database layer for athlete competition results.
It does not replace or edit `src/database/raw`. All ids that already exist in
the raw database are referenced as foreign keys.

## Main flow

```text
raw/entities/people.json
  -> raw/relations/participants.json
    -> codex_db/events/results.json
      -> codex_db/events/competition-events.json
        -> codex_db/entities/competition-editions.json
          -> codex_db/entities/competitions.json
        -> raw/entities/events.json
          -> raw/entities/disciplines.json
```

## Recommended ownership

- `entities/competitions.json`: stable competition brands, for example ISSF Grand Prix.
- `entities/competition-editions.json`: concrete yearly/location edition of a competition.
- `events/competition-events.json`: one sport event inside one competition edition.
- `events/results.json`: one participant result in one competition event and stage.
- `events/result-series.json`: detailed series/round scores for a result.
- `events/achievements.json`: medals, records, quotas, titles, and featured achievements.
- `events/ranking-snapshots.json`: official or internal ranking tables by date.
- `events/records.json`: national/world/personal records and record progressions.

## Existing raw FK targets used here

- `person_id` -> `raw/entities/people.json`
- `participant_id` -> `raw/relations/participants.json`
- `event_id` -> `raw/entities/events.json`
- `discipline_id` -> `raw/entities/disciplines.json`
- `gender_id` -> `raw/reference/genders.json`
- `format_id` -> `raw/reference/event-formats.json`
- `stage_id` -> `raw/reference/stages.json`
- `status_id` -> `raw/reference/result-statuses.json` or local status when raw has no completed status yet
- `city_id` -> `raw/reference/cities.json`
- `country_id` -> `raw/reference/countries.json`

## Suggested raw DB improvements

These are only suggestions. Existing files were not edited.

1. Add a positive result status to `raw/reference/result-statuses.json`, for example `completed`.
2. Normalize `raw/entities/athlete-profiles.json`: it currently contains one item with `id: "pers_0001"` and another with `person_id: "pers_0001"`.
3. Fill `raw/entities/competitions.json` later, or migrate `codex_db/entities/competitions.json` into it when the model feels stable.
4. Consider adding `raw/reference/medal-types.json` if medals will be reused outside results.
