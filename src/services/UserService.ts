import { UserRepository } from "../repositories/UserRepository";
import { hash } from "bcryptjs"
import { IAuthenticatedUser } from "../interfaces/message/IAuthenticatedUser";
import { User } from "../entities/User";

interface IUserRequest {
    id?: string;
    name: string;
    email?: string;
    admin?: boolean;
    password?: string;
}
export class UserService {

    userRepository: UserRepository;
    authenticatedUser: IAuthenticatedUser;

    constructor(authenticatedUser: IAuthenticatedUser) {

        this.authenticatedUser = authenticatedUser;
        this.userRepository = new UserRepository();
    }

    async list(): Promise<User[]> {

        return await this.userRepository.list();
    }

    async findOne(email: string): Promise<User> {

        const user = await this.userRepository.findOne(email);

        return user;
    }

    async create({ name, email, admin = false, password }: IUserRequest): Promise<User> {

        if (!email)
            throw new Error("Email incorrect");

        const userAlreadyExists = await this.userRepository.findOne(email);

        if (userAlreadyExists)
            throw new Error("User already exists");

        const passwordHash = await hash(password, 8);

        const user = await this.userRepository.create({
            name,
            email,
            admin,
            password: passwordHash
        });

        return user;
    }

    async update({ email, name, admin = false }: IUserRequest): Promise<User> {

        //check if the user exists
        const userFound = await this.userRepository.findOne(email);

        if (!userFound)
            throw new Error("user not found");

        //non-admin user can only change their own data
        if (!this.authenticatedUser.admin && this.authenticatedUser.email != email)
            throw new Error("you cannot edit this user");

        //update user data, only admins can edit "admin" flag
        userFound.name = name;
        userFound.admin = (this.authenticatedUser.admin ? admin : false);

        //save changes
        return await this.userRepository.update(userFound);
    }

    async delete(email: string): Promise<User> {

        //only admins can delete users
        if (!this.authenticatedUser.admin)
            throw new Error("You do not have permission to delete this user");

        //check if the user exists
        const userFound = await this.userRepository.findOne(email);

        if (!userFound)
            throw new Error("user not found");

        return await this.userRepository.delete(userFound);
    }
}