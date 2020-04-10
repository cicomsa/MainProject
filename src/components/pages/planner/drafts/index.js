import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import Weekly from './Weekly'

const Links = styled.div`
  margin-bottom: 50px;
`
const Weeklies = styled.div`
  border-top: 1px solid orange;
`

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
      {/weekly/.test(category) && (
        <Weeklies>
          <Weekly />
          <Weekly />
          <Weekly />
          <Weekly />
        </Weeklies>
      )}
    </>
  )
}

export default Index
