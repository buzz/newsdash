interface Orderable {
  order: number
}

interface WithIsoDate {
  date: string
}

function orderSortComparer<T extends Orderable>(a: T, b: T) {
  return a.order - b.order
}

function dateSortComparer<T extends WithIsoDate>(a: T, b: T) {
  const aDate = new Date(a.date)
  const bDate = new Date(b.date)

  if (aDate < bDate) {
    return 1
  }
  if (aDate > bDate) {
    return -1
  }
  return 0
}

export { dateSortComparer, orderSortComparer }
