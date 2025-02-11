import { api } from './api'

export async function authenticate() {
  const { data } = await api.post('/token', {
    username: 'admin',
    password: 'admin',
  }, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },

  })
  return data.access_token
}
