import { Badge } from '@material-ui/core';
import React from 'react'
import { img_300, unavailable } from '../config/config'
import './Singlecontent.css';
import { useHistory } from 'react-router-dom';

export const Singlecontent = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average,
}) => {
    const history = useHistory();
    const handleViewContent = async () => {
        history.push(`/detail/${media_type}/${id}`)
    }
    return (
        <div className = "media" onClick={handleViewContent}>
            <Badge badgeContent={vote_average} color={vote_average>6?'primary':'secondary'}/>
            <img className = "poster"
            src={poster? `${img_300}/${poster}` : unavailable} alt={title}  />
            <b className="title">{title}</b>
            <span className = "subtitle">
                {media_type==='tv'? "TV Series":"Movie"}
            <span className="subtitle">{date}
            </span>
            </span>

        </div>
    )
}
