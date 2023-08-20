import React from "react";
import {Box, Typography, Button} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';

import {useParams} from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {addItemToBag} from "../store/active/reducer";
import {useAppDispatch, useAppSelector} from "../store";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useGetAllEvents} from "../apis/useGetAllEvents";

const SingleTicket: React.FC=()=>{
    const  events = useGetAllEvents()
    const { id } = useParams();
    const mobileView = useMediaQuery('(max-width:600px)');
   const item= useAppSelector((s)=> s.active.itemsInBag)
    const dispatch = useAppDispatch()

    const singleTicket=  events.filter((pilet)=> Number(pilet.id) === Number(id))[0];


    return(
        <Box
             sx={{
                 padding: '10px',
                 display: 'flex',
                 flexDirection: mobileView? 'column': 'row',
                 justifyContent: 'center',
                 gap: '20px',
                 width: mobileView? 'auto': '70%',
                 margin: 'auto',
                 marginTop:'20px'
                }}>
            <Box width={mobileView ?'100%' : '50%'}>
                <Card>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="fit-content"
                        src={`https://api.intra.piletilevi.ee${singleTicket?.image}`}
                    />

                </Card>
            </Box>
            <Box display='flex' gap='10px' flexDirection='column' alignItems={mobileView ?'center': 'start'} width={mobileView ?'100%' : '50%'}>
                    <Typography display='flex'  fontSize='20px' fontWeight='700' sx={{wordBreak: 'break-word'}}>
                        {singleTicket?.title ?? ''}
                    </Typography>
                    <Box sx={{display: 'flex', gap: '10px'}}>
                        <CalendarTodayRoundedIcon sx={{color: 'black'}} />
                        <Box display='flex' gap='10px' flexDirection={mobileView? 'column': 'row'}>
                            <Typography  fontSize='16px'>
                                {new Date(singleTicket?.date).toLocaleString('default', { weekday: 'short' })} {new Date(singleTicket?.date)?.getDate()}.{new Date(singleTicket?.date).toLocaleString('default', { month: 'long' })}
                            </Typography>
                            <Typography  fontSize='16px' >
                                {singleTicket?.time ?? ''}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', gap: '10px'}}>
                        <LocationOnIcon sx={{color: 'black'}} />
                        <Typography  fontSize='20px' sx={{lineHeight: 1.3}} >
                            {singleTicket?.location ?? ''}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', gap: '10px' }}>
                        <Button startIcon={<ShoppingCartRoundedIcon />}
                            color='success' variant='contained'
                                onClick={()=> dispatch(addItemToBag(item + 1))}
                            sx={{fontSize: '16px', minWidth: '24px'}}>
                            Buy Tickets
                        </Button>

                    </Box>
            </Box>
        </Box>


    )
}
export default SingleTicket;