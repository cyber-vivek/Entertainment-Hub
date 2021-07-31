import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react';
import { Singlecontent } from '../../Singlecontent/Singlecontent';
import './Trending.css'
import { Custompagination } from '../../components/Pagination/Custompagination';


export const Trending = () => {
const [page, setpage] = useState(1);
    const [content, setcontent] = useState([]);
    const url =  "https://api.themoviedb.org/3/trending/all/day?api_key="+process.env.REACT_APP_API_KEY+`&page=${page}`;
    const fetchtrending = async ()=>{
        const {data} = await axios.get(url);
        // console.log(data);
        setcontent(data.results);
    }

useEffect(() => {
    fetchtrending();
    // eslint-disable-next-line
}, [page])

    return (
        <div>
            <span className = "pagetitle">Trending</span>
            <div className="trending">
                {
                    content && content.map((e) =>
                    <Singlecontent key = {e.id} 
                    id = {e.id} 
                    poster = {e.poster_path} 
                    title = {e.title||e.name} 
                    date = {e.first_air_date || e.release_date} 
                    media_type = {e.media_type} 
                    vote_average = {e.vote_average}/>)
                }
            </div>
            <Custompagination setpage = {setpage} />
        </div>
    )
}
