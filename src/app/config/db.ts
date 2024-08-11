import { Sequelize, DataTypes} from "sequelize"

const db = new Sequelize(`postgres://${String(process.env.POSTGRES_USER)}:${String(process.env.POSTGRES_PASSWORD)}@localhost:5432/${String(process.env.POSTGRES_DB)}`);
db.authenticate().then().catch((err : Error) => {console.log(err)});

export default db;