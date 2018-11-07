import Journal from '../AV/Journal'
import AV from 'leancloud-storage'

const journalQuery = new AV.Query('Journal')


export function save(data) {
  console.log(data)
  return new Journal({
    ...data
  }).save()
}

export function fetch({ user, date }) {
  journalQuery.equalTo('owner', user)
  journalQuery.equalTo('date', date)
  return journalQuery.find()
}

export function fetchAll({ user }) {
  journalQuery.equalTo('owner', user)
  return journalQuery.find()
}