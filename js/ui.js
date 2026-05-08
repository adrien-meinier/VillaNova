
export function displayEvents(events) {

  const container = document.getElementById("eventsContainer");

  container.innerHTML = "";

  if (!events || !Array.isArray(events)) {
    container.innerHTML = "<p>Aucun événement disponible</p>";
    return;
  }

  // suppression des doublons (robuste)
  const uniqueEvents = [...new Map(
    events
      .filter(e => e && e.uid)
      .map(event => [event.uid, event])
  ).values()];

  uniqueEvents.forEach(event => {

    // TITRE
    const title = event.title?.fr || "Sans titre";

    // DESCRIPTION (OpenAgenda varie souvent)
    const description =
      event.description?.fr ||
      event.description ||
      "Pas de description disponible";

    // IMAGE (ultra safe)
    const image =
      event.image?.base ||
      event.image?.thumb ||
      event.image?.url ||
      "./assets/images/default.jpg";

    // VILLE / LIEU
    const city =
      event.location?.city ||
      event.location?.address ||
      "Ville inconnue";

    //  DATE
    const date =
      event.firstDate ||
      event.timings?.[0]?.begin ||
      "";

    // CARD HTML
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${image}" alt="${title}">

      <div class="content">

        <span class="badge">${city}</span>

        <h2>${title}</h2>

        <p>${description.slice(0, 90)}...</p>

        <small>${date}</small>

      </div>
    `;

    // clic vers page détail
    card.addEventListener("click", () => {
      window.location.href = `event.html?id=${event.uid}`;
    });

    container.appendChild(card);

  });

}
