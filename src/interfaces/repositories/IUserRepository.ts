import { User } from "../../entities/User";

export interface IUserRepository {

    list: () => Promise<User[]>;

    findOne: (email: string) => Promise<User>;

    create: (userData: User) => Promise<User>;

    update: (user: User) => Promise<User>;

    delete: (user: User) => Promise<User>;
}