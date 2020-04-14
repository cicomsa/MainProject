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

const Index = ({ timePeriod }) => {
  const [period, setPeriod] = useState(1)
  const [content, setContent] = useState({})
  const [values, setValues] = useState([])
  let editors = {}
  const editorValues = []
  const listEditors = []

  const addTimePeriod = () => setPeriod(period + 1)
  const removeTimePeriod = () => setPeriod(period - 1)

  const handleChange = val => {
    const newValues = values.map(vals =>
      vals.map(v =>
        v[0].id === val[0].id
          ? val
          : v)
    )
    setValues(newValues)
  }

  const setContentValues = () => {
    for (let i = 0; i < period * timePeriod.length; i++) {
      // editors[`editor${i + 1}`] = useMemo(() => withReact(createEditor()), [])
      editors[`editor${i + 1}`] = withReact(createEditor())
      listEditors.push(editors[`editor${i + 1}`])
    }

    const contents = { periods: timePeriod, editors: listEditors }

    for (let i = 0; i < period; i++) {
      if (period > 1 && i > 0) contents.periods = contents.periods.concat(timePeriod)
    }

    contents.periods.forEach((period, i) => {
      const editorValue = [{
        id: i + 1,
        type: 'paragraph',
        periodContent: period,
        children: [{ text: '' }],
      }]
      editorValues.push(editorValue)
    })

    const periodsLength = timePeriod.length

    const chunckedPeriodsList = chunk(contents.periods, periodsLength)
    const chunckedEditorsList = chunk(contents.editors, periodsLength)
    const chunckedEditorValuesList = chunk(editorValues, periodsLength)

    contents.periods = chunckedPeriodsList
    contents.editors = chunckedEditorsList

    setContent(contents)
    setValues(chunckedEditorValuesList)
  }

  useEffect(() => {
    setContentValues()
  }, [period])

  return (
    <>
      <Container>
        {content.periods && content.periods.map(
          (periodsList, i) => {
            return (
              content.periods.length === period && (
                <Content editors={content.editors[i]} periods={periodsList} values={values[i]} handleChange={handleChange} key={i} />
              )
            )
          }
        )}
      </Container>
      <button onClick={addTimePeriod}>+</button>
      {period > 1 && <button onClick={removeTimePeriod}>-</button>}
    </>
  )
}

export default Index
