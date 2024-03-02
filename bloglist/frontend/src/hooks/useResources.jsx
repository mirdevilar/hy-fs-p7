import axios from 'axios'
import { useState, useEffect } from 'react'

const baseUrl = 'http://localhost:3003/api/users'

const useResources = () => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    const res = await axios.get(baseUrl)
    setResources(res.data)
    return res.data
  }

  useEffect(() => {
    getAll()
  }, [])

  const service = {
    getAll,
  }

  return [
    resources,
    service,
  ]
}

export default useResources

