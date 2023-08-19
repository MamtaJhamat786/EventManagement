import React from "react";
import { Typography, Box } from "@mui/material";
import Card from '@mui/material/Card';
import useMediaQuery from '@mui/material/useMediaQuery';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {useGetTopList} from "../apis/useGetTopList";
import {
    Link,
} from "react-router-dom";


const TopList: React.FC=()=>{
    const  topList = useGetTopList()
    const mobileView = useMediaQuery('(max-width:600px)');

    return(
        <Box display='flex' gap='10px' flexDirection='column'
             sx={{marginTop: '30px', backgroundColor: 'white', padding: '10px'
        }}>
            <Typography variant="h6" fontWeight='700' display='flex'>Müügi TOP</Typography>
            <Box display='flex' gap='10px' flexDirection='row' sx={{overflowY: 'scroll'}} >
                {topList.map((topPilet)=>{
                    return(
                        <Link to={`/events/${topPilet.id}`}  key={topPilet.id} style={{textDecoration: 'none'}}>
                            <Card  sx={{ width: mobileView ? '160px':'266px', height: '99%' }} key={topPilet.id}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="140"
                                    src={`https://api.intra.piletilevi.ee${topPilet.image}`}
                                />
                                <CardContent>
                                    <Typography gutterBottom fontSize='16px'>
                                        {new Date(topPilet?.date).toLocaleString('default', { weekday: 'short' })} {new Date(topPilet?.date)?.getDate()}.{new Date(topPilet?.date).toLocaleString('default', { month: 'long' })}
                                    </Typography>
                                    <Typography gutterBottom fontSize='20px' fontWeight='700px'>
                                        {topPilet?.title ?? ''}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    )
                })}
            </Box>


        </Box>

    )
}
export default TopList;