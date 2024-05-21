export const LocalStorage = {
  set(key: string, data: any) {
    if (typeof window !== "undefined") {
      return localStorage.setItem(key, JSON.stringify(data));
    }
  },
  get(key: string) {
    let val;
    if (typeof window !== "undefined") {
      if (localStorage.getItem(key)) {
        val = localStorage.getItem(key);
        if (!val) return;
        return JSON.parse(val as any);
      }
      return false;
    }
    return val;
  },
  remove(key: string) {
    if (typeof window !== "undefined") localStorage.removeItem(key);
  },
  clear(key: string) {
    if (typeof window !== "undefined") localStorage.clear();
  },
};
