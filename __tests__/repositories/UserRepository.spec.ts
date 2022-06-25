import "reflect-metadata"
import { User } from "../../src/entities/User"

jest.mock("../../src/database/data-source")
jest.mock("../../src/database/index")

import { AppDataSource } from "../../src/database"
import { UserRepository } from "../../src/repositories/UserRepository"

describe("test UserRepository", () => {

    beforeAll(async () => {

        return await AppDataSource.initialize().then(async () => {

            //recreates the database at each test run
            await AppDataSource.dropDatabase();
            await AppDataSource.runMigrations();

            console.log("database in memory has been initialized");

        }).catch(error => console.log(error));
    });

    it("Create user", async () => {

        const userRepository = new UserRepository();

        const userData: User = {
            name: "Test Name",
            email: "test@test.com.br",
            password: "12345",
            admin: true
        }

        const user = await userRepository.create(userData);

        expect(user).toHaveProperty("id");
    });

    it("List users", async () => {

        //List all users
        const userRepository = new UserRepository();

        const users = await userRepository.list();

        expect(users).not.toBeNull();

        expect(users.length).toBeGreaterThanOrEqual(1);
    });

    it("Find one user by id", async () => {

        const userRepository = new UserRepository();

        //Search one user to find
        const users = await userRepository.list();

        const user = users[0];

        //User found
        const userFound = await userRepository.findOne(user.id);

        expect(userFound).toStrictEqual(user);

        //User not found
        const userNotFound = await userRepository.findOne("notExistId");

        expect(userNotFound).toBeNull();
    });

    it("Find one user by email", async () => {

        const userRepository = new UserRepository();
      
        //User found
        const userFound = await userRepository.findByEmail("test@test.com.br");

        expect(userFound.email).toBe("test@test.com.br");

        //User not found
        const userNotFound = await userRepository.findByEmail("notExistId");

        expect(userNotFound).toBeNull();
    });

    it("Update user", async () => {

        const userRepository = new UserRepository();

        //create user
        const user = await userRepository.create({ name: "Test Update", email: "testupdate@test.com.br", password: "12345", admin: true });

        //update user
        const userUpdated = await userRepository.update({ ...user, name: "Test Update Edited", admin: false });

        expect(userUpdated.name).toBe("Test Update Edited");
    });

    it("delete user", async () => {

        const userRepository = new UserRepository();

        //create user
        const user = await userRepository.create({ name: "Test Delete", email: "testdelete@test.com.br", password: "12345", admin: true });

        //update user
        const userDeleted = await userRepository.delete(user);

        expect(userDeleted).toBe(user);
    });
});