import Api from ".";
import { IUser } from "../types";

export const getAllUsers = async (page: number, perPage: number): Promise<{ users: IUser[]; pageInfo: { currentPage: number; totalPages: number; perPage: number } }> => {
	return await Api.get('/api/allUsers', { params: { page, perPage } });
};


export const addUser = async (params: Omit<IUser, 'id'>): Promise<number> => {
	return await Api.post('/api/addUser', params);
}

export const pageInfo = async (): Promise<number> => {
	return await Api.get('/api/tableInfo', {})
}

export const searchUsers = async (field: keyof IUser, searchTerm: string, page: number, perPage: number): Promise<{ users: IUser[]; pageInfo: { currentPage: number; totalPages: number; perPage: number } }> => {
	return await Api.get('/api/searchUsers', { params: { field, searchTerm, page, perPage } });
};