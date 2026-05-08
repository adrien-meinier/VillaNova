const API_KEY = "94433837a4de4083bce73ec4be7ac2f0";

// les trois sources
const SOURCES = [
  {
    name: "Opéra / Culture",
    url: "https://api.openagenda.com/v2/agendas/24882772/events"
  },
  {
    name: "Concerts",
    url: "https://api.openagenda.com/v2/agendas/50138154/events"
  },
  {
    name: "Marseille global",
    url: "https://api.openagenda.com/v2/agendas/2119473/events"
  }
];

//fonction utilitaire (ajoute paramètres communs)
function buildUrl(baseUrl) {
  return `${baseUrl}?key=${API_KEY}&relative[0]=passed&relative[1]=current&relative[2]=upcoming`;
}

export async function fetchEvents() {

  try {

    // fetch de toutes les sources en parallèle
    const responses = await Promise.all(
      SOURCES.map(source =>
        fetch(buildUrl(source.url))
      )
    );

    const data = await Promise.all(
      responses.map(res => res.json())
    );

    // fusion + ajout de la source (important pour UI)
    const allEvents = data.flatMap((dataset, index) => {

      const sourceName = SOURCES[index].name;

      const events = dataset.events || [];

      return events.map(event => ({
        ...event,
        source: sourceName // utile pour badges UI
      }));

    });

    return allEvents;

  } catch (error) {

    console.error("API error:", error);

    return [];

  }

}