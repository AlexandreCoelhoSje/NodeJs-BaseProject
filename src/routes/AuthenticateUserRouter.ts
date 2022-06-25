import { Router } from "express";
import { body } from "express-validator"
import AuthenticateUserController from "../controllers/AuthenticateUserController"
import ensureValidation from "../middlewares/ensureValidation"

export default function (router: Router) {

    const authenticateUserController = new AuthenticateUserController();

    router.post("/login",
        body('email').isEmail(),
        body('password').isLength({ min: 5 }),
        ensureValidation,
        authenticateUserController.authenticate
    );
}