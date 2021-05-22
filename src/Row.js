import React, { useEffect, useState } from 'react'
import axios from './axios'
import './Row.css'
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
            <div className="row__posters">
                {movies.map((movie) => (
                    <img key={movie.id} className="row__poster" src={`${baseURL}${movie.poster_path}`} alt={movie.original_title}></img>
                ))}
            </div>
        </div>
    )
}
