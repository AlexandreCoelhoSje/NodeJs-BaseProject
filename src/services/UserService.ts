import { UserRepository } from "../repositories/UserRepository";
import { hash } from "bcryptjs"

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password?: string;
}
export class UserService {

    async create({ name, email, admin = false, password }: IUserRequest) {

        const userRepository = new UserRepository();

        if (!email)
            throw new Error("Email incorrect");

        const userAlreadyExists = await userRepository.findOne(email);

        if (userAlreadyExists)
            throw new Error("User already exists");

        const passwordHash = await hash(password, 8);

        const user = await userRepository.create({
            name,
            email,
            admin,
            password: passwordHash
        });

        return user;
    }

    async list() {

        const userRepository = new UserRepository();

        const users = await userRepository.find();

        return users;
    }
}