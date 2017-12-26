import request from '../utils/request'

export function fetch({ page = 1 }) {
  return request(`/api/users?_page=${page}&limit=5`)
}