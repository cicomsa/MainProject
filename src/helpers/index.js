const chunk = (array, size) => {
  if (!array) return []
  const firstChunk = array.slice(0, size)

  if (!firstChunk.length) {
    return array
  }
  return [firstChunk].concat(chunk(array.slice(size, array.length), size))
}

const regex = c => RegExp(c)

const titleLink = link => `${link[0].toUpperCase()}${link.slice(1)}`

const returnComponent = (components, condition, currentHandle, component, index) => {
  if (condition) {
    const Component = components(currentHandle, index)[component].name
    return <Component {...components(currentHandle, index)[component].props} />
  }
}

const renderLink = (categories, components, handle) => {
  return categories.map((c, i) => {
    const testHandle = regex(c)
    const component = returnComponent(components, !testHandle.test(handle), c, 'link', i)

    return component
  })
}

const renderMain = (handle, categories, category, components) => {
  if (handle) {
    const currentHandle = categories.find(category => category === handle)
    const index = categories.indexOf(currentHandle)
    const testHandle = regex(currentHandle)
    const component = returnComponent(components, testHandle.test(handle), currentHandle, 'main', index)

    return component
  }
}

const renderComponent = (
  categories, category, handle, components, link = false
) => {
  if (link) {
    return renderLink(categories, components, handle)
  } else {
    return renderMain(handle, categories, category, components)
  }
}

export {
  chunk,
  titleLink,
  renderComponent
}