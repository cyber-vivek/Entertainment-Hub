import React from 'react'
import { useState,useEffect } from 'react';
import useGenres from '../../hooks/useGenres';
import axios from 'axios';
import { Genres } from '../../components/Genres';
import { Singlecontent } from '../../Singlecontent/Singlecontent';
import { Custompagination } from '../../components/Pagination/Custompagination';

export const Series = () => {

    const [page, setpage] = useState(1);
    const [content, setcontent] = useState([]);
    const [numOfPages, setnumOfPages] = useState();
    const [selectedGenres, setselectedGenres] = useState([]);
    const [genres, setgenres] = useState([]);
    const genreforurl = useGenres(selectedGenres);

    const fetchmovies = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforurl}`
        )
        setcontent(data.results);
        setnumOfPages(data.total_pages);
    }

    useEffect(() => {
        fetchmovies();
    }, [page,genreforurl])
    return (
        <div>
             <span className = "pagetitle">series</span>
             <Genres
                type='tv'
                selectedGenres={selectedGenres}
                setselectedGenres={setselectedGenres}
                genres={genres}
                setgenres={setgenres}
                setpage={setpage}
            />
            <div className="trending">
                {
                    content && content.map((e) =>
                        <Singlecontent key={e.id}
                            id={e.id}
                            poster={e.poster_path}
                            title={e.title || e.name}
                            date={e.first_air_date || e.release_date}
                            media_type="tv"
                            vote_average={e.vote_average} />)
                }
            </div>
            {numOfPages > 1 && (
                <Custompagination setpage={setpage} numofpages={numOfPages} />)}
        </div>
    )
}
