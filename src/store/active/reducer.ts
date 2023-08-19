import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface InitialState{
    itemsInBag: number;
    searchValue: string | undefined;
}

const initialState: InitialState = {
    itemsInBag: 0,
    searchValue: ''

}

const active = createSlice({
    name: 'darkMode',
    initialState: initialState,
    reducers: {
        addItemToBag: (state, action: PayloadAction<number>) => {
            state.itemsInBag= action.payload;
        },
        setSearchValue: (state, action: PayloadAction<string | undefined>) => {
            state.searchValue= action.payload;
        },
    },
});

export const { addItemToBag, setSearchValue } = active.actions;

export default active.reducer;
