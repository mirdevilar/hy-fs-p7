const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => <li key={anecdote.id}><a href={'/anecdotes/' + anecdote.id}>{anecdote.content}</a></li>)}
    </ul>
  </div>
)

export default AnecdoteList
