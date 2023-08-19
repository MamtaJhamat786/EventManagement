import { useQuery } from 'react-query';
import { useMemo } from 'react';

import {allTopLists} from "./getTopList";
import { TopList } from "./getTopList";
export const useGetTopList = (): TopList[] => {
    const { data } = useQuery(
        ['topList'],
        allTopLists,
    );
    return useMemo(() => data ?? [], [data]);
};