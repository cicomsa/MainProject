import { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createEditor } from 'slate'
import { withReact } from 'slate-react'
import { chunk } from '../helpers'
import { addCopy } from '../actions'

const createEditors = timePeriod => {
  const listEditors = []

  for (let i = 0; i < timePeriod.length; i++) {
    const editor = withReact(createEditor())
    listEditors.push(editor)
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
      children: [{ text: '' }], // add correct value if not ''
    }]
    values.push(value)
  })

  return values
}

const setContentValues = (
  timePeriod, period, content, values, editors, dispatch, action
) => {
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

const initialState = {
  period: 0,
  content: {},
  values: [],
  editors: []
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_INITIALS':
      return { ...state, ...payload }
    case 'SET_CONTENT':
      return { ...state, content: payload }
    case 'SET_EDITORS':
      return { ...state, editors: [...state.editors, ...payload] }
    case 'REMOVE_EDITORS':
      return { ...state, editors: payload }
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
  const { period, content, values, editors } = state

  useEffect(() => {
    const editorsList = createEditors(timePeriod)

    action({
      type: 'SET_INITIALS', payload: {
        period: period + 1,
        values: initialValues,
        editors: editorsList
      }
    })
  }, [])

  useEffect(() => {
    setContentValues(timePeriod, period, content, values, editors, dispatch, action)
  }, [period])

  return [{ content, values, period, savedValues, editors }, action]
}

export { setData, createEditors }