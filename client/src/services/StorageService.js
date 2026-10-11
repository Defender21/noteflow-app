export class StorageService {
  getItem(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Помилка запису в LocalStorage:', e);
    }
  }

  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Помилка видалення з LocalStorage:', e);
    }
  }
}
