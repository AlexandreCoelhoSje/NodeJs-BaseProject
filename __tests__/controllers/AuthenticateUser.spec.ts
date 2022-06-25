jest.mock("../../src/database/data-source");
jest.mock("../../src/database/index");

import request from "supertest"
import { app } from "../../src/server"

import { AppDataSource } from "../../src/database"
import { UserService } from "../../src/services/UserService";
import { User } from "../../src/entities/User";

describe("AuthenticateUserController", () => {

    beforeAll(async () => {

        return await AppDataSource.initialize().then(async () => {

            //recreates the database at each test run
            await AppDataSource.dropDatabase();
            await AppDataSource.runMigrations();

            const userService = new UserService({
                id: "",
                name: "Fake For Seed Only",
                email: "admin@email.com",
                admin: true
            });
        
            const userAlreadyExists = await userService.findByEmail("admin@email.com");
        
            if (!userAlreadyExists) {
        
                const userData: User = {
                    name: "Admin",
                    email: "admin@email.com",
                    password: "12345",
                    admin: true
                }
        
                await userService.create(userData);
            }

            console.log("database in memory has been initialized");
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

        }).catch(error => console.log(error));
    });

    it("authenticate user", async () => {

        const testRequest = await request(app)
            .post("/login")
            .send({ email: "admin@email.com", password: "12345" });

        expect(testRequest.status).toBe(200);
    });

    it("", async () => {

        expect(1).toBe(1);
    });
});