import React from 'react'
import Pagination from '@material-ui/lab/Pagination'
import { createTheme, ThemeProvider } from '@material-ui/core'


const DarkTheme = createTheme({
    palette:{
        type:'dark',
    }
})
// const DarkTheme = createTheme({
//     palette: {
//         primary: {
//           main: purple[500],
//         },
//         secondary: {
//           main: green[500],
//         },
//       },
// })

export const Custompagination = ({setpage,numofpages = 10}) => {
    const handlePageChange = (page)=>{
        setpage(page);
        window.scroll(0,0);
    }

    return (
        <div 
        style = {{
            width:"100%",
            display:"flex",
            justifyContent:"center",
            marginTop:30,
        }}
        >

            <ThemeProvider theme = {DarkTheme}>

            <Pagination hidePrevButton hideNextButton count = {numofpages} color = "primary" onChange = {(e)=>handlePageChange(e.target.textContent)}/>
            </ThemeProvider>
        </div>
    )
}
