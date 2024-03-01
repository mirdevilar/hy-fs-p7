import axios from 'axios'
import { useState, useEffect } from 'react'

const useCountry = (name) => {
  const [country, setCountry] = useState({})

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/name/' + name)
      .then((r) => setCountry({ data: r.data, found: true }))
      .catch(() => setCountry({ found: false }))
  }, [name])

  return country
}

export default useCountry
