export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const method = getMethod(event)
  const body = await readBody(event)
  const bodyRaw = await readRawBody(event)

  console.log('query:', query)
  console.log('method:', method)
  console.log('body:', body)
  console.log('bodyRaw:', bodyRaw)

  return {
    code: 200,
    data: {
      name: 'zzt',
      age: 18,
      token: 'haha'
    }
  }
})