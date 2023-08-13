import axios from 'axios';

export const shipment = axios.create();
export interface Shipment {
  id: number;
  name: string;
  email: string;
  boxes: string;
}


export const allShipments = async (): Promise<Shipment[]> => {
  try {
    return await axios.get(
        'https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json'
    ).then((res)=> res.data);
  } catch (error) {
    throw new Error('Error fetching SpaceX cargo data');
  }
}

