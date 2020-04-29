import { regex, titleLink } from '../helpers'

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

export { renderComponent }