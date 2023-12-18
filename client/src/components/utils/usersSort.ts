import { IUser, IUserReducer } from "../../types";

export const sortUsers = (users: IUser[], sortingColumn: keyof IUser, sortOrder: IUserReducer['sortOrder']) => {
	return users.slice().sort((a, b) => {
		const valueA = a[sortingColumn];
		const valueB = b[sortingColumn];

		if (sortOrder === 'increase') {
			return valueA < valueB ? -1 : 1;
		} else {
			return valueA > valueB ? -1 : 1;
		}
	});
};