// import React from 'react'
// import { useRouter } from 'next/router'
// import Link from 'next/link'
// import styled from 'styled-components'
// import Boiler from './Boiler'
// import planners from '../consts/planners.json'
// import { titleLink, renderComponent } from '../../../helpers'

// const Links = styled.div`
//   margin-bottom: 50px;

//   a {
//     margin-right: 5px;
//   }
// `

// const linkComponent = (props, title) => {
//   return (
//     <Link {...props}>
//       <a>{title}</a>
//     </Link>
//   )
// }

// const Index = () => {
//   const router = useRouter()
//   const { handle, category } = router.query
//   const { categoriesPlanner } = planners
//   const component = c => <Boiler key={c} category={category} handleCategory={c} />

//   const link = c => linkComponent({ key: c, href: `/planner/${c}` }, titleLink(c))

//   return (
//     <>
//       <div>
//         {linkComponent({ href: '/' }, 'Homepage')}
//       </div>
//       <Links>
//         {linkComponent({ href: '/planner' }, 'Main Planner')}
//         {renderComponent(categoriesPlanner, category, handle, link, true)}
//       </Links>
//       {renderComponent(categoriesPlanner, category, handle, component)}
//     </>
//   )
// }

// export default Index

import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import Boiler from './Boiler'
import LinkComponent from '../../LinkComponent'
import planners from '../consts/planners.json'
import { titleLink, renderComponent } from '../../../helpers'

const Links = styled.div`
  margin-bottom: 50px;

  a {
    margin-right: 5px;
  }
`

const Index = () => {
  const router = useRouter()
  const { handle, category } = router.query
  const { categoriesPlanner } = planners
  // const component = c => <Boiler key={c} category={category} handleCategory={c} />

  // const link = c => <LinkComponent key={c} href={`/planner/${c}`} title={titleLink(c)} />

  const components = c => ({
    main: {
      name: Boiler,
      props: {
        category: category,
        handleCategory: c,
        key: c
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

