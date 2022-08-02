export const getLocalStorage = (key: string, defaultValue: any) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error: any) {
    throw new Error(`Service Error Status Code : < ${error.response.status} > `, error);
  }
};
