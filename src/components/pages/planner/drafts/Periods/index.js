import React, { useState, useMemo, useEffect, createContext } from 'react'
import styled from 'styled-components'
import { createEditor } from 'slate'
import { withReact } from 'slate-react'
import Content from './Content'
import { chunk } from '../../../helpers'

const Container = styled.div`
  border-top: 1px solid orange;
`

const setData = timePeriod => {
  const [period, setPeriod] = useState(1)
  const [content, setContent] = useState({})
  const [values, setValues] = useState([])
  let editors = {}
  const editorValues = []
  const listEditors = []

  const setContentValues = () => {
    // create editors
    for (let i = 0; i < period * timePeriod.length; i++) {
      // @todo - editors[`editor${i + 1}`] = useMemo(() => withReact(createEditor()), [])
      editors[`editor${i + 1}`] = withReact(createEditor())
      listEditors.push(editors[`editor${i + 1}`])
    }

    const contents = { periods: timePeriod, editors: listEditors }

    // update contents periods data
    for (let i = 0; i < period; i++) {
      if (period > 1 && i > 0) contents.periods = contents.periods.concat(timePeriod)
    }

    // create editors children value
    contents.periods.forEach((period, i) => {
      const editorValue = [{
        id: i + 1,
        type: 'paragraph',
        periodContent: period,
        children: [{ text: '' }],
      }]
      editorValues.push(editorValue)
    })

    // chunk contents data per singular period duration
    const periodsLength = timePeriod.length
    const chunckedPeriodsList = chunk(contents.periods, periodsLength)
    const chunckedEditorsList = chunk(contents.editors, periodsLength)
    const chunckedEditorValuesList = chunk(editorValues, periodsLength)

    // update contents data with chunked per singular period duration data
    contents.periods = chunckedPeriodsList
    contents.editors = chunckedEditorsList

    setContent(contents)
    setValues(chunckedEditorValuesList)
  }

  useEffect(() => {
    setContentValues()
  }, [period])

  return [{ content, values, period }, setPeriod, setValues];
};

const HandleChangeContext = createContext()

const Index = ({ timePeriod }) => {
  const [{ content, values, period }, setPeriod, setValues] = setData(timePeriod)

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

  return (
    <>
      <Container>
        {content.periods && content.periods.map(
          (periodsList, i) => {
            return (
              content.periods.length === period && (
                <HandleChangeContext.Provider value={handleChange} key={`period${i + 1}`}>
                  <Content editors={content.editors[i]} periods={periodsList} values={values[i]} />
                </HandleChangeContext.Provider>
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
export { HandleChangeContext }
