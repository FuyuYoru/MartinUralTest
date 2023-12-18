import { Op } from "sequelize";
import Users from "../models/users";

export interface IUser {
	id?: number;
	firstname: string;
	lastname: string;
	email: string;
	date: string;
}

interface IUserService {
	getAll(): Promise<Array<IUser>>;
	addUser(params: Omit<IUser, 'id'>): Promise<number>;
	getAllWithPagination(page: number, perPage: number): Promise<Array<IUser>>;
	getTotalUsersCount(): Promise<number>;
	searchUsers(field: keyof IUser, searchTerm: string, page: number, perPage: number): Promise<Array<IUser>>;
}

class UserService implements IUserService {
	async getAll(): Promise<Array<IUser>> {
		const data = await Users.findAll();
		return data;
	}

	async addUser(params: Omit<IUser, 'id'>): Promise<number> {
		const { id } = await Users.create(params);
		return id;
	}

	async getAllWithPagination(page: number, perPage: number): Promise<Array<IUser>> {
		try {
			const offset = (page - 1) * perPage;
			const data = await Users.findAll({
				offset: offset,
				limit: perPage,
			});
			return data;
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	}

	async getTotalUsersCount(): Promise<number> {
		const count = await Users.count();
		return count;
	}

	async searchUsers(field: keyof IUser, searchTerm: string, page: number, perPage: number): Promise<Array<IUser>> {
		try {
			const offset = (page - 1) * perPage;
			const data = await Users.findAll({
				where: {
					[field]: {
						[Op.like]: `%${searchTerm}%`, // Используем оператор LIKE для поиска по части строки
					},
				},
				offset: offset,
				limit: perPage,
			});
			return data;
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	}
}

export default UserService;