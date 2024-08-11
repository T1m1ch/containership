import {Router} from "express"

import AuthController from "../controllers/auth-controller"
import UserService from "../service/user-service"
import {checkJWT, Roles} from "../utils/jwt"

const router = Router();

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/user/printallusers", checkJWT(Roles.user), UserService.printAllUsers);

export default router;