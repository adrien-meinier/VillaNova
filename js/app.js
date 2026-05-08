import { fetchEvents } from "./api.js";
import { displayEvents } from "./ui.js";
import { searchEvents } from "./filters.js";

let allEvents = [];

/* =========================
   NAVBAR (AUTH STATE)
========================= */
function updateNav() {
  const navLinks = document.querySelector(".nav__links");
  if (!navLinks) return;

  const isLogged = localStorage.getItem("isLogged");

  if (isLogged) {
    navLinks.innerHTML = `
      <li><a href="index.html">Événements</a></li>
      <li><a href="#" id="logoutBtn">Déconnexion</a></li>
    `;

    document.getElementById("logoutBtn")?.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("isLogged");
      window.location.href = "login.html";
    });

  } else {
    navLinks.innerHTML = `
      <li><a href="index.html">Événements</a></li>
      <li><a href="login.html">Connexion</a></li>
    `;
  }
}

/* =========================
   INIT APP
========================= */
async function init() {

  updateNav();

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

/* =========================
   SEARCH (debounce)
========================= */
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