import React, { useState } from 'react'
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
  const [weeklies, setWeeklies] = useState(1)
  const displayWeeklies = []

  for (let i = 0; i < weeklies; i++) {
    displayWeeklies.push(<Weekly key={`week${i + 1}`} />)
  }

  const addWeek = () => setWeeklies(weeklies + 1)
  const removeWeek = () => setWeeklies(weeklies - 1)

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
        <>
          <Weeklies>{displayWeeklies}</Weeklies>
          <button onClick={addWeek}>+</button>
          {weeklies > 0 && <button onClick={removeWeek}>-</button>}
        </>
      )}
    </>
  )
}

export default Index
