export interface IUser {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	date: string;
}

export interface ISelect {
	defaultOption: string | number;
	options: Array<Record<string, any> | string | number>;
	onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
}

export interface IUserReducer {
	users: IUser[];
	currentPagination: number;
	currentPage: number;
	pages: Array<number>;
	sortingColumn: keyof IUser;
	sortOrder: 'increase' | 'decrease';
	searchStatus: SearchStatus;
	searchField: keyof IUser;
	searchTerm: string;
}

export enum SearchStatus {
  Start = 'start',
  End = 'end',
  Disabled = 'disabled',
}