import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Singlecontent } from '../../Singlecontent/Singlecontent';
import { Custompagination } from '../../components/Pagination/Custompagination';
import { Genres } from '../../components/Genres';
import useGenres from '../../hooks/useGenres';
import { getMoviesList } from '../../services/dataService';

export const Movies = () => {
    const [page, setpage] = useState(1);
    const [content, setcontent] = useState([]);
    const [numOfPages, setnumOfPages] = useState();
    const [selectedGenres, setselectedGenres] = useState([]);
    const [genres, setgenres] = useState([]);
    const genreforurl = useGenres(selectedGenres);

    const fetchmovies = async () => {
        const { data } = await getMoviesList(page,genreforurl)
        setcontent(data.results);
        setnumOfPages(data.total_pages);
    }

    useEffect(() => {
        fetchmovies();
    }, [page,genreforurl])

    return (
        <div>
            <span className="pagetitle">Movies</span>
            <Genres
                type='movie'
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
                            media_type="movie"
                            vote_average={e.vote_average} />)
                }
            </div>
            {numOfPages > 1 && (
                <Custompagination setpage={setpage} numofpages={numOfPages} />)}
        </div>
    )
}
