import { useQuery } from 'react-query';
import { useMemo, useState,useEffect } from 'react';

import {allEvents} from "./getAllEvents";
import { Events } from "./getAllEvents";
export const useGetAllEvents = (): Events[] => {
    const { data } = useQuery(
        ['events'],
        allEvents,
    );
    return useMemo(() => data ?? [], [data]);
};

export interface FilteredEvents{
    filteredEvents: Events[] | undefined;
    setFilteredEvents:  React.Dispatch<React.SetStateAction<Events[] | undefined>>
}
export const useFilterShipments = (): FilteredEvents =>{
    const events = useGetAllEvents();
    const [filteredEvents, setFilteredEvents] = useState<Events[]>();
    useEffect(()=> {
        if(filteredEvents === undefined || filteredEvents.length===0 ){
            setFilteredEvents(events)
        }
    },[filteredEvents, events])
    return {
        filteredEvents,
        setFilteredEvents
    };
}