import Journal from '../AV/Journal'


export function save(data) {
  console.log(data)
  return new Journal({
    ...data
  }).save()
}