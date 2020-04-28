import moment from 'moment'

const setPeriods = (drafts, category) => {
  const { hours, days, months, years } = drafts
  const hoursList = []
  const daysList = []
  const monthsList = []
  const yearsList = []

  const createPeriod = (list, periodList, period, format) =>
    list.forEach((l, i) => {
      const now = moment()
      periodList.push(now.add(i, period).format(format))
    })

  createPeriod(hours, hoursList, 'hours', 'LT')
  createPeriod(days, daysList, 'days', 'ddd, MMMM Do')
  createPeriod(months, monthsList, 'months', 'MMMM YYYY')
  createPeriod(years, yearsList, 'years', 'YYYY')

  return category === 'drafts'
    ? [hours, days, months, years]
    : [hoursList, daysList, monthsList, yearsList]
}

export {
  setPeriods
}