export const load = (key) => {
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

export const save = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    // ignore write errors
  }
}
