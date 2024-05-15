import { URL } from "../http/URL"

export const searchMovies = async ({ search }) => {
    if (search === '') return null

    try {
        const response = await fetch(URL(search))
        const json = await response.json()

        const movies = json.Search
        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            type: movie.Type,
            image: movie.Poster
        }))
    } catch (e) {
        throw new Error('Error searching movies')
    }


}