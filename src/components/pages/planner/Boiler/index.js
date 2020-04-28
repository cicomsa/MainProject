import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Periods from './Periods'
import LinkComponent from '../../../LinkComponent'
import planners from '../../consts/planners.json'
import { setPeriods } from '../../../../logic/boiler'
import { titleLink, renderComponent } from '../../../../helpers'

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
  // const component = (handle, i) =>
  //   <Periods
  //     key={handle}
  //     category={handle}
  //     timePeriod={periods[i]}
  //     savedValues={Object.keys(values).length && values[handle] ? values[handle] : []}
  //   />
  // const link = handle =>
  //   <LinkComponent
  //     key={handle}
  //     href={`/planner/${handleCategory}/${handle}`}
  //     title={titleLink(handle)}
  //   />

  const components = (handle, i) => ({
    main: {
      name: Periods,
      props: {
        category: handle,
        timePeriod: periods[i],
        savedValues: Object.keys(values).length && values[handle] ? values[handle] : [],
        key: handle
      }
    },
    link: {
      name: LinkComponent,
      props: {
        href: `/planner/${handleCategory}/${handle}`,
        title: titleLink(handle),
        key: handle
      }
    }
  })

  return (
    <>
      <Links>
        {category && (
          <LinkComponent
            href={`/planner/${handleCategory}`}
            title={titleLink(handleCategory)}
          />
        )}
        {renderComponent(handles, category, category, components, true)}
      </Links>
      {/* NOTE: handles and corresponding data must have the same order in planners.json:
      "Daily" - "hours", "Weekly" - "days", etc. */}
      {renderComponent(handles, category, category, components)}
    </>
  )
}

export default Index
