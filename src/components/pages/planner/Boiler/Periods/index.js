import React, { createContext, useEffect, useReducer, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Content from './Content'
import { setData, createEditors } from '@logic/periods'
import { addCopy } from '@actions'

const Container = styled.div`
  border-top: 1px solid orange;
  margin-top: 50px;
`

const HandleChangeContext = createContext()

const Index = ({ timePeriod, category, savedValues, id }) => {
  const dispatch = useDispatch()
  const [{ content, values, period, editors }, action] = setData(timePeriod, category, savedValues, id)

  const addTimePeriod = () => {
    const editorsList = createEditors(timePeriod)
    action({ type: 'ADD_PERIOD_DATA', payload: { period: period + 1, editors: editorsList } })
  }

  const removeTimePeriod = () => {
    const editorsList = editors.splice(7, timePeriod.length * period)
    action({ type: 'REMOVE_PERIOD_DATA', payload: { period: period - 1, editors: editorsList } })
  }

  let timeout = null
  const saveValues = values => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(addCopy({ [id]: { [category]: values } }))
    }, 2000);
  }

  const handleChange = val => {
    const newValues = values.map(vals =>
      vals.map(v =>
        v[0].id === val[0].id
          ? val
          : v)
    )

    action({ type: 'SET_VALUES', payload: newValues })
    // saveValues(newValues) - setTimeout breaks Slate - todo - find alternative
    dispatch(addCopy({ [id]: { [category]: newValues } }))
  }

  return (
    <>
      <Container>
        {content.editors && content.editors.length
          ? content.periods.map((periodsList, i) => {
            const currentValues = savedValues.length ? savedValues[i] : values[i]
            return (
              content.periods.length === period && (
                <HandleChangeContext.Provider value={handleChange} key={`period${i + 1}`}>
                  <Content
                    editors={content.editors[i]}
                    periods={periodsList}
                    values={currentValues}
                  />
                </HandleChangeContext.Provider>
              )
            )
          })
          : <div>Loading...</div>
        }
      </Container>
      <button onClick={addTimePeriod}>+</button>
      {period > 1 && <button onClick={removeTimePeriod}>-</button>}
    </>
  )
}

export default Index
export { HandleChangeContext }
