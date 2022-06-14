import { FindOneOptions } from "typeorm";
import { User } from "../entities/User";

export interface IUserRepository {

    find: () => Promise<User[]>;

    findOne: (email: string ) => Promise<User>;

    create: (userData: User) => Promise<User>;
}