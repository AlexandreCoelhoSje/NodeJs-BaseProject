import { Router } from "express";
import AuthenticateUserController from "../controllers/AuthenticateUserController"

export default function(router: Router) {

    const authenticateUserController = new AuthenticateUserController();

    router.post("/login", authenticateUserController.authenticate);
}