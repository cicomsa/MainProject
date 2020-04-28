import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

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

export { Links, LinkComponent }