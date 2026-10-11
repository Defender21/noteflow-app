export class DIContainer {
  constructor() {
    this.services = new Map();
  }

  register(key, instance) {
    this.services.set(key, instance);
    return this;
  }

  resolve(key) {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`[DIContainer]: Залежність "${key}" не знайдено.`);
    }
    return service;
  }
}
