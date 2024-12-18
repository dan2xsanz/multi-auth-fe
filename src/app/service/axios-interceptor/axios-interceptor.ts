import axios from 'axios'

// REQUEST INTERCEPTOR
axios.interceptors.request.use(
  function (request) {
    // Only add the Bearer token if 'logInStore' exists in localStorage
    const storedState = localStorage.getItem('logInStore')

    if (storedState && !request.url?.includes('auth')) {
      // Parse the stored state and extract the token
      const parsedState = JSON.parse(storedState)
      if (parsedState.token) {
        request.headers['Authorization'] = `Bearer ${parsedState.token}`
      }
    }

    return request
  },
  function (error) {
    return Promise.reject(error)
  },
)

// RESPONSE INTERCEPTOR
axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  },
)
