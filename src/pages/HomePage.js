import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {ScaleLoader} from "react-spinners"
import FilmCard from '../components/FilmCard';

function HomePage() {
    const [pageIndex, setPageIndex] = useState(1);
    const [films, setFilms] = useState([]);
    const [loadMore, setLoadMore] = useState(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${pageIndex}&fbclid=IwAR3I44DSstLqakp4_H5O6ZxkKBs2NcZ6KybWd7yfDkj4X4TlhWhNflfwRK8`);

    const getFilms = () => {
        axios.get(loadMore)
            .then(response => {
            setFilms(response.data.results)
            setLoadMore(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${response.data.page + 1}&fbclid=IwAR3I44DSstLqakp4_H5O6ZxkKBs2NcZ6KybWd7yfDkj4X4TlhWhNflfwRK8`)
            console.log(response.data.results)
            })
            .catch(error => {
            console.log(error);
            });
        }

    useEffect(() => {
        document.title = "M-Films | Home"
        getFilms();
    }, [])

    const renderedFilms = films.length? (
        films.map((film, index) => {
            return ( 
                <div className='filmCardHolder' key={film.id}>
                    <FilmCard
                     image={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                     id={film.id}
                     title={film.title}
                     release={film.release_date}
                     vote={film.vote_average}
                     overview={film.overview}
                    />
                </div>
            )
        })
        ) : (
          <div>
            <ScaleLoader color='yellow' />
          </div>
          
        ) 

    return (
        <div className='pageHolder'>
            <div className='cardListHolder'>
                {renderedFilms}
            </div>
            <button className='generalButton nextPageButton' onClick={() => {
                getFilms();
                document.documentElement.scrollTop = 0;
            }}>Next Page</button>{' '}
        </div>
    )
}

export default HomePage
