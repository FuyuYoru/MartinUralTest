import { Header } from "../components/header/header";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, addUser, searchUsers } from '../services/users';
import { setUsers, setMaxPagesCount, setSortingProps, endSearch, disableSearch } from '../store/reducers/userReducer';
import { RootState, AppDispatch, } from '../store';
import store from "../store";
import { TablePaginationController } from "../components/tablePaginationController/TablePaginationController";
import styles from './tablePage.module.css'
import { IUserReducer, IUser, SearchStatus } from "../types";
import { usersHeaders } from "../data/TableHeaders";
import { selectSortedUsers } from "../store/selectors/userSelector";
import { SearchComponent } from "../components/search/searchComponent";

export const Table = () => {
	const dispatch = useDispatch();
	const usersSlice = useSelector((state: RootState) => state.users);
	const users = useSelector(selectSortedUsers)

	// store.subscribe(() => console.log(store.getState()))
	useEffect(() => {
		const fetchData = async () => {
			if (usersSlice.searchStatus === SearchStatus.Disabled) {
				const { users, pageInfo } = await getAllUsers(usersSlice.currentPage, usersSlice.currentPagination);
				dispatch(setUsers(users));
				dispatch(setMaxPagesCount(pageInfo.totalPages));
			} else if (usersSlice.searchStatus === SearchStatus.Start) {
				const { users, pageInfo } = await searchUsers(usersSlice.searchField, usersSlice.searchTerm, usersSlice.currentPage, usersSlice.currentPagination);
				dispatch(setUsers(users));
				dispatch(setMaxPagesCount(pageInfo.totalPages));
				dispatch(endSearch());
			}
		};

		fetchData();
	}, [dispatch, usersSlice.currentPage, usersSlice.currentPagination, usersSlice.searchStatus]);

	const handleSortChange = (column: IUserReducer['sortingColumn']) => {
		const newOrder = usersSlice.sortingColumn === column ? (usersSlice.sortOrder === 'increase' ? 'decrease' : 'increase') : 'increase';
		dispatch(setSortingProps({ column, order: newOrder }));
	};

	return (
		<>
			<Header />
			<div className={styles.pageContainer}>
				<div>
					<SearchComponent />
				</div>
				<div className={styles.tableContainer}>
					<table>
						<thead>
							<tr>
								{usersHeaders.map((value, index) => (
									<th key={index} onClick={() => handleSortChange(value.value as keyof IUser)}>
										{value.label}
										{value.value === usersSlice.sortingColumn && (
											<span>{usersSlice.sortOrder === 'increase' ? '↑' : '↓'}</span>
										)}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user.id}>
									<td>{user.id}</td>
									<td>{user.firstname}</td>
									<td>{user.lastname}</td>
									<td>{user.email}</td>
									<td>{user.date}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<TablePaginationController />
			</div>
		</>
	)
}
