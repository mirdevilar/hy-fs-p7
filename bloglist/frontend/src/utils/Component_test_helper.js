import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

let h = {}

let queries

h.setup = (q) => {
  queries = q
}

const getQueryForElement = (element) => {
  if (!queries[element]) {
    throw new Error(`No query set up for element ${element}`)
  }

  const query = queries[element]
  const by = query[0]
  const args = query.slice(1)

  if (!by) {
    throw new Error('Set up query must have a matcher type')
  }

  if (!args[0] && by !== 'testid') {
    throw new Error('This matcher type queries must have a matcher')
  }

  return { by, args }
}

h.get = (element) => {
  const { by, args } = getQueryForElement(element)

  if (by === 'text') {
    return screen.getByText(...args)
  }
  if (by === 'role') {
    return screen.getByRole(...args)
  }
  if (by === 'testid') {
    return screen.getByTestId(...(args.length ? args : [element]))
  }
  if (by === 'label') {
    return screen.getByLabelText(...args)
  }

  throw new Error('Invalid matcher type')
}

h.query = (element) => {
  const { by, args } = getQueryForElement(element)

  if (by === 'text') {
    return screen.queryByText(...args)
  }
  if (by === 'role') {
    return screen.queryByRole(...args)
  }
  if (by === 'testid') {
    return screen.queryByTestId(...(args.length ? args : [element]))
  }
  if (by === 'label') {
    return screen.queryByLabelText(...args)
  }

  throw new Error('query not defined for this element')
}

export default h