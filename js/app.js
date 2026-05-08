import { fetchEvents } from "./api.js";
import { displayEvents } from "./ui.js";
import { searchEvents } from "./filters.js";

let allEvents = [];

async function init() {

  allEvents = await fetchEvents();

  console.log(allEvents); // 👈 DEBUG IMPORTANT

  displayEvents(allEvents);

}

init();

// sécurité DOM
const searchInput = document.getElementById("searchInput");

if (searchInput) {

  searchInput.addEventListener("input", (e) => {

    const filteredEvents =
      searchEvents(allEvents, e.target.value);

    displayEvents(filteredEvents);

  });

}