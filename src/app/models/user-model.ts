import {DataTypes } from "sequelize";

import db from "../config/db"
import App from "./app-model"

const User = db.define("User", {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    }
});

User.hasMany(App);
App.belongsTo(User);

export default User;
