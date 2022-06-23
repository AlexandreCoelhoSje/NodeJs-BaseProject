import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export default class UserController {

    async list(request: Request, response: Response) {
        
        const userService = new UserService(request.user);

        const users = await userService.list();

        return response.json(users);
    }

    async findOne(request: Request, response: Response) {

        const userService = new UserService(request.user);

        const user = await userService.findOne(request.user.id);

        return response.json(user);
    }

    async create(request: Request, response: Response) {

        const userService = new UserService(request.user);

        const { name, email, admin, password } = request.body;

        const user = await userService.create({ name, email, admin, password });

        return response.json(user);
    }

    async update(request: Request, response: Response) {

        const userService = new UserService(request.user);

        const { id } = request.params;

        const { name, admin } = request.body;

        const user = await userService.update({ id, name, admin });

        return response.json();
    }

    async delete(request: Request, response: Response) {

        const userService = new UserService(request.user);

        const { id } = request.params;
        
        const user = await userService.delete(id);

        return response.json();
    }
}