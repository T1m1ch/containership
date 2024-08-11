import {Router} from "express"

import { Roles } from "../utils/jwt";
import AppController from "../controllers/app-controller";
import { checkJWT } from "../utils/jwt"

const router = Router();

router.post("/app/create", checkJWT(Roles.user), AppController.create);

export default router;