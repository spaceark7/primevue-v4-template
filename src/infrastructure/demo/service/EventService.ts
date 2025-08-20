export class EventService {
  async getEvents() {
    const res = await fetch('/demo/data/scheduleevents.json', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    const d = await res.json();
    return d.data;
  }
}
