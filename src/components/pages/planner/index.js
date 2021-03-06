import React from 'react'
import { useRouter } from 'next/router'
import Boiler from './Boiler'
import { Links, LinkComponent, link } from '@components/Links'
import planners from '@consts/planners.json'
import { renderComponent } from '@logic/render-component'

const Index = () => {
  const router = useRouter()
  const { handle, category, id } = router.query
  const { categoriesPlanner } = planners

  const components = (c, type) =>
    type === 'link'
      ? link(c, c, c)
      : ({
        name: Boiler,
        props: {
          category,
          handleCategory: c,
          key: c,
          id
        }
      })

  return (
    <>
      <div>
        <LinkComponent href='/' title='Homepage' />
      </div>
      <Links>
        <LinkComponent href='/planner' title='Main Planner' />
        {renderComponent(categoriesPlanner, category, handle, components, true)}
      </Links>
      {renderComponent(categoriesPlanner, category, handle, components)}
    </>
  )
}

export default Index

