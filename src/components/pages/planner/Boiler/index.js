import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import Periods from './Periods'
import planners from '../../consts/planners.json'
import { setPeriods } from '../../../../logic/boiler'
import { titleLink } from '../../../../helpers'

const Links = styled.div`
  margin-bottom: 50px;

  a {
    margin-right: 5px;
  }
`
const Weeklies = styled.div`
  border-top: 1px solid orange;
`

const Index = ({ category, handleCategory }) => {
  const { handles, drafts } = planners
  const periods = setPeriods(drafts, handleCategory)
  const values = useSelector(state => state.drafts)

  return (
    <>
      <Links>
        {category && (
          <Link href={`/planner/${handleCategory}`}>
            <a>{titleLink(handleCategory)}</a>
          </Link>
        )}
        {handles.map(handle => {
          const testHandle = RegExp(handle)
          return !testHandle.test(category) && (
            <Link key={handle} href={`/planner/${handleCategory}/${handle}`}>
              <a>{titleLink(handle)}</a>
            </Link>
          )
        })}
      </Links>
      {/* NOTE: handles and corresponding data must have the same order in planners.json: "Daily" - "hours", "Weekly" - "days", etc. */}
      {handles.map((handle, i) => {
        const testHandle = RegExp(handle)
        return testHandle.test(category) && (
          <Periods
            key={handle}
            category={handle}
            timePeriod={periods[i]}
            savedValues={Object.keys(values).length && values[handle] ? values[handle] : []}
          />
        )
      })}
    </>
  )
}

export default Index
