export class Storage {
  static getItem (key: string): string | null {
    return localStorage.getItem(key);
  }

  static setItem (key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  static setItems (objectKeys: { [key: string]: string }): void {
    Object.entries(objectKeys).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }
}