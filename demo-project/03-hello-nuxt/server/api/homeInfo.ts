export default defineEventHandler((event) => {
  const { req, res } = event.node;
  console.log('req.method:', req.method)
  console.log('req.url:', req.url)

  return {
    code: 200,
    data: {
      name: 'zzt',
      age: 18
    }
  }
})
