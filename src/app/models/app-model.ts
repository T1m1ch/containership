import { DataTypes } from "sequelize"
import db from "./../config/db"

const App = db.define("App", {
    userId : {
        type : DataTypes.INTEGER,
    },
    port : {
        type : DataTypes.INTEGER,
        unique : true
    },
    cpu : {
        type : DataTypes.INTEGER
    },
    ram : {
        type : DataTypes.INTEGER
    },
    disc : {
        type : DataTypes.INTEGER
    }
});

export default App;