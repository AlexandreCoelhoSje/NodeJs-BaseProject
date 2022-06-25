import { User } from "../../src/entities/User";
import { AuthenticateUserService } from "../../src/services/AuthenticateUserService";

jest.mock("../../src/repositories/UserRepository");

describe("test AuthenticateUserService", () => {

    it("authenticate a user", async ()=> {

        const authenticatedService = new AuthenticateUserService();

        const email = "teste@test.com";
        const password = "12345";

        //success case
        const token = await authenticatedService.authenticate({email: email, password: password });

        expect(token).not.toBeNull();
        expect(token).not.toBe("");

        //error case, wrong email
        expect(authenticatedService.authenticate({email: "email@not.exists", password: password })).rejects.toThrow("Email/Password incorrect");

        //error case, wrong password
        expect(authenticatedService.authenticate({email: email, password: "wrongPassword" })).rejects.toThrow("Email/Password incorrect");

    });
});