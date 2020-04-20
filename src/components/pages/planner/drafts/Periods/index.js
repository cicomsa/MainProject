import React, { createContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Content from './Content'
import { setData } from '../../../../../helpers/drafts-periods'
import { addCopy } from '../../../../../actions'

const Container = styled.div`
  border-top: 1px solid orange;
`

const HandleChangeContext = createContext()

const Index = ({ timePeriod }) => {
  const dispatch = useDispatch()
  const [{ content, values, period, savedValues }, action] = setData(timePeriod)

  const addTimePeriod = () => action({ type: 'SET_PERIOD', payload: period + 1 })
  const removeTimePeriod = () => action({ type: 'SET_PERIOD', payload: period - 1 })

  const handleChange = val => {
    const newValues = values.map(vals =>
      vals.map(v =>
        v[0].id === val[0].id
          ? val
          : v)
    )

    action({ type: 'SET_VALUES', payload: newValues })
    dispatch(addCopy(newValues))
  }

  return (
    <>
      <Container>
        {content.periods && content.periods.map(
          (periodsList, i) => {
            const currentValues = savedValues.length ? savedValues[i] : values[i]
            return (
              content.periods.length === period && (
                <HandleChangeContext.Provider value={handleChange} key={`period${i + 1}`}>
                  <Content editors={content.editors[i]} periods={periodsList} values={currentValues} />
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
