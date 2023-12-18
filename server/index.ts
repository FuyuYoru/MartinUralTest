import express from 'express';
import { mariadDB } from './src/database/mariaDB';
import userService, { IUser } from './src/database/services/userServices'
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
const users = new userService()

app.use(cors());

app.get('/api/allUsers', async (req, res) => {
	try {
		const page = parseInt(req.query.page as string, 10) || 1;
		const perPage = parseInt(req.query.perPage as string, 10) || 10;

		const usersData = await users.getAllWithPagination(page, perPage);
		const totalUsersCount = await users.getTotalUsersCount();
		const totalPages = Math.ceil(totalUsersCount / perPage);
		res.json({
			users: usersData,
			pageInfo: {
				currentPage: page,
				totalPages: totalPages,
				perPage: perPage,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error });
	}
});

app.get('/api/searchUsers', async (req, res) => {
	try {
		const page = parseInt(req.query.page as string, 10) || 1;
		const perPage = parseInt(req.query.perPage as string, 10) || 10;
		const { field, searchTerm } = req.query;

		// Проверка наличия необходимых параметров
		if (!field || !searchTerm) {
			return res.status(400).json({ error: 'Missing required parameters: field and searchTerm' });
		}

		const usersData = await users.searchUsers(field as keyof IUser, searchTerm as string, page, perPage);
		const totalUsersCount = await users.getTotalUsersCount();
		const totalPages = Math.ceil(totalUsersCount / perPage);

		res.json({
			users: usersData,
			pageInfo: {
				currentPage: page,
				totalPages: totalPages,
				perPage: perPage,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});



app.post('/api/addUser', async (req, res) => {
	try {
		const { firstname, lastname, email, date } = req.body;
		const newUser = await users.addUser({ firstname, lastname, email, date });
		res.json(newUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

async function start() {
	try {
		await mariadDB.authenticate();
		console.log('Успешное соединение');

		await mariadDB.sync();

		app.listen(PORT, () => {
			console.log('Server is running on http://localhost:' + PORT);
		});
	} catch (error) {
		console.error('Невозможно соединение с БД:', error);
		process.exit(1);
	}
}

start();
