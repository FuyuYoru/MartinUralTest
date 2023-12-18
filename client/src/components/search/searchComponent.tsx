import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setSearchCategory, setIsSearch, disableSearch } from '../../store/reducers/userReducer';
import { IUser, SearchStatus } from '../../types';
import { RootState } from '../../store';
import store from '../../store';
import styles from './searchComponent.module.css'

export const SearchComponent = () => {
	const dispatch = useDispatch();
	const { searchField, searchTerm } = useSelector((state: RootState) => state.users)
	const handleSearch = () => {
		dispatch(setIsSearch(SearchStatus.Start));
	};
	// store.subscribe(() => console.log(store.getState()))
	return (
		<div className={styles.searchContainer}>
			<input
				type="text"
				placeholder="Введите поисковый запрос"
				value={searchTerm}
				onChange={(e) => dispatch(setSearchTerm(e.target.value))}
			/>
			<select
				value={searchField}
				onChange={(e) => dispatch(setSearchCategory(e.target.value as keyof IUser))}
			>
				<option value="date">Дата</option>
				<option value="firstname">Имя</option>
				<option value="lastname">Фамилия</option>
			</select>
			<button onClick={handleSearch}>Поиск</button>
			<span onClick={() => dispatch(disableSearch())}>
				Отмена
			</span>
		</div>
	);
};
