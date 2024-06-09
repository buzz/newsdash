interface Orderable {
  order: number
}

function sortOrderComparer<T extends Orderable>(a: T, b: T) {
  return a.order - b.order
}

export default sortOrderComparer
