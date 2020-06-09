import { useEffect, useReducer } from 'react'
import { useDispatch } from 'react-redux'
import { createEditor } from 'slate'
import { withReact } from 'slate-react'
import { chunk } from '@helpers'
import { addCopy } from '@actions'

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
    case 'SET_CONTENT_AND_VALUES':
      return { ...state, ...payload }
    case 'ADD_PERIOD_DATA':
      return {
        ...state,
        period: payload.period,
        editors: [...state.editors, ...payload.editors]
      }
    case 'REMOVE_EDITORS':
      return { ...state, editors: payload }
    case 'SET_VALUES':
      return { ...state, values: payload }
    default:
      return initialState
  }
}

const createEditors = (timePeriod, period) => {
  const listEditors = []

  timePeriod.forEach(() => {
    const editor = withReact(createEditor())
    listEditors.push(editor)
  })

  return listEditors
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

const updateContentPeriods = (period, periods, timePeriod) => {
  for (let i = 0; i < period; i++) {
    if (period > 1 && i > 0)
      periods = [...periods, ...timePeriod]
  }

  return periods
}

const setContentValues = (
  timePeriod, period, content, values, editors, dispatch, action, category, id
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

  action({
    type: 'SET_CONTENT_AND_VALUES', payload: {
      content: contents,
      values: chunckedEditorValuesList
    }
  })
  dispatch(addCopy({ [id]: { [category]: chunckedEditorValuesList } }))
}

const setData = (timePeriod, category, savedValues, id) => {
  const dispatch = useDispatch()
  const [state, action] = useReducer(reducer, initialState)
  const { period, content, values, editors } = state
  // todo - if no delayed auto-saved implemented, to keep only the redux version of the values (aka savedValues) or to use values for database state
  const initialValues = savedValues.length ? savedValues : values

  // on initial render only
  useEffect(() => {
    let editorsList = []
    if (initialValues.length) {
      initialValues.forEach(() => {
        const list = createEditors(timePeriod)
        editorsList = [...editorsList, ...list]
      })
    } else {
      const list = createEditors(timePeriod)
      editorsList = [...editorsList, ...list]
    }

    action({
      type: 'SET_INITIALS', payload: {
        period: initialValues.length === 0 ? 1 : initialValues.length,
        values: initialValues,
        editors: editorsList
      }
    })
  }, [])

  // on periods number change
  useEffect(() => {
    setContentValues(timePeriod, period, content, initialValues, editors, dispatch, action, category, id)
  }, [period])

  return [{ content, values, period, savedValues, editors }, action]
}

export { setData, createEditors }