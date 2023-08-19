import axios from "axios";

export const topList = axios.create();
export interface Events {
    id: number;
    title: string;
    image: string;
    date: string;
    location: string;
    time?: string;
}


export const allEvents = async (): Promise<Events[]> => {
    try {
        return await axios.get(
            'https://api.intra.piletilevi.ee/v1/events'
        ).then((res)=> res.data);
    } catch (error) {
        throw new Error('Error fetching all events');
    }
}
