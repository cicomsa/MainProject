import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import Boiler from './Boiler'
import planners from '../consts/planners.json'
import { titleLink } from '../../../helpers'

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

  return (
    <>
      <div>
        <Link href='/'>
          <a>Homepage</a>
        </Link>
      </div>
      <Links>
        {handle && (
          <Link href='/planner'>
            <a>Main Planner</a>
          </Link>
        )}
        {categoriesPlanner.map(c => {
          const testHandle = RegExp(c)
          return !testHandle.test(handle) && (
            <Link key={c} href={`/planner/${c}`}>
              <a>{titleLink(c)}</a>
            </Link>
          )
        })}
      </Links>
      {categoriesPlanner.map(c => {
        const testHandle = RegExp(c)
        return testHandle.test(handle) && (
          <Boiler key={c} category={category} handleCategory={c} />
        )
      })}
    </>
  )
}

export default Index
