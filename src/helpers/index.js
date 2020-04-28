const chunk = (array, size) => {
  if (!array) return []
  const firstChunk = array.slice(0, size)

  if (!firstChunk.length) {
    return array
  }
  return [firstChunk].concat(chunk(array.slice(size, array.length), size))
}

const titleLink = link => `${link[0].toUpperCase()}${link.slice(1)}`

const renderComponent = (
  categories, category, handle, components, link = false
) => categories.map((c, i) => {
  const testHandle = RegExp(c)
  if (link) {
    const Component = components(c, i).link.name
    return !testHandle.test(handle) && <Component {...components(c, i).link.props} />
  } else {
    const Component = components(c, i).main.name
    return testHandle.test(handle) && <Component {...components(c, i).main.props} />
  }
})

export {
  chunk,
  titleLink,
  renderComponent
}