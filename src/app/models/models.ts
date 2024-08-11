import App from "./app-model"
import User from "./user-model"

User.hasMany(App);
App.belongsTo(User);