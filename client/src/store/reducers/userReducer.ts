import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserReducer, IUser, SearchStatus } from '../../types';
import { createRangeArray } from '../../components/utils/rangeArray';

const initialState: IUserReducer = {
	users: [],
	currentPagination: 5,
	currentPage: 1,
	pages: [],
	sortingColumn: 'id',
	sortOrder: 'increase',
	searchStatus: SearchStatus.Disabled,
	searchField: 'date',
	searchTerm: '',
}

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setUsers: (state, action: PayloadAction<IUser[]>) => {
			state.users = action.payload
		},
		addUser: (state, action: PayloadAction<IUser>) => {
			state.users = [...state.users, action.payload]
		},
		setPagination: (state, action: PayloadAction<number>) => {
			state.currentPagination = action.payload
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		},
		setMaxPagesCount: (state, action: PayloadAction<number>) => {
			state.pages = createRangeArray(1, action.payload, 1);
			if (state.currentPage > state.pages.length) {
				state.currentPage = 1;
			}
		},
		setSortingProps: (state, action: PayloadAction<{ column: IUserReducer['sortingColumn']; order: IUserReducer['sortOrder'] }>) => {
			state.sortingColumn = action.payload.column;
			state.sortOrder = action.payload.order;
		},
		setIsSearch: (state, action: PayloadAction<SearchStatus>) => {
			state.searchStatus = action.payload;
		},
		setSearchTerm: (state, action: PayloadAction<string>) => {
			state.searchTerm = action.payload
		},
		setSearchCategory: (state, action: PayloadAction<keyof IUser>) => {
			state.searchField = action.payload
		},
		endSearch: (state) => {
			state.searchStatus = SearchStatus.End;
		},
		disableSearch: (state) => {
			state.searchStatus = SearchStatus.Disabled;
		},
	},
});

export const { setUsers, addUser, setPagination, setPage, setMaxPagesCount, setSortingProps,
	setIsSearch, setSearchTerm, setSearchCategory, endSearch, disableSearch } = userSlice.actions;
export default userSlice.reducer;
