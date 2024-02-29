const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h3>{anecdote.content} by {anecdote.author}</h3>
      <p>Has {anecdote.votes} votes</p>
      <p>For more info see <a href={anecdote.info}>here</a></p>
    </div>
  )
}

export default Anecdote
