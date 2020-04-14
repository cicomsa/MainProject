import React, { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { createEditor } from 'slate'
import { withReact } from 'slate-react'
import Periods from './Periods'
import planners from '../../consts/planners.json'

const Links = styled.div`
  margin-bottom: 50px;

  a {
    margin-right: 5px;
  }
`
const Weeklies = styled.div`
  border-top: 1px solid orange;
`

const Index = ({ category }) => {
  const { days, months, years, handles } = planners.drafts
  const periods = [days, months, years]

  return (
    <>
      <Links>
        {category && (
          <Link href='/planner/drafts/'>
            <a>Drafts</a>
          </Link>
        )}
        {handles.map(handle => {
          const testHandle = RegExp(handle.toLowerCase())
          return !testHandle.test(category) && (
            <Link key={handle} href={`/planner/drafts/${handle.toLowerCase()}`}>
              <a>{handle}</a>
            </Link>
          )
        })}
      </Links>
      {handles.map((handle, i) => {
        const testHandle = RegExp(handle.toLowerCase())
        return testHandle.test(category) && (
          <Periods key={handle} timePeriod={periods[i]} />
        )
      })}
    </>
  )
}

export default Index
