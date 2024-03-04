import axios from 'axios'

import helper from '../utils/blogsService_helper'

const baseUrl = 'http://localhost:3003/api/blogs/'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (blog, token) => {
  const headers = { Authorization: helper.parseAuthHeader(token) }
  const res = await axios.post(baseUrl, blog, { headers })
  return res.data
}

const update = async (blog, token) => {
  const headers = { Authorization: helper.parseAuthHeader(token) }
  const res = await axios.put(baseUrl + blog.id, blog, { headers })
  return res.data
}

const remove = async (id, token) => {
  const headers = { Authorization: helper.parseAuthHeader(token) }
  const res = await axios.delete(baseUrl + id, { headers })
  return res.data
}

const createComment = async (id, comment) => {
  const res = await axios.post(baseUrl + id + '/comments', { comment })
  return res.data
}

export default { getAll, create, update, remove, createComment }
