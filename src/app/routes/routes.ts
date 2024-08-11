import {Router} from "express"

import UserRoutes from "./user-routes"
import AppRoutes from "./app-routes"

export default Router().use(UserRoutes).use(AppRoutes);