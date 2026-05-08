// api.js
const API_KEY = "94433837a4de4083bce73ec4be7ac2f0";

const SOURCES = [
  "https://api.openagenda.com/v2/agendas/24882772/events",
  "https://api.openagenda.com/v2/agendas/50138154/events",
  "https://api.openagenda.com/v2/agendas/2119473/events"
];

function buildUrl(url) {
  return `${url}?key=${API_KEY}&relative[0]=passed&relative[1]=current&relative[2]=upcoming`;
}

async function fetchWithTimeout(url, timeout = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);

    if (!res.ok) throw new Error(res.status);

    return await res.json();
  } catch (err) {
    clearTimeout(timer);
    return null;
  }
}

export async function fetchEvents() {
  const responses = await Promise.all(
    SOURCES.map(url => fetchWithTimeout(buildUrl(url)))
  );

  const events = responses.flatMap((data, index) => {
    if (!data?.events) return [];

    return data.events.map(e => ({
      ...e,
      source: `Source ${index + 1}`
    }));
  });

  return events;
}