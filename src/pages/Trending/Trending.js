import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Singlecontent } from "../../Singlecontent/Singlecontent";
import "./Trending.css";
import { Custompagination } from "../../components/Pagination/Custompagination";
import { getTrendingContent } from "../../services/dataService";

export const Trending = () => {
  const [page, setpage] = useState(1);
  const [content, setcontent] = useState([]);
  const fetchtrending = async () => {
    const { data } = await getTrendingContent(page);
    setcontent(data.results);
  };

  useEffect(() => {
    fetchtrending();
  }, [page]);

  return (
    <div>
      <span className="pagetitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((e) => (
            <Singlecontent
              key={e.id}
              id={e.id}
              poster={e.poster_path}
              title={e.title || e.name}
              date={e.first_air_date || e.release_date}
              media_type={e.media_type}
              vote_average={e.vote_average}
            />
          ))}
      </div>
      <Custompagination setpage={setpage} />
    </div>
  );
};
