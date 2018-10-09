import Journal from '../AV/Journal'


export function save(data) {
  console.log(data)
  return 
  const journal = new Journal({
    ...data
  })
  console.log(journal)
  return
}