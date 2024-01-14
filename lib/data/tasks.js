export const StoredTasks = [

]

export const newTaskObj = (name, xpVal) => {
  const randomNumber = Math.floor(Math.random() * 1001);
  const id = `${name.slice(0, 3)}%${randomNumber}`
  return {
    id,
    name,
    xpVal
  }
}