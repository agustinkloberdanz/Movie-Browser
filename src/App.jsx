import './App.css'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import { Movies } from './components/Movies'
import { useEffect, useState } from 'react'

function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  useEffect(()=> {
    console.log('new movies recived')
  }, [getMovies])

  return (
    <>
      <header className='page'>
        <h1>Movie Browser App</h1>

        <form className='form' onSubmit={handleSubmit}>
          <input style={{
            border: '1px solid transparent',
            borderColor: error ? 'red' : 'transparent'
          }} onChange={handleChange} value={search} name='query' type="text" placeholder='Avengers, Star Wars, The Matrix...' />
          <span>Order by name</span><input type="checkbox" onChange={handleSort} checked={sort} />
          <button type='submmit'>Search</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {loading ? <p>Cargando...</p> : <Movies movies={movies}></Movies>}
      </main>


    </>
  )
}

export default App
