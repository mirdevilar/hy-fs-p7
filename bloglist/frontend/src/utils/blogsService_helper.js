const parseAuthHeader = (token) => {
  return `Bearer ${token}`
}

export default { parseAuthHeader }