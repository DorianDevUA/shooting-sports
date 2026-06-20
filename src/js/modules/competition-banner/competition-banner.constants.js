const UPDATE_INTERVAL = 60 * 1000;

const COMPETITION_BANNER_STATES = {
  UPCOMING: "upcoming",
  LIVE: "live",
  FINISHED: "finished",
};

const COMPETITION_BANNER_TEXTS = {
  upcoming: {
    status: "Upcoming Event",
    timerLabel: "Starts In",
    button: "View Event",
    timer: (daysUntilStart) =>
      `${daysUntilStart} ${daysUntilStart === 1 ? "Day" : "Days"}`,
  },

  live: {
    status: "Live Now",
    timerLabel: "",
    button: "Watch Live",
    timer: () => "Event Is Happening Right Now",
  },

  finished: {
    status: "Event Finished",
    timerLabel: "",
    button: "View Results",
    timer: () => "Competition Has Ended",
  },
};

export { COMPETITION_BANNER_TEXTS, COMPETITION_BANNER_STATES, UPDATE_INTERVAL };
