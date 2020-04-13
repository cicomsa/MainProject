import React, { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { createEditor } from 'slate'
import { withReact } from 'slate-react'
import Weekly from './Weekly'

const Links = styled.div`
  margin-bottom: 50px;
`
const Weeklies = styled.div`
  border-top: 1px solid orange;
`

const Index = ({ category }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const [weeklies, setWeeklies] = useState(1)
  const [content, setContent] = useState({})
  let editors = {}

  useEffect(() => {
    for (let i = 0; i < weeklies * days.length; i++) {
      // editors[`editor${i + 1}`] = useMemo(() => withReact(createEditor()), [])
      editors[`editor${i + 1}`] = withReact(createEditor())
    }

    const contents = { days: days, editors }

    for (let i = 0; i < weeklies; i++) {
      if (weeklies > 1 && i > 0) contents.days = contents.days.concat(days)
    }

    setContent(contents)
  }, [weeklies])

  const addWeek = () => setWeeklies(weeklies + 1)
  const removeWeek = () => setWeeklies(weeklies - 1)

  return (
    <>
      <Links>
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
      </Links>
      {/weekly/.test(category) && (
        <>
          <Weeklies>
            <Weekly content={content} weeklies={weeklies} />
          </Weeklies>
          <button onClick={addWeek}>+</button>
          {weeklies > 0 && <button onClick={removeWeek}>-</button>}
        </>
      )}
    </>
  )
}

export default Index
