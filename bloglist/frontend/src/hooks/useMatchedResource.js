import { useMatch } from 'react-router-dom'

export default (resources, url) => {
  const keyIndex = url.indexOf(':') + 1
  const key = url.slice(keyIndex)

  const match = useMatch(url)

  return match && resources
    ? resources.find(r => r[key] === match.params[key])
    : null
}
