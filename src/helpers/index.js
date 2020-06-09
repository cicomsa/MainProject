import { LinkComponent } from '@components/Links'

const chunk = (array, size) => {
  if (!array) return []
  const firstChunk = array.slice(0, size)

  if (!firstChunk.length) {
    return array
  }
  return [firstChunk].concat(chunk(array.slice(size, array.length), size))
}

const titleLink = link => `${link[0].toUpperCase()}${link.slice(1)}`

const linkComponent = (href, category, c, i) =>
  ({
    name: LinkComponent,
    props: {
      href: `/planner/${href}`,
      title: isNaN(c) ? titleLink(c) : `${titleLink(category)} ${i + 1}`,
      key: c
    }
  })


export {
  chunk,
  titleLink,
  linkComponent
}