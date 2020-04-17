import { useState, useEffect } from 'react'
import { createEditor } from 'slate'
import { withReact } from 'slate-react'
import { chunk } from './index'

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

const setData = timePeriod => {
  const [period, setPeriod] = useState(1)
  const [content, setContent] = useState({})
  const [values, setValues] = useState([])

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

    setContent(contents)
    setValues(chunckedEditorValuesList)
  }

  useEffect(() => {
    setContentValues()
  }, [period])

  return [{ content, values, period }, setPeriod, setValues];
}

export { setData }