export class Storage {
  static getItemFromLocalStorage (key: string): string | null {
    return localStorage.getItem(key);
  }

  static setItemInLocalStorage (key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  static setItemsInLocalStorage (objectKeys: { [key: string]: string }): void {
    Object.entries(objectKeys).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }

  static getCookies (): { [key: string]: string } {
    const stringCookiesArray = document.cookie.split(';');

    const cookiesObject = stringCookiesArray.reduce((cookiesObject: { [key: string]: string }, cookieString: string) => {
      const [cookieKey, cookieValue]: string[] = cookieString.trim().split('=');
      cookiesObject[cookieKey] = cookieValue;
  
      return cookiesObject;
    }, {});

    return cookiesObject;
  }

  static removeCookies (cookiesToRemove: string[] | string): void {
    if (typeof cookiesToRemove === 'string') {
      document.cookie = `${cookiesToRemove}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      return;
    }

    cookiesToRemove.forEach((cookie: string) => {
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    });
  }
}