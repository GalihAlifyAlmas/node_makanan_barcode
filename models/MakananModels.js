import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Makanan = db.define(
	"makanans",
	{
		nama_makanan: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		kode_makanan: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		harga_makanan: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		kategori_makanan: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		gambar_makanan: {
			type: DataTypes.STRING,
		},
		url: {
			type: DataTypes.STRING,
		},
	},
	{
		freezeTableName: true,
	}
);

export default Makanan;
