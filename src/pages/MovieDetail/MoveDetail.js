import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/";
import { getContentData, getContentVideo } from "../../services/dataService";
import './MovieDetail.css'

const MoveDetail = () => {
  const { content, id } = useParams();
  const [videoUrl, setvideoUrl] = useState('');
  console.log(content, id);
  useEffect(async () => {
    const res = await getContentData(content, id);
    const video = await getContentVideo(content, id);
    const vidId = video?.data?.results?.[0]?.key;
    if (vidId) {
        const url = `https://www.youtube.com/embed/${vidId}?rel=0&autoplay=1`
        setvideoUrl(url)
    }
  }, [content, id]);
  return (
    <div className="video-container-wrapper">
    <div className="video-container">
    {videoUrl &&
      <iframe
        width="560"
        height="315"
        src={videoUrl}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen="allowfullscreen"
        // mozallowfullscreen="mozallowfullscreen" 
        // msallowfullscreen="msallowfullscreen" 
        // oallowfullscreen="oallowfullscreen" 
        // webkitallowfullscreen="webkitallowfullscreen"
      ></iframe>

    }
    </div>
    </div>
  );
};

export default MoveDetail;
