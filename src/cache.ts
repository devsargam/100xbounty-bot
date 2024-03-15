// Copied from chatgpt I dont know how to write programs

export class EventCache {
  private cache: Map<string, number> = new Map();

  constructor(private expiryTime: number = 1000) {
    setInterval(this.cleanup.bind(this), this.expiryTime);
  }

  setId(id: string) {
    this.cache.set(id, Date.now());
  }

  idPresent(id: string) {
    return !!this.cache.get(id);
  }

  private cleanup() {
    const now = Date.now();
    for (const [id, timestamp] of this.cache.entries()) {
      if (now - timestamp >= this.expiryTime) {
        this.cache.delete(id);
      }
    }
  }
}
