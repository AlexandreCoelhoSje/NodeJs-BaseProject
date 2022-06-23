import { Router } from "express";

import AuthenticateUserRouter from "./AuthenticateUserRouter"
import UserRouter from "./UserRouter";

const router = Router();

AuthenticateUserRouter(router);
UserRouter(router);

export { router }