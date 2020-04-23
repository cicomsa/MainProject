import { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createEditor } from 'slate'
import { withReact } from 'slate-react'
import { chunk } from '../helpers'
import { addCopy } from '../actions'

const createEditors = (timePeriod, period) => {
  const listEditors = []

  for (let i = 0; i < timePeriod.length; i++) {
    const editor = withReact(createEditor())
    listEditors.push(editor)
  }
  return listEditors
}

const updateContentPeriods = (period, periods, timePeriod) => {
  for (let i = 0; i < period; i++) {
    if (period > 1 && i > 0)
      periods = [...periods, ...timePeriod]
  }

  return periods
}

const createEditorValues = (contents, initialValues) => {
  const valuesList = []
  const children = []

  initialValues && initialValues.map(vals =>
    vals.map(v => children.push(v[0].children))
  )

  contents.periods.forEach((period, i) => {
    const value = [{
      id: i + 1,
      type: 'paragraph',
      periodContent: period,
      children: children[i] ? children[i] : [{ text: '' }]
    }]
    valuesList.push(value)
  })

  return valuesList
}

const setContentValues = (
  timePeriod, period, content, values, editors, dispatch, action
) => {
  const contents = { periods: timePeriod, editors }

  // update contents periods data based on period value
  const length = period === 0 ? values.length : period
  contents.periods = updateContentPeriods(length, contents.periods, timePeriod)

  const editorValues = createEditorValues(contents, values)

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
    case 'REMOVE_PERIOD_DATA':
      return { ...state, ...payload }
    case 'ADD_PERIOD_DATA':
      return {
        ...state,
        period: payload.period,
        editors: [...state.editors, ...payload.editors]
      }
    case 'SET_CONTENT':
      return { ...state, content: payload }
    case 'REMOVE_EDITORS':
      return { ...state, editors: payload }
    case 'SET_VALUES':
      return { ...state, values: payload }
    default:
      return initialState
  }
}

const setData = timePeriod => {
  const dispatch = useDispatch()
  const [state, action] = useReducer(reducer, initialState)
  const { period, content, values, editors } = state
  const savedValues = useSelector(state => state.weeklyDrafts)
  const initialValues = savedValues.length ? savedValues : values

  // on initial state
  useEffect(() => {
    let editorsList = []

    for (let i = 0; i < initialValues.length; i++) {
      const list = createEditors(timePeriod)
      editorsList = [...editorsList, ...list]
    }

    action({
      type: 'SET_INITIALS', payload: {
        period: initialValues.length,
        values: initialValues,
        editors: editorsList
      }
    })
  }, [])

  // on periods number change
  useEffect(() => {
    setContentValues(timePeriod, period, content, initialValues, editors, dispatch, action)
  }, [period])

  return [{ content, values, period, savedValues, editors }, action]
}

export { setData, createEditors }