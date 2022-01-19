import axios from 'axios';
import React from 'react'
import {useLocation, Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import {ScaleLoader} from "react-spinners"

import '../styles/filmdetailpage.scss'

function FilmDetailPage() {
    const id = useLocation();
    const [film, setFilm] = useState({});
    const [tabTitle, setTabTitle] = useState("M-Films | Film Details")

    const getFilm = () => {
        axios.get(`https://api.themoviedb.org/3/movie/${id.pathname}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&fbclid=IwAR3I44DSstLqakp4_H5O6ZxkKBs2NcZ6KybWd7yfDkj4X4TlhWhNflfwRK8`)
        .then(response => {
            setFilm(response.data)
            document.title = `M-Films | ${response.data.title}`;
            console.log(response.data)
        })
    }
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        getFilm();
    }, [])

    const renderedFilm = film? (
        <div className='mainDiv' style={film.backdrop_path ? {backgroundImage: `url(https://image.tmdb.org/t/p/original/${film.backdrop_path})`} : {backgroundColor: "yellow"}}>
            <div className='overlay'>

            </div>
            <div className='filmTitles'>
                <h1>{film.title}</h1>
            </div>
        </div>
    ) : (
        <div>
            <ScaleLoader color='yellow' />
        </div>
    )

    const renderedGenres = film.genres? (
        film.genres.map((genre, index) => {
            return (
                <li key={index}><p><strong>{genre.name}</strong></p></li>
            )
        })
    ) : (
        <div>
            <ScaleLoader color='yellow' />
        </div>
    )

    const renderedProdCompanies = film.production_companies? (
        film.production_companies.map((pCom, index) => {
            return (
                <li key={index}><p><strong>{pCom.name} ({pCom.origin_country})</strong></p></li>
            )
        })
    ) : (
        <div>
            <ScaleLoader color='yellow' />
        </div>
    )

    const renderedProdCountries = film.production_countries? (
        film.production_countries.map((pCountry, index) => {
            return (
                <li key={index}><p><strong>{pCountry.name}</strong></p></li>
            )
        })
    ) : (
        <div>
            <ScaleLoader color='yellow' />
        </div>
    )

    const renderedFilmSpecs = film? (
        <div className='filmSpecs'>
            <div className='quickFacts'>
                <p>Budget: <strong>{film.budget}$</strong></p>
                <div>
                    <p>Genres: </p>
                    <ul>
                        {
                            renderedGenres
                        }
                    </ul>
                </div>
                <p>Original language: <strong>{film.original_language}</strong></p>
                <p>Original title: <strong>{film.original_title}</strong></p>
                <p>Popularity: <strong>{film.popularity}</strong></p>
                <div>
                    <p>Production companies: </p>
                    <ul>
                        {
                            renderedProdCompanies
                        }
                    </ul>
                </div>
                <div>
                    <p>Production countries: </p>
                    <ul>
                        {
                            renderedProdCountries
                        }
                    </ul>
                </div>
                <p>Release date: <strong>{film.release_date}</strong></p>
                <p>Revenue: <strong>{film.revenue}$</strong></p>
                <p>Runtime: <strong>{film.revenue} minutes</strong></p>
                <p>Vote average: <strong>{film.vote_average}</strong></p>
                <p>Vote count: <strong>{film.vote_count}</strong></p>
            </div>
            <div className='synopsis'>
                <h2>Synopsis: </h2>
                <p>{film.overview}</p>
                <Link to='/'>
                    <button className='generalButton goBackBtn'>GO BACK</button>
                </Link>
            </div>
        </div>
    ) : (
        <div>
            <ScaleLoader color='yellow' />
        </div>
    )

    return (
        <div>
            {renderedFilm}
            {renderedFilmSpecs}
        </div>
    )
}

export default FilmDetailPage