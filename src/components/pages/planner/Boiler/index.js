import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Periods from './Periods'
import { Links, LinkComponent } from '../../../Links'
import planners from '../../consts/planners.json'
import { setPeriods } from '../../../../logic/boiler'
import { titleLink, renderComponent } from '../../../../helpers'

const Index = ({ category, handleCategory, id }) => {
  const { handles, drafts } = planners
  const periods = setPeriods(drafts, handleCategory)
  const savedValues = useSelector(state => state.drafts)
  const values = savedValues[id]
  const newIndex = Object.keys(savedValues).length + 1

  const components = (c, i) => ({
    main: {
      name: Periods,
      props: {
        category: c,
        timePeriod: periods[i],
        savedValues: values && Object.keys(values).length && values[c] ? values[c] : [],
        key: c,
        id
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
      <Links>
        {/* to do - show the list of drafts */}
        {category && (
          <LinkComponent
            href={`/planner/${handleCategory}/${category}/1`}
            title={`Draft 1`}
          />
        )}
      </Links>
      <Links>
        {category && (
          <LinkComponent
            href={`/planner/${handleCategory}/${category}/${newIndex}`}
            title='New draft'
          />
        )}
      </Links>
      {/* <button onClick={() => console.log('j')}>New draft</button> */}
      {/* NOTE: handles and corresponding data must have the same order in planners.json:
      "Daily" - "hours", "Weekly" - "days", etc. */}
      {id && renderComponent(handles, category, category, components)}
    </>
  )
}

export default Index
