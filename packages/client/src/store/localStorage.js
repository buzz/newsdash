export const loadFromLocalStorage = (key) => {
  try {
    const serializedState = localStorage.getItem(key)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch {
    return undefined
  }
}

export const saveToLocalStorage = (key, jsonData) => {
  try {
    localStorage.setItem(key, jsonData)
  } catch {
    // ignore write errors
  }
}
