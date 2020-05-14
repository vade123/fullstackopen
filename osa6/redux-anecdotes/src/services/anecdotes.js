import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (content) => {
  const obj = { content, votes: 0 }
  const res = await axios.post(baseUrl, obj)
  return res.data
}

const vote = async (id) => {
  const obj = await axios.get(`${baseUrl}/${id}`)
  const res = await axios.put(`${baseUrl}/${id}`, { ...obj.data, votes: obj.data.votes + 1 })
  return res.data
}

export default { getAll, create, vote }