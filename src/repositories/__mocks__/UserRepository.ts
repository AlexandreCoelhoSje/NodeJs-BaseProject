import { hash } from "bcryptjs"
import { User } from "../../entities/User"
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";

export class UserRepository implements IUserRepository {

    users: User[];

    constructor() {

        this.users = new Array();

        //Create new user for test
        const user = new User();
        user.name = "Test User";
        user.email = "teste@test.com";
        user.admin = false;
        user.password = "$2a$08$p1dKB2/hYjjd3qs.X95peOdkd0GAkac4RGrEqxs1YsiPfn7GvltbW";       

        this.users.push(user);
    }

    async list(): Promise<User[]> {

        return new Promise((resolve, reject) => resolve(this.users));
    }

    async findOne(email: string): Promise<User> {

        return new Promise((resolve, reject) => 
            
            resolve(this.users.find((item) =>  item.email == email))
        );
    }

    async create(userData: User): Promise<User> {

        const user =  new User();

        user.name = userData.name;
        user.email = userData.email;
        user.password = userData.password;
        user.admin = userData.admin;

        this.users.push(user);

        return new Promise((resolve, reject) => resolve(user));
    }

    async update(user: User): Promise<User> {

        const userToUpdate = this.users.find((currentUser: User) => user.id == currentUser.id );

        userToUpdate.name = user.name;

        return new Promise((resolve, rejects) => resolve(userToUpdate));
    }

    async delete(user: User): Promise<User> {

        const userFound = this.users.find((current: User) => current.id == user.id);

        this.users = this.users.filter((currentUser: User) => currentUser.id != user.id);
       
        return new Promise((resolve, reject) => resolve(userFound));
    }
}