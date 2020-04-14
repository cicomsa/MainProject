import React, { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { createEditor } from 'slate'
import { withReact } from 'slate-react'
import Weekly from './Weekly'

const Links = styled.div`
  margin-bottom: 50px;
`
const Weeklies = styled.div`
  border-top: 1px solid orange;
`

const chunk = (array, size) => {
  if (!array) return []
  const firstChunk = array.slice(0, size)

  if (!firstChunk.length) {
    return array
  }
  return [firstChunk].concat(chunk(array.slice(size, array.length), size))
}

const Index = ({ category }) => {
  return (
    <>
      <Links>
        {category && (
          <Link href='/planner/drafts/'>
            <a>Drafts</a>
          </Link>
        )}
        {!/weekly/.test(category) && (
          <Link href='/planner/drafts/weekly'>
            <a>Weekly</a>
          </Link>
        )}
      </Links>
      {/weekly/.test(category) && <Weekly />}
    </>
  )
}

export default Index
