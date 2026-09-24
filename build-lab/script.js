const GAMES = [
  { name: "Stardew Valley", tags: ["relaxing", "cozy", "singleplayer"] },
  { name: "Hades", tags: ["combat", "story", "singleplayer", "quick"] },
  { name: "Cookie Clicker", tags: ["incremental", "singleplayer", "relaxing"] },
  { name: "Overcooked 2", tags: ["coop", "multiplayer", "quick"] },
  { name: "DOOM Eternal", tags: ["fps", "combat", "singleplayer", "quick"] },
  { name: "Valheim", tags: ["survival", "coop", "multiplayer"] },
  { name: "Rust", tags: ["survival", "multiplayer", "combat"] },
  { name: "Call of Duty: Warzone", tags: ["fps", "combat", "multiplayer", "quick"] },
  { name: "Elden Ring", tags: ["combat", "story", "singleplayer", "multiplayer"] },
  { name: "Slay the Spire", tags: ["singleplayer", "quick"] },
  { name: "Factorio", tags: ["incremental", "singleplayer", "coop"] },
  { name: "Minecraft", tags: ["survival", "coop", "multiplayer", "singleplayer", "relaxing"] },
  { name: "A Short Hike", tags: ["cozy", "relaxing", "singleplayer", "story"] },
  { name: "Fortnite", tags: ["fps", "multiplayer", "combat", "quick"] },
  { name: "Genshin Impact", tags: ["story", "combat", "singleplayer", "multiplayer"] },
  { name: "Sea of Thieves", tags: ["coop", "multiplayer", "relaxing"] },
  { name: "Vampire Survivors", tags: ["combat", "quick", "singleplayer", "incremental"] },
  { name: "Terraria", tags: ["survival", "coop", "multiplayer", "singleplayer"] },
  { name: "Apex Legends", tags: ["fps", "combat", "multiplayer", "quick"] },
  { name: "Subnautica", tags: ["survival", "story", "singleplayer"] },
  { name: "It Takes Two", tags: ["coop", "multiplayer", "story"] },
  { name: "Hollow Knight", tags: ["combat", "singleplayer", "story"] },
  { name: "Melvor Idle", tags: ["incremental", "singleplayer", "relaxing", "quick"] },
  { name: "Mario Kart 8 Deluxe", tags: ["multiplayer", "quick", "relaxing"] },
  { name: "Animal Crossing", tags: ["cozy", "relaxing", "singleplayer", "multiplayer"] },
  { name: "Portal 2", tags: ["quick", "coop", "story", "singleplayer"] },
  { name: "Borderlands 3", tags: ["fps", "combat", "coop", "multiplayer", "singleplayer", "story"] },
  { name: "Deep Rock Galactic", tags: ["fps", "combat", "coop", "multiplayer", "quick"] },
  { name: "Left 4 Dead 2", tags: ["fps", "combat", "coop", "multiplayer"] },
  { name: "Grounded", tags: ["survival", "combat", "coop", "multiplayer"] },
  { name: "Don't Starve Together", tags: ["survival", "coop", "multiplayer", "story"] },
  { name: "Raft", tags: ["survival", "coop", "multiplayer", "relaxing"] },
  { name: "No Man's Sky", tags: ["survival", "coop", "multiplayer", "singleplayer", "relaxing", "story"] },
  { name: "Palworld", tags: ["survival", "coop", "multiplayer", "singleplayer", "relaxing"] },
  { name: "Core Keeper", tags: ["survival", "coop", "multiplayer", "singleplayer", "incremental"] },
  { name: "Satisfactory", tags: ["incremental", "singleplayer", "coop", "relaxing"] },
  { name: "Shapez", tags: ["incremental", "singleplayer", "relaxing", "quick"] },
  { name: "Universal Paperclips", tags: ["incremental", "singleplayer", "quick"] },
  { name: "Balatro", tags: ["incremental", "singleplayer", "quick"] },
  { name: "Dorfromantik", tags: ["cozy", "relaxing", "singleplayer", "quick"] },
  { name: "Unpacking", tags: ["cozy", "relaxing", "singleplayer", "story"] },
  { name: "Spiritfarer", tags: ["cozy", "story", "singleplayer", "relaxing"] },
  { name: "Cozy Grove", tags: ["cozy", "relaxing", "singleplayer", "quick"] },
  { name: "Slime Rancher", tags: ["cozy", "relaxing", "singleplayer", "story"] },
  { name: "Baldur's Gate 3", tags: ["story", "combat", "singleplayer", "multiplayer", "coop"] },
  { name: "Divinity: Original Sin 2", tags: ["story", "combat", "singleplayer", "multiplayer", "coop"] },
  { name: "Titanfall 2", tags: ["fps", "combat", "singleplayer", "story", "quick"] },
  { name: "SUPERHOT", tags: ["fps", "combat", "singleplayer", "quick"] },
  { name: "Overwatch 2", tags: ["fps", "combat", "multiplayer", "quick"] },
  { name: "Rainbow Six Siege", tags: ["fps", "combat", "multiplayer"] },
  { name: "Destiny 2", tags: ["fps", "combat", "multiplayer", "coop", "story"] },
  { name: "Warframe", tags: ["fps", "combat", "coop", "multiplayer", "incremental"] },
  { name: "Helldivers 2", tags: ["coop", "multiplayer", "fps", "combat", "quick"] },
  { name: "Monster Hunter: World", tags: ["combat", "coop", "multiplayer", "singleplayer"] },
  { name: "Risk of Rain 2", tags: ["combat", "coop", "multiplayer", "quick", "singleplayer"] },
  { name: "Dead Cells", tags: ["combat", "quick", "singleplayer", "incremental"] },
  { name: "PlateUp!", tags: ["coop", "multiplayer", "quick", "relaxing"] },
  { name: "Rocket League", tags: ["multiplayer", "quick", "relaxing"] },
  { name: "Fall Guys", tags: ["multiplayer", "quick", "relaxing"] },
  { name: "Among Us", tags: ["multiplayer", "quick"] }
];

const MATCH_BAR = 80;
const MAX_PICKS = 5;

const form = document.getElementById("matcher-form");
const results = document.getElementById("results");
const hint = document.getElementById("mood-hint");
const limitMsg = document.getElementById("limit-msg");
const clearBtn = document.getElementById("clear-all");
const checkboxes = document.querySelectorAll(".mood-chip input");

checkboxes.forEach(function (box) {
  box.addEventListener("change", function () {
    const count = document.querySelectorAll(".mood-chip input:checked").length;
    if (count > MAX_PICKS) {
      box.checked = false;
      limitMsg.hidden = false;
    } else {
      limitMsg.hidden = true;
      clearBtn.hidden = count === 0;
      hint.textContent = count > 0 ? "Select up to 5. (" + count + " picked)" : "Select up to 5.";
    }
  });
});

clearBtn.addEventListener("click", function () {
  checkboxes.forEach(function (box) {
    box.checked = false;
  });
  clearBtn.hidden = true;
  hint.textContent = "Select up to 5.";
  results.innerHTML = "";
});

function scoreGames(selectedMoods) {
  return GAMES.map(function (game) {
    const hits = selectedMoods.filter(function (mood) {
      return game.tags.includes(mood);
    }).length;
    const percent = Math.round((hits / selectedMoods.length) * 100);
    return { name: game.name, percent: percent };
  }).sort(function (a, b) {
    if (b.percent !== a.percent) return b.percent - a.percent;
    return a.name.localeCompare(b.name);
  });
}

function matchGames(selectedMoods) {
  return scoreGames(selectedMoods).filter(function (result) {
    return result.percent >= MATCH_BAR;
  });
}

function closestGames(selectedMoods, limit) {
  return scoreGames(selectedMoods).filter(function (result) {
    return result.percent > 0 && result.percent < MATCH_BAR;
  }).slice(0, limit);
}

function cardHtml(result) {
  return (
    '<div class="result-card">' +
    '<span class="gname">' + result.name + "</span>" +
    '<span class="score">' + result.percent + "% match</span>" +
    "</div>"
  );
}

function renderResults(cleared, near) {
  if (cleared.length === 0 && near.length === 0) {
    results.innerHTML =
      '<p class="verdict verdict-bad">Nothing cleared the 80% bar this time. ' +
      "Loosen the mood or try a different vibe.</p>";
    return;
  }

  if (cleared.length > 0) {
    const heading = cleared.length === 1
      ? "1 game cleared the 80% bar."
      : cleared.length + " games cleared the 80% bar.";
    const cards = cleared.map(cardHtml).join("");
    results.innerHTML = '<p class="verdict verdict-good">' + heading + "</p>" + cards;
    return;
  }

  const heading = near.length === 1
    ? "Nothing cleared the 80% bar — the closest pick:"
    : "Nothing cleared the 80% bar — the closest picks:";
  const cards = near.map(cardHtml).join("");
  results.innerHTML = '<p class="verdict verdict-bad">' + heading + "</p>" + cards;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const selected = [];
  checkboxes.forEach(function (box) {
    if (box.checked) selected.push(box.value);
  });

  if (selected.length === 0) {
    results.innerHTML = '<p class="verdict verdict-bad">Pick at least one mood first.</p>';
    return;
  }

  const cleared = matchGames(selected);
  const near = cleared.length === 0 ? closestGames(selected, 3) : [];
  renderResults(cleared, near);
  results.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

const revealTargets = document.querySelectorAll(
  "h2, .pain-list, .problem-bridge, .solution-text, .feature-grid, blockquote"
);

if ("IntersectionObserver" in window) {
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(function (el) {
    observer.observe(el);
  });
}