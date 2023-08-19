import React from "react";
import TopList from "../components/TopList";
import {Box} from "@mui/material";
import Events from "../components/Events";

const Home: React.FC=()=>{
    return(
        <Box sx={{padding: '10px', backgroundColor: '#F4F4F6' }}>
            <TopList/>
            <Events/>
        </Box>

    )
}
export default Home;