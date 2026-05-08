// app.js
import { fetchEvents } from "./api.js";
import { displayEvents } from "./ui.js";
import { searchEvents } from "./filters.js";

let allEvents = [];

async function init() {

  const container = document.getElementById("eventsContainer");
  if (container) container.setAttribute("aria-busy", "true");

  try {

    allEvents = await fetchEvents();

    displayEvents(allEvents);

  } catch (err) {
    console.error(err);
  } finally {
    if (container) container.setAttribute("aria-busy", "false");
  }
}

init();

// SEARCH (debounce)
const input = document.getElementById("searchInput");

if (input) {

  let timer;

  input.addEventListener("input", (e) => {

    clearTimeout(timer);

    timer = setTimeout(() => {

      const filtered = searchEvents(allEvents, e.target.value);
      displayEvents(filtered);

    }, 200);

  });
}