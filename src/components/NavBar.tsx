import React from 'react';
import { Link } from "react-router-dom";
import {StyledTextField} from "./styledComponents/styles";
import {Box, InputAdornment, AppBar, Typography, Badge, Tabs, Tab} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import {useAppDispatch, useAppSelector} from "../store";
import {setSearchValue} from "../store/active/reducer";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from '@mui/icons-material/Menu';
export const NavBar :React.FC =()=> {
    const item= useAppSelector((s)=> s.active.itemsInBag)
    const dispatch = useAppDispatch()
    const mobileView = useMediaQuery('(max-width:600px)');
    const [value, setValue] = React.useState(4);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    return(
        <AppBar position="static" sx={{ backgroundColor: 'white', padding: '10px' }} >
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: 'space-between',
                height: "100%",
                gap: mobileView ? '5px' : '20px',
                alignItems: 'center'

            }}>
                <Link  to="/" style={{textDecoration: 'none'}} >
                    <Typography fontWeight='700' sx={{color: 'red',  fontSize: '24px', fontFamily: 'Segoe UI'}}>Piletilevi</Typography>
                </Link>
                <StyledTextField
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon sx={{color: 'white'}} />
                            </InputAdornment>
                        ),
                    }}
                    onChange={(event)=> dispatch(setSearchValue(event.target.value))}
                    size="small"
                    label={mobileView ? 'Search' : 'Search for events, performeres, venues'}
                    variant="outlined"
                />
                <Box gap='10px' display="flex">
                    <Badge color="success" variant="dot"
                           anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                    }}>
                        <PersonRoundedIcon sx={{color: 'black'}} />
                    </Badge>
                    {mobileView ? (
                        <MenuIcon sx={{color: 'black'}} />
                        ):(
                        <>
                            <Typography sx={{color: 'black'}}>Mamta</Typography>
                            <FavoriteRoundedIcon sx={{color: 'red'}} />
                            <Badge color="primary" badgeContent={item}>
                                <AddShoppingCartRoundedIcon sx={{color: 'black'}}/>
                            </Badge>
                        </>
                        )}
                </Box>
            </Box>
            <Box sx={{display: 'flex', overflowY: 'scroll'}}>
                <Box>
                    <Tabs value={value}
                          onChange={handleChange}
                          aria-label="basic tabs example"
                          sx={{
                              ".Mui-selected": {
                                  color: 'black !important',
                              },
                          }}
                          TabIndicatorProps={{ style: { background: "red" } }}
                    >
                        <Tab label="Kõik" {...a11yProps(0)} />
                        <Tab label="Täna" {...a11yProps(1)} />
                        <Tab label="Nädalavahetusel" {...a11yProps(2)} />
                        <Tab label="Uued" {...a11yProps(3)} />
                        <Link style={{color: 'black'}} to="/events">
                            <Tab  label="Muusika" {...a11yProps(4)} />
                        </Link>
                        <Tab label="Kogupere" {...a11yProps(5)} />
                        <Tab label="Sport" {...a11yProps(6)} />
                        <Tab label="Festival" {...a11yProps(7)} />
                    </Tabs>
                </Box>
            </Box>

        </AppBar>
    )

}
export default NavBar;