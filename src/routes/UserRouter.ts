import { Router } from "express";
import { param, body } from "express-validator"
import UserController from "../controllers/UserController"
import ensureValidation from "../middlewares/ensureValidation"
import ensureAuthenticated from "../middlewares/ensureAuthenticated"

export default function (router: Router) {

    const userController = new UserController();

    router.get("/user", ensureAuthenticated, userController.list);

    router.get("/user/:id", ensureAuthenticated, userController.findOne);

    router.post("/user",
        ensureAuthenticated,
        body("name").notEmpty().trim(),
        body("email").isEmail().normalizeEmail(),
        body("password").isLength({ min: 5 }),
        body("admin").toBoolean(),
        ensureValidation,
        userController.create
    );

    router.put("/user/:id",
        ensureAuthenticated,
        body("name").notEmpty().trim(),
        body("email").isEmail().normalizeEmail(),
        body("admin").toBoolean(),
        ensureValidation,
        userController.update
    );

    router.delete("/user/:id", ensureAuthenticated, userController.delete);
}