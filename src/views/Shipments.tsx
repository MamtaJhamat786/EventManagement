import React, { useState }  from "react";
import {Box, InputAdornment, Button} from "@mui/material";
import {useFilterShipments, useGetShipments } from "../apis/useGetShipment";
import SearchIcon from '@mui/icons-material/Search';
import "../components/styleViews.css"
import { StyledTypography, StyledBox, StyledTextField } from "../components/styledComponents/styles";
import { Close } from '@mui/icons-material'
import {
    Link,
    useParams
} from "react-router-dom";

const Shipments: React.FC=()=>{
    const { id } = useParams();

    const shipmentData = useGetShipments()
    const [openSidebar, setOpenSidebar] = useState(false);
    const [searchValue, setSearchValue]= useState('')

    const {filteredShipments,setFilteredShipments } = useFilterShipments()

    const filteredListByCompanyName=()=>{
          const filteredCompanys=  shipmentData.filter(
                (item) => item.name.toLowerCase().includes((searchValue).toLowerCase())
            );
            setFilteredShipments(filteredCompanys);
    };

    const shipment = shipmentData.find((singleShipment) => {
       return String(singleShipment.id) === String(id)
    });
    const [inputValue, setInputValue] = useState<string>('');

    const findCargoBays =(input?: string) => {
        const numberStrings = input?.split(',');
        const sum = numberStrings?.reduce((accumulator, currentValue) => {
            const numericValue = Number(currentValue.trim());
            return accumulator + (isNaN(numericValue) ? 0 : numericValue);
        }, 0);

        const dividedResult = Number(sum) / 10; // Divide the sum by 10

        const roundedResult = Math.ceil(dividedResult)
        return roundedResult;
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        setInputValue((event.target.value))
        findCargoBays(event.target.value)
    }

    return(
        <StyledBox>
            <div className={openSidebar ?'mobile-view' : 'desktop-view'}>
                <Box display="flex" justifyContent="space-between">
                    <StyledTypography variant="h6"> Space X Cargo Planner </StyledTypography>
                    {openSidebar && (
                        <Close onClick={()=> setOpenSidebar(!openSidebar)} sx={{ color: 'white' }}/>
                    )}
                </Box>
                <StyledTypography sx={{ marginTop: "20px", marginBottom: '20px'}}>  SHIPMENT LIST </StyledTypography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    {filteredShipments?.map((shipment)=> {
                        return(
                            <Link to={`/shipments/${shipment.id}`}  key={shipment.id} >
                            <Button
                                variant="contained"
                                style={{
                                    background: 'linear-gradient(90deg, rgba(45, 48, 56, 0) 22.92%, #2D3038 100%)',
                                    width: '70%',
                                    wordBreak: 'break-word'
                                }}
                                 onClick={()=> {
                                     setInputValue('');
                                     setOpenSidebar(false);
                                 }}
                            >
                                {shipment.name}
                            </Button>
                        </Link>)
                    }
                )}
                </Box>
            </div>
            <Box className={openSidebar? "desktop-view" : 'content-view'} sx={{ width: "100%" }}>
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                    <StyledTextField
                        InputLabelProps={{
                            shrink: false,
                            style: { color: 'black', marginLeft: '30px', display: searchValue!=='' ? 'none' : '' },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        size="small"
                        onChange={(event)=>{
                            setSearchValue(event.target.value)
                            filteredListByCompanyName()
                        }}
                        label="Search"
                        variant="outlined"
                    />
                    <div className="hamburger" onClick={()=> setOpenSidebar(true)}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </Box>
                <Box sx={{
                    height: '100%',
                    background: 'linear-gradient(124.01deg, #2D3038 0%, rgba(45, 48, 56, 0) 100%)',
                    borderRadius: '5px',
                    padding: "20px",
                    marginTop: '20px'
                }}>
                    <Box display='flex' flexDirection='column' gap='10px'>
                        <StyledTypography variant="h3">{shipment?.name ?? 'Amazon.com'}</StyledTypography>

                        <StyledTypography sx={{color: "#979797", wordBreak: 'break-word'}}>{shipment?.email ?? 'contact@amazon.com'}</StyledTypography>
                        <StyledTextField
                            fullWidth
                            variant="outlined"
                            value={inputValue !== '' ? inputValue : shipment?.boxes}
                            onChange={handleInputChange}
                        />
                        <StyledTypography variant="h5" sx={{ color: "#979797"}} >Number of required crago bays</StyledTypography>
                        <StyledTypography variant="h3"> {findCargoBays(inputValue !== '' ? inputValue : shipment?.boxes) ?? findCargoBays("6.8,7.9,3.6,8.8,4.8,9.4")}</StyledTypography>
                    </Box>
                </Box>
            </Box>

        </StyledBox>


    )
}
export default Shipments;