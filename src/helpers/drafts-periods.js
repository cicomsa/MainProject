import { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createEditor } from 'slate'
import { withReact } from 'slate-react'
import { chunk } from './index'
import { addCopy } from '../actions'

const createEditors = (period, timePeriod) => {
  const listEditors = []
  let editors = {}

  for (let i = 0; i < period * timePeriod.length; i++) {
    editors[`editor${i + 1}`] = withReact(createEditor())
    listEditors.push(editors[`editor${i + 1}`])
  }
  return listEditors
}

const createEditorValues = contents => {
  const values = []

  contents.periods.forEach((period, i) => {
    const value = [{
      id: i + 1,
      type: 'paragraph',
      periodContent: period,
      children: [{ text: '' }],
    }]
    values.push(value)
  })

  return values
}

const initialState = {
  period: 1,
  content: {},
  values: []
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_CONTENT':
      return { ...state, content: payload }
    case 'SET_PERIOD':
      return { ...state, period: payload }
    case 'SET_VALUES':
      return { ...state, values: payload }
    default:
      return initialState
  }
}

const setData = timePeriod => {
  const dispatch = useDispatch()
  const savedValues = useSelector(state => state.weeklyDrafts)
  const initialValues = savedValues.length ? savedValues : []
  const [state, action] = useReducer(reducer, initialState)
  const { period, content, values } = state

  const setContentValues = () => {
    const editors = createEditors(period, timePeriod)

    const contents = { periods: timePeriod, editors }

    // update contents periods data based on period value
    for (let i = 0; i < period; i++) {
      if (period > 1 && i > 0) contents.periods = contents.periods.concat(timePeriod)
    }

    const editorValues = createEditorValues(contents)

    // chunk contents data per singular period duration
    const periodsLength = timePeriod.length
    const chunckedPeriodsList = chunk(contents.periods, periodsLength)
    const chunckedEditorsList = chunk(contents.editors, periodsLength)
    const chunckedEditorValuesList = chunk(editorValues, periodsLength)

    // update contents data with chunked per singular period duration data
    contents.periods = chunckedPeriodsList
    contents.editors = chunckedEditorsList

    action({ type: 'SET_CONTENT', payload: contents })
    action({ type: 'SET_VALUES', payload: chunckedEditorValuesList })
    dispatch(addCopy(chunckedEditorValuesList))
  }

  useEffect(() => {
    // todo - get rid of this action
    action({ type: 'SET_VALUES', payload: initialValues })
    setContentValues()
  }, [period])

  return [{ content, values, period, savedValues }, action]
}

export { setData }