// filters.js
export function searchEvents(events, query = "") {

  const q = query.toLowerCase().trim();

  if (!q) return events;

  return events.filter(e => {

    const title = e.title?.fr?.toLowerCase() || "";
    const desc = e.description?.fr?.toLowerCase() || "";
    const city = e.location?.city?.toLowerCase() || "";
    const source = e.source?.toLowerCase() || "";

    return (
      title.includes(q) ||
      desc.includes(q) ||
      city.includes(q) ||
      source.includes(q)
    );
  });
}