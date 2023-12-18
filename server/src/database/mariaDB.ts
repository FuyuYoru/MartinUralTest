import { Sequelize } from "sequelize"

const mariadDB = new Sequelize('martinUral_test', 'root', '123456', {

	host: 'localhost',
	port: 3306,
	dialect: 'mariadb',
	define: {
		timestamps: false,
	},
	logging: false
});

export { mariadDB }