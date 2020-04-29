import React from 'react'
import { useRouter } from 'next/router'
import Boiler from './Boiler'
import { Links, LinkComponent } from '../../Links'
import planners from '../consts/planners.json'
import { titleLink, renderComponent } from '../../../helpers'

const Index = () => {
  const router = useRouter()
  const { handle, category, id } = router.query
  const { categoriesPlanner } = planners

  const components = c => ({
    main: {
      name: Boiler,
      props: {
        category,
        handleCategory: c,
        key: c,
        id
      }
    },
    link: {
      name: LinkComponent,
      props: {
        href: `/planner/${c}`,
        title: titleLink(c),
        key: c
      }
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

