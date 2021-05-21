import React, { useEffect, useState } from 'react'
import axios from './axios'
const baseURL = 'https://image.tmdb.org/t/p/original'

export default function Row({ title, fetchUrl }) {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            console.log(request);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl])
    return (

        <div className='row'>
            <h2>{title}</h2>
            <div className="row__poster">
                {movies.map((movie) => (
                    <img src={`${baseURL}${movie.backdrop_path}`} alt={movie.original_title}></img>
                ))}
            </div>
        </div>
    )
}
