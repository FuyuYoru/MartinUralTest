import { DataTypes, Model } from "sequelize";
import { mariadDB } from "../mariaDB";

class Users extends Model {
	public id!: number;
	public firstname!: string;
	public lastname!: string;
	public email!: string;
	public date!: string;
}

Users.init({
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
	},
	firstname: {
		type: DataTypes.STRING(128),
		allowNull: false
	},
	lastname: {
		type: DataTypes.STRING(128),
		allowNull: false
	},
	email: {
		type: DataTypes.STRING(128),
		allowNull: false
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false
	},
},
	{
		tableName: 'users2',
		modelName: 'users2',
		sequelize: mariadDB,
	}
)

export default Users;