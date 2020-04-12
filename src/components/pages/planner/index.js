import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Drafts from './drafts'

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
      {/drafts/.test(handle) && <Drafts category={category} />}
    </>
  )
}

export default Index
