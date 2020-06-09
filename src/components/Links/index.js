import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { titleLink } from '@helpers'

const Links = styled.div`
  a {
    margin-right: 5px;
  }
`

const LinkComponent = ({ href, title }) => {
  return (
    <Link href={href}>
      <a>{title}</a>
    </Link>
  )
}

const link = (href, category, c, i) =>
  ({
    name: LinkComponent,
    props: {
      href: `/planner/${href}`,
      title: isNaN(c) ? titleLink(c) : `${titleLink(category)} ${i + 1}`,
      key: c
    }
  })

export { Links, LinkComponent, link }