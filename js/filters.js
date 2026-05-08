export function searchEvents(events, searchTerm) {

  return events.filter(event => {

    const title =
      event.title?.fr?.toLowerCase() || "";

    return title.includes(searchTerm.toLowerCase());

  });

}