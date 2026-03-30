export default defineNuxtPlugin(() => {
  if (!process.client) return;

  const fbq = (window as any).fbq;
  if (!fbq) {
    if (import.meta.dev) {
      console.warn("[MetaPixel] fbq not found");
    }
    return;
  }

  const track = (event: string, params: Record<string, any> = {}) => {
    try {
      const eventId = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}`;

      fbq("track", event, {
        ...params,
        event_id: eventId,
      });

      return eventId;
    } catch (err) {
      if (import.meta.dev) {
        console.warn("[MetaPixel]", err);
      }
    }
  };

  return {
    provide: {
      fbTrack: track,
    },
  };
});
