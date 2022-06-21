import { User } from "../../src/entities/User";
import { AuthenticateUserService } from "../../src/services/AuthenticateUserService";

jest.mock("../../src/repositories/UserRepository");

describe("test AuthenticateUserService", () => {

    it("authenticate a user", async ()=> {

        const authenticatedService = new AuthenticateUserService();

        const user = new User();
        user.email = "teste@test.com";
        user.password = "12345";

        //success case
        const token = await authenticatedService.authenticate({email: user.email, password: user.password });

        expect(token).not.toBeNull();
        expect(token).not.toBe("");

        //error case, wrong email
        expect(authenticatedService.authenticate({email: "email@not.exists", password: user.password })).rejects.toThrow("Email/Password incorrect");

        //error case, wrong password
        expect(authenticatedService.authenticate({email: user.email, password: "wrongPassword" })).rejects.toThrow("Email/Password incorrect");

    });
});