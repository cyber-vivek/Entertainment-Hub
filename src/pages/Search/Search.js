import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from '@material-ui/core';
import React from 'react'
import { useState,useEffect } from 'react'
import SearchIcon from "@material-ui/icons/Search"
import axios from 'axios';
import { Singlecontent } from '../../Singlecontent/Singlecontent';
import { Custompagination } from '../../components/Pagination/Custompagination';

export const Search = () => {

    const [type, settype] = useState(0);
    const [page, setpage] = useState(1);
    const [searchText, setsearchText] = useState("");
    const [content, setcontent] = useState();
    const [numOfPages, setnumOfPages] = useState()

    const darkTheme = createTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#fff",
            },
        },
    })
    const fetchSearch = async ()=>{
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/search/${type?"tv":"movie"}?api_key=${process.env.REACT_APP_API_KEY }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        );
        setcontent(data.results);
        setnumOfPages(data.total_pages);
    }
    useEffect(() => {
        window.scroll(0,0);
        fetchSearch();
    }, [type,page])

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{ display: "flex", margin: "15px 0" }}>
                    <TextField
                        style={{ flex: 1 }}
                        className="searchBox"
                        label="Search"
                        variant="filled"
                        onChange = {(e)=>setsearchText(e.target.value)}
                    />
                    <Button variant="contained" style={{ marginleft: 10 }} onClick = {fetchSearch}>
                        <SearchIcon />
                    </Button>
                </div>
                <Tabs value={type} indicatorColor="primary" textColor="primary"
                    onChange={
                        (e, newval) => {
                            settype(newval);
                            setpage(1);

                        }
                    }
                    style={{ paddingBottom: 5 }}
                >

                    <Tab style={{ width: "50%" }} label="Search Movies" />
                    <Tab style={{ width: "50%" }} label="Search TV Series" />
                </Tabs>


            </ThemeProvider>

            <div className="trending">
                {
                    content && content.map((e) =>
                    <Singlecontent key = {e.id} 
                    id = {e.id} 
                    poster = {e.poster_path} 
                    title = {e.title||e.name} 
                    date = {e.first_air_date || e.release_date} 
                    media_type = {type?"tv":"movie"} 
                    vote_average = {e.vote_average}/>)
                }
                {searchText&&
                !content&&
                (type?<h2>No Series Found</h2>:<h2>No Movie Found</h2>)
                }
            </div>
            { numOfPages>1&&(
            <Custompagination setpage = {setpage} />)}
        </div>
    )
}
