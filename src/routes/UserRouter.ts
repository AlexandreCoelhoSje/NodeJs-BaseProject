import { Router } from "express";
import UserController from "../controllers/UserController"
import ensureAuthenticated from "../middlewares/ensureAuthenticated"

export default function (router: Router) {

    const userController = new UserController();

    router.get("/user", ensureAuthenticated, userController.list);

    router.get("/user/:id", ensureAuthenticated, userController.findOne);

    router.post("/user", ensureAuthenticated, userController.create);

    router.put("/user/:id", ensureAuthenticated, userController.update);

    router.delete("/user/:id", ensureAuthenticated, userController.delete);
}