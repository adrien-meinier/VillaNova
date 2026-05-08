// ui.js
export function displayEvents(events) {

  const container = document.getElementById("eventsContainer");
  if (!container) return;

  container.innerHTML = "";

  if (!events.length) {
    container.innerHTML = `<p role="status">Aucun événement trouvé</p>`;
    return;
  }

  const unique = [...new Map(events.map(e => [e.uid, e])).values()];

  unique.forEach(event => {

    const title = event.title?.fr || "Sans titre";

    const image =
      event.image?.base ||
      event.image?.thumb ||
      "./assets/images/default.jpg";

    const city = event.location?.city || "Ville inconnue";

    const date =
      event.firstDate ||
      event.timings?.[0]?.begin ||
      "Date inconnue";

    const card = document.createElement("article");

    card.className = "card";
    card.tabIndex = 0;
    card.setAttribute("role", "link");
    card.setAttribute("aria-label", title);

    const go = () => {
      window.location.href = `event.html?id=${event.uid}`;
    };

    card.addEventListener("click", go);
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") go();
    });

    card.innerHTML = `
      <img src="${image}" alt="Image ${title}">
      <div class="content">
        <span class="badge">${city}</span>
        <h2>${title}</h2>
        <small>${date}</small>
      </div>
    `;

    container.appendChild(card);
  });
}
