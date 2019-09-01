export const actionTypes = {
  PRUNE: 'PRUNE',
}

export const prune = (feedId) => ({
  type: actionTypes.PRUNE,
  feedId,
})
