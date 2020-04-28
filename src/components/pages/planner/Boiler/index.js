import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Periods from './Periods'
import { Links, LinkComponent } from '../../../Links'
import planners from '../../consts/planners.json'
import { setPeriods } from '../../../../logic/boiler'
import { titleLink, renderComponent } from '../../../../helpers'

const Index = ({ category, handleCategory }) => {
  const { handles, drafts } = planners
  const periods = setPeriods(drafts, handleCategory)
  const values = useSelector(state => state.drafts)

  const components = (c, i) => ({
    main: {
      name: Periods,
      props: {
        category: c,
        timePeriod: periods[i],
        savedValues: Object.keys(values).length && values[c] ? values[c] : [],
        key: c
      }
    },
    link: {
      name: LinkComponent,
      props: {
        href: `/planner/${handleCategory}/${c}`,
        title: titleLink(c),
        key: c
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
