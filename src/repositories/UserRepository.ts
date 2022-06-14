import { FindOneOptions, Repository } from "typeorm";
import { AppDataSource } from "../database/data-source"
import { User } from "../entities/User"
import { IUserRepository } from "../interfaces/IUserRepository";

export class UserRepository implements IUserRepository {

    userRepository: Repository<User>;

    constructor() {

        this.userRepository = AppDataSource.getRepository(User);
    }

    async find(): Promise<User[]> {

        return await this.userRepository.find();
    }

    async findOne(email: string): Promise<User> {

        return await this.userRepository.findOne({ where: { email }});
    }

    async create(userData: User): Promise<User> {

        const user = this.userRepository.create(userData);

        await this.userRepository.save(user);

        return user;
    }
}