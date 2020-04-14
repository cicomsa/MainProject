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
  const [values, setValues] = useState([])
  let editors = {}
  let editorValues = []

  const addWeek = () => setWeeklies(weeklies + 1)
  const removeWeek = () => setWeeklies(weeklies - 1)

  const handleChange = val => {
    const newValues = values.map(v =>
      v[0].id === val[0].id
        ? [{ ...v[0], children: val[0].children, change: true }]
        : v)
    setValues(newValues)
  }

  useEffect(() => {
    for (let i = 0; i < weeklies * days.length; i++) {
      // editors[`editor${i + 1}`] = useMemo(() => withReact(createEditor()), [])
      editors[`editor${i + 1}`] = withReact(createEditor())
    }

    const contents = { days: days, editors }

    for (let i = 0; i < weeklies; i++) {
      if (weeklies > 1 && i > 0) contents.days = contents.days.concat(days)
    }

    contents.days.forEach((day, i) => {
      const editorValue = [{
        id: i + 1,
        type: 'paragraph',
        day: day,
        children: [{ text: '' }],
      }]
      editorValues = [...editorValues, editorValue]
    })

    setContent(contents)
    setValues(editorValues)
  }, [weeklies])

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
            {content.days && content.days.length === weeklies * days.length && (
              <Weekly content={content} values={values} handleChange={handleChange} />
            )}
          </Weeklies>
          <button onClick={addWeek}>+</button>
          {weeklies > 0 && <button onClick={removeWeek}>-</button>}
        </>
      )}
    </>
  )
}

export default Index
