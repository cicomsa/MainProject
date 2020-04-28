import React from 'react'
import Link from 'next/link'

const LinkComponent = ({ href, title }) => {
  return (
    <Link href={href}>
      <a>{title}</a>
    </Link>
  )
}

export default LinkComponent