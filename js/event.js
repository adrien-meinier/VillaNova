const API_KEY = "94433837a4de4083bce73ec4be7ac2f0";

const SOURCES = [
  "https://api.openagenda.com/v2/agendas/24882772/events",
  "https://api.openagenda.com/v2/agendas/50138154/events",
  "https://api.openagenda.com/v2/agendas/2119473/events"
];

const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

const container = document.getElementById("eventContainer");

async function loadEvent() {

  try {

    //  fetch des 3 APIs en parallèle
    const responses = await Promise.all(
      SOURCES.map(url =>
        fetch(`${url}?key=${API_KEY}&relative[0]=passed&relative[1]=current&relative[2]=upcoming`)
      )
    );

    const data = await Promise.all(
      responses.map(res => res.json())
    );

    // 🔥 2. fusion des events
    const allEvents = data.flatMap(d => d.events || []);

    // 🔥 3. recherche event
    const event = allEvents.find(e => String(e.uid) === String(eventId));

    if (!event) {
      container.innerHTML = "<p>Événement introuvable</p>";
      return;
    }

    // SAFE DATA
    const title = event.title?.fr || "Sans titre";

    const description =
      event.description?.fr ||
      event.description ||
      "Pas de description disponible";

    const image =
      event.image?.base ||
      event.image?.thumb ||
      event.image ||
      "./assets/images/default.jpg";

    const date =
      event.firstDate ||
      event.dates?.begin ||
      "Date inconnue";

    const location =
      event.location?.address ||
      event.location?.city ||
      "Lieu inconnu";

    const source =
      event.source || "Marseille";

    // RENDER
    container.innerHTML = `
      <div class="event-detail">

        <span class="badge">${source}</span>

        <h1>${title}</h1>

        <img src="${image}" alt="${title}">

        <p>${description}</p>

        <p><strong>Date :</strong> ${date}</p>

        <p><strong>Lieu :</strong> ${location}</p>

        <a href="index.html">← Retour</a>

      </div>
    `;

  } catch (error) {

    console.error(error);

    container.innerHTML =
      "<p>Erreur lors du chargement de l'événement</p>";

  }

}

loadEvent();