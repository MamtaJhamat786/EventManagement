import React from "react";
import { Typography, Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from "react-router-dom";
import { useGetAllEvents } from "../apis/useGetAllEvents";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useAppSelector} from "../store";


const Events: React.FC=()=>{
    const  events = useGetAllEvents()
    const search= useAppSelector((s)=> s.active.searchValue)
    const mobileView = useMediaQuery('(max-width:600px)');
    const filteredEvents = events.filter(
        (event) => event.title.toLowerCase().includes((search ?? '').toLowerCase())
    );

    return(
        <Box display='flex' gap='10px' width='inherit' flexDirection='column' sx={{marginTop: '15px', backgroundColor: 'white', padding: '10px'}}>
            <Typography variant="h6" fontWeight='700' display='flex'>Muusikasündmused</Typography>
            <Box display='flex' gap='10px' flexWrap='wrap' flexDirection={mobileView ? 'column': 'row'} sx={{overflowX: 'scroll'}} >
                {filteredEvents.map((event)=>{
                    return(
                        <Link to={`/events/${event.id}`}  key={event.id} style={{textDecoration: 'none'}}>
                            <Card
                                sx={{
                                    width:  mobileView ? '100%': '220px',
                                    height: '99%',
                                    display: mobileView ? 'flex': '',
                                    }}
                                key={event.id}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="140"
                                    sx={{
                                        height: mobileView ?  'auto' : '99',
                                        width:mobileView ? '100px': '100%'
                                        }}
                                    src={`https://api.intra.piletilevi.ee${event.image}`}
                                />
                                <CardContent>
                                    <Box display='flex' flexDirection={ mobileView ? 'column-reverse': 'column'} >
                                        <Typography gutterBottom fontSize='16px'>
                                            {new Date(event?.date).toLocaleString('default', { weekday: 'short' })} {new Date(event?.date)?.getDate()}.{new Date(event?.date).toLocaleString('default', { month: 'long' })}
                                        </Typography>
                                        <Typography  fontSize='20px' fontWeight='700px'>
                                            {event?.title ?? ''}
                                        </Typography>
                                    </Box>
                                    {mobileView && (
                                        <Typography fontSize='16px' fontWeight='700px'>
                                        {event?.location ?? ''}
                                    </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </Link>
                    )
                })}
            </Box>
        </Box>

    )
}
export default Events;