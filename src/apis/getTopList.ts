import axios from "axios";

export const topList = axios.create();
export interface TopList {
    id: number;
    title: string;
    image: string;
    date: string;
    location: string;
    time?: string;
}


export const allTopLists = async (): Promise<TopList[]> => {
    try {
        return await axios.get(
            'https://api.intra.piletilevi.ee/v1/events/top'
        ).then((res)=> res.data);
    } catch (error) {
        throw new Error('Error fetching top events list');
    }
}
