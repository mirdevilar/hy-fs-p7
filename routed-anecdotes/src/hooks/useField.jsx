import { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const props = { value, type, onChange }

  return {
    props,
    reset,
  }
}

export default useField
