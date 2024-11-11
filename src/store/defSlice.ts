import { createSlice } from '@reduxjs/toolkit';
export interface defState {
    movies:[]
}
const initialState: defState = {

    movies:[]

};
const defSlice = createSlice({
    name: 'defSlice',
    initialState,
    reducers: {

        addMovie: (state, action) => {
            state.movies = action.payload;
        }

    },
});
export const {
    addMovie
} = defSlice.actions;
export default defSlice.reducer;