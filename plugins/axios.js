export default function ({ $axios, error }) {
  $axios.onError(e => {
    if(e.response.status === 404) {
      error({ statusCode: '404', message: 'Expert not found' })
    }
  })
}
