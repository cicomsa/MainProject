const chunk = (array, size) => {
  if (!array) return []
  const firstChunk = array.slice(0, size)

  if (!firstChunk.length) {
    return array
  }
  return [firstChunk].concat(chunk(array.slice(size, array.length), size))
}

const titleLink = link => `${link[0].toUpperCase()}${link.slice(1)}`

export {
  chunk,
  titleLink
}