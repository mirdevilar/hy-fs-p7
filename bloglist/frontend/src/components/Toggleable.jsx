import { useState, useImperativeHandle, forwardRef } from 'react'

const Toggleable = forwardRef((props, refs) => {
  const [display, setDisplay] = useState(false)

  const getButtonLabel = () => {
    return display ?
      props.hideLabel :
      props.showLabel
  }

  const toggleDisplay = () => {
    setDisplay(!display)
  }

  useImperativeHandle(refs, () => {
    return { toggleDisplay }
  })

  return (
    <>
      {display && props.children}
      <button onClick={() => {setDisplay(!display)}} >{getButtonLabel()}</button>
    </>
  )
})

Toggleable.displayName = 'Toggleable'

export default Toggleable