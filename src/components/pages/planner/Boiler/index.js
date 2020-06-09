import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Periods from './Periods'
import { Links, LinkComponent, link } from '@components/Links'
import planners from '@consts/planners.json'
import { setPeriods } from '@logic/boiler'
import { titleLink } from '@helpers'
import { renderComponent } from '@logic/render-component'

const Index = ({ category, handleCategory, id }) => {
  const { handles, drafts } = planners
  const periods = setPeriods(drafts, handleCategory)
  const values = useSelector(state => state.drafts)
  const ids = []

  const components = (c, type, i) =>
    type === 'link'
      ? link(`${handleCategory}/${c}`, c, c)
      : ({
        name: Periods,
        props: {
          category: c,
          timePeriod: periods[i],
          savedValues:
            values && Object.keys(values).length && values[id][c]
              ? values[id][c]
              : [],
          key: c,
          id
        }
      })

  const idsLinks = (c, type, i) =>
    link(`${handleCategory}/${category}/${i + 1}`, category, c, i)

  Object.keys(values).map(key => {
    if (values[key][category]) {
      ids.push(key)
    }
  })

  const newIndex = ids.length + 1

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
      <Links>
        {category && renderComponent(ids, category, id, idsLinks, true)}
      </Links>
      <Links>
        {category && (
          <LinkComponent
            href={`/planner/${handleCategory}/${category}/${newIndex}`}
            title={`New ${category}`}
          />
        )}
      </Links>
      {/* NOTE: handles and corresponding data must have the same order in planners.json:
      "Daily" - "hours", "Weekly" - "days", etc. */}
      {id && renderComponent(handles, category, category, components)}
    </>
  )
}

export default Index
