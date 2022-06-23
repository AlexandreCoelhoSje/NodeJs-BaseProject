import { FindOneOptions, Repository } from "typeorm";
import { AppDataSource } from "../database/data-source"
import { User } from "../entities/User"
import { IUserRepository } from "../interfaces/repositories/IUserRepository";

export class UserRepository implements IUserRepository {

    userRepository: Repository<User>;

    constructor() {

        this.userRepository = AppDataSource.getRepository(User);
    }
    
    async list(): Promise<User[]> {

        return await this.userRepository.find();
    }

    async findOne(id: string): Promise<User> {
        
        return await this.userRepository.findOne({ where: { id }});
    }

    async findByEmail(email: string): Promise<User> {
        
        return await this.userRepository.findOne({ where: { email }});
    }

    async create(userData: User): Promise<User> {

        const user = this.userRepository.create(userData);

        return await this.userRepository.save(user);
    }

    async update(user: User): Promise<User> {

        return await this.userRepository.save(user);
    }

    async delete(user: User): Promise<User> {

        return this.userRepository.remove(user);
    }
}