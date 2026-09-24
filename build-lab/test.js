const fs = require("fs");

const stub = {
  addEventListener() {},
  hidden: true,
  textContent: "",
  classList: { add() {} },
  scrollIntoView() {}
};

global.window = global;
global.document = {
  getElementById: () => stub,
  querySelectorAll: () => []
};

global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
};

const source = fs.readFileSync("script.js", "utf8");

eval(`
  (function () {
    ${source}
    module.exports = { matchGames, closestGames, scoreGames, GAMES, MATCH_BAR, MAX_PICKS };
  })()
`);

const { matchGames, closestGames, GAMES, MATCH_BAR, MAX_PICKS } = module.exports;

let fails = 0;

function check(label, ok, detail) {
  if (ok) {
    console.log("PASS", label);
  } else {
    fails = fails + 1;
    console.log("FAIL", label, "::", detail);
  }
}

const names = (list) => list.map((r) => r.name).join(",");

const combos = [
  ["story", "coop", "multiplayer"],
  ["combat", "fps", "singleplayer", "quick"],
  ["survival", "coop", "multiplayer", "singleplayer", "relaxing"],
  ["cozy", "relaxing"],
  ["incremental", "singleplayer", "quick"],
  ["fps", "combat", "multiplayer", "quick"],
  ["combat", "coop", "multiplayer"]
];

combos.forEach((combo) => {
  const results = matchGames(combo);
  check(combo.join("+") + " has 2+ matches", results.length >= 2, "got " + results.length);
  check(combo.join("+") + " all scores 80+", results.every((r) => r.percent >= MATCH_BAR), names(results));
});

const sorted = matchGames(["story", "coop", "multiplayer"]);
check("results sorted by score descending", sorted.every((r, i, a) => i === 0 || a[i - 1].percent >= r.percent), names(sorted));

const deadEnd = ["combat", "cozy"];
check("dead-end combo clears nothing", matchGames(deadEnd).length === 0, names(matchGames(deadEnd)));
const near = closestGames(deadEnd, 3);
check("dead-end combo returns near-misses", near.length > 0, "got " + near.length);
check("near-misses stay under the bar", near.every((r) => r.percent > 0 && r.percent < MATCH_BAR), JSON.stringify(near));
check("near-miss limit is respected", closestGames(deadEnd, 3).length <= 3, "");
check("near-misses sorted descending", closestGames(deadEnd, 5).every((r, i, a) => i === 0 || a[i - 1].percent >= r.percent), "");

check("match bar is 80", MATCH_BAR === 80, MATCH_BAR);
check("max picks is 5", MAX_PICKS === 5, MAX_PICKS);
check("game pool has 60 titles", GAMES.length === 60, GAMES.length);
check("every game has at least one tag", GAMES.every((g) => Array.isArray(g.tags) && g.tags.length >= 1), "");
check(
  "every mood category is covered",
  ["relaxing", "story", "quick", "combat", "survival", "cozy", "fps", "coop", "singleplayer", "multiplayer", "incremental"]
    .every((m) => GAMES.some((g) => g.tags.includes(m))),
  ""
);

process.exit(fails ? 1 : 0);