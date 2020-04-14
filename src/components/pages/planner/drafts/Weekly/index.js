import React, { useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { createEditor } from 'slate'
import { withReact } from 'slate-react'
import Content from './Content'


const Container = styled.div`
  border-top: 1px solid orange;
`

const chunk = (array, size) => {
  if (!array) return []
  const firstChunk = array.slice(0, size)

  if (!firstChunk.length) {
    return array
  }
  return [firstChunk].concat(chunk(array.slice(size, array.length), size))
}

const Index = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const [weeklies, setWeeklies] = useState(1)
  const [content, setContent] = useState({})
  const [values, setValues] = useState([])
  let editors = {}
  const editorValues = []
  const listEditors = []

  const addWeek = () => setWeeklies(weeklies + 1)
  const removeWeek = () => setWeeklies(weeklies - 1)

  const handleChange = val => {
    const newValues = values.map(vals =>
      vals.map(v =>
        v[0].id === val[0].id
          ? [{ ...v[0], children: val[0].children, change: true }]
          : v)
    )
    setValues(newValues)
  }

  const setContentValues = () => {
    for (let i = 0; i < weeklies * days.length; i++) {
      // editors[`editor${i + 1}`] = useMemo(() => withReact(createEditor()), [])
      editors[`editor${i + 1}`] = withReact(createEditor())
      listEditors.push(editors[`editor${i + 1}`])
    }

    const contents = { days: days, editors: listEditors }

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
      editorValues.push(editorValue)
    })

    const daysLength = days.length

    const chunckedDaysList = chunk(contents.days, days.length)
    const chunckedEditorsList = chunk(contents.editors, days.length)
    const chunckedEditorValuesList = chunk(editorValues, days.length)

    contents.days = chunckedDaysList
    contents.editors = chunckedEditorsList

    setContent(contents)
    setValues(chunckedEditorValuesList)
  }

  useEffect(() => {
    setContentValues()
  }, [weeklies])

  return (
    <>
      <Container>
        {content.days && content.days.map(
          (daysList, i) => {
            return (
              content.days.length === weeklies && (
                <Content editors={content.editors[i]} days={daysList} values={values[i]} handleChange={handleChange} key={i} />
              )
            )
          }
        )}
      </Container>
      <button onClick={addWeek}>+</button>
      {weeklies > 0 && <button onClick={removeWeek}>-</button>}
    </>
  )
}

export default Index
