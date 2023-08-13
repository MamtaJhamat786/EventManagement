import { useQuery } from 'react-query';
import {useEffect, useMemo, useState} from 'react';
import {allShipments, Shipment} from "./getShipments";

export const useGetShipments = (): Shipment[] => {
    const { data } = useQuery(
        ['allShipment'],
        allShipments,
    );
    const sortedData= data?.sort((a, b) => a.name.localeCompare(b.name));
    return useMemo(() => sortedData ?? [], [sortedData]);
};

export interface FilterShipments{
    filteredShipments: Shipment[] | undefined;
    setFilteredShipments:  React.Dispatch<React.SetStateAction<Shipment[] | undefined>>
}
export const useFilterShipments=(): FilterShipments =>{
    const shipmentData = useGetShipments();
    const [filteredShipments, setFilteredShipments] = useState<Shipment[]>();
    useEffect(()=> {
        if(filteredShipments === undefined || filteredShipments.length===0 ){
            setFilteredShipments(shipmentData)
        }
    },[filteredShipments, shipmentData])
    return {
        filteredShipments,
        setFilteredShipments
};
}
