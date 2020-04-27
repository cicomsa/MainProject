import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import Boiler from './Boiler'

const Links = styled.div`
  margin-bottom: 50px;

  a {
    margin-right: 5px;
  }
`

const Index = () => {
  const router = useRouter()
  const { handle, category } = router.query

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
        {!/drafts/.test(handle) && (
          <Link href='/planner/drafts'>
            <a>Drafts</a>
          </Link>
        )}
        {!/calendar/.test(handle) && (
          <Link href='/planner/calendar'>
            <a>Calendar</a>
          </Link>
        )}
      </Links>
      {/drafts/.test(handle) && <Boiler category={category} handleCategory='drafts' />}
      {/calendar/.test(handle) && <Boiler category={category} handleCategory='calendar' />}
    </>
  )
}

export default Index
