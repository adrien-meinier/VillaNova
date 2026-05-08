// event.js
import { fetchEvents } from "./api.js";

const params = new URLSearchParams(location.search);
const id = params.get("id");

const container = document.getElementById("eventContainer");

async function load() {

  if (container) container.setAttribute("aria-busy", "true");

  try {

    const events = await fetchEvents();

    const event = events.find(e => String(e.uid) === String(id));

    if (!event) {
      container.innerHTML = `<p role="alert">Événement introuvable</p>`;
      return;
    }

    container.innerHTML = `
      <article class="event-detail">

        <a href="index.html">← Retour</a>

        <h1>${event.title?.fr}</h1>

        <img src="${event.image?.base}" alt="${event.title?.fr}">

        <p>${event.description?.fr || ""}</p>

        <p><strong>Date:</strong> ${event.firstDate}</p>

        <p><strong>Lieu:</strong> ${event.location?.city}</p>

      </article>
    `;

  } catch (err) {
    container.innerHTML = `<p role="alert">Erreur de chargement</p>`;
  } finally {
    if (container) container.setAttribute("aria-busy", "false");
  }
}

load();