import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Weekly from './Weekly'

const Index = ({ category }) => {
  return (
    <div>
      {category && (
        <Link href='/planner/drafts/'>
          <a>Drafts</a>
        </Link>
      )}
      {!/weekly/.test(category) && (
        <Link href='/planner/drafts/weekly'>
          <a>Weekly</a>
        </Link>
      )}
      {/weekly/.test(category) && <Weekly />}
    </div>
  )
}

export default Index
