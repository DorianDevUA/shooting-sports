Основні типи JSON (як у реальних системах)
У великих проєктах (і федераціях теж) дані ділять так:

🟦 1. Reference (довідники)
👉 статичні, контрольовані списки

Приклади:
teams.json
squads.json
countries.json
disciplines.json
genders.json

👉 їх суть:
“Які варіанти існують”

🟩 2. Entities (сутності)
👉 основні об’єкти системи

Приклади:
athletes.json
competitions.json
clubs.json

👉 їх суть:
“Хто / що існує”

🟨 3. Relations (зв’язки)
👉 таблиці many-to-many

Приклади:
national-team-memberships.json
athlete-disciplines.json (якщо буде)
competition-participants.json

👉 їх суть:
“Хто з ким і як пов’язаний”

🟥 4. Transactions / Events (події)
👉 динамічні дані (історія, результати)

Приклади:
results.json
rankings.json
records.json

👉 їх суть:
“Що відбулося”

🟪 5. Config / Metadata (конфіг)
👉 для логіки системи

Приклади:
age-categories.json
statuses.json
scoring-rules.json

👉 їх суть:
“Як система працює”
