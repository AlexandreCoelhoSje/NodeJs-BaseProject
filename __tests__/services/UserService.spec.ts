import { IAuthenticatedUser } from "../../src/interfaces/message/IAuthenticatedUser";
import { UserService } from "../../src/services/UserService";

jest.mock("../../src/repositories/UserRepository");

describe("test UserService", () => {

    const authenticatedUser: IAuthenticatedUser = {
        id: "12345",
        name: "Test Admin",
        email: "test@test.com",
        admin: true
    };

    it("create new user with admin", async () => {
        
        const userService = new UserService(authenticatedUser);

        //success case
        const newUser = await userService.create({ name: "Test Two", email: "othertest@email.com", admin: false, password: "12345" });

        expect(newUser).toHaveProperty("id");

        //error case, email is null
        expect(userService.create({ name: "Test Two", email: "", admin: false, password: "12345" })).rejects.toThrow("Email incorrect");
        
        //error case, email already exists
        expect(userService.create({ name: "Test Two", email: "othertest@email.com", admin: false, password: "12345" })).rejects.toThrow("User already exists");
    });

    it("create new user with non-admin", async () => {
        
        const userService = new UserService({...authenticatedUser, admin: false});

        //error case, non-admin user trying to add admin user
        expect(userService.create({ name: "Test Two", email: "usernonadmin@email.com", admin: true, password: "12345" })).rejects.toThrow("You cannot add an admin user");
    });

    it("list all users", async () => {

        const userService = new UserService(authenticatedUser);

        //success case, return at least one
        const users = await userService.list();

        expect(users.length).toBeGreaterThanOrEqual(1);
    });

    it("find user", async () => {

        const userService = new UserService(authenticatedUser);

        //Catch user to find
        const user = (await userService.list())[0];

        //success case, user found
        const userFound = await userService.findOne(user.id);

        expect(userFound).toBe(user);

        //error case, user not found
        const userNotFound = await userService.findOne("00000");

        expect(userNotFound).toBeUndefined();
    });

    it("update user authenticated admin", async () => {

        const userService = new UserService(authenticatedUser);        
        
        //create user for test
        const userAdmin = await userService.create({ name: "Test Admin", email: "adminuser@email.com", admin: true, password: "12345" });
        
        //success case, update name
        const userUpdated = await userService.update({...userAdmin, name: "Test Admin Edited"});

        expect(userUpdated.name).toBe("Test Admin Edited");

        //error case, user not found
        expect(userService.update({...userAdmin, id: "fake"})).rejects.toThrow("user not found");
    });

    it("update user authenticated non-admin", async () => {

        const userServiceNonAdmin = new UserService({...authenticatedUser, email: "nonadminuser@email.com", admin: false});

        //create user for test
        const userNonAdmin = await userServiceNonAdmin.create({ name: "Test Non Admin", email: "nonadminuser@email.com", admin: false, password: "12345" });
        //const userAdmin = await userServiceNonAdmin.create({ name: "Test Admin", email: "adminuser@email.com", admin: true, password: "12345" });

        //error, non-admin user trying to change another user's data
        expect(userServiceNonAdmin.update(userNonAdmin)).rejects.toThrow("you cannot edit this user");
        
        //error, non-admin user put a user as an administrator
        //const userNotEdited = await userServiceNonAdmin.update({...userNonAdmin, id: authenticatedUser.id, admin: true });
        //expect(userNotEdited.admin).toBeFalsy();
    });

    it("delete user", async () => {

        const userService = new UserService(authenticatedUser);

        //create user for test
        const userNonAdmin = await userService.create({ name: "Test Non Admin", email: "nonadminuserdelte@email.com", admin: false, password: "12345" });
        const userAdmin = await userService.create({ name: "Test Admin", email: "adminuserdelete@email.com", admin: true, password: "12345" });

        //success case, user is deleted
        await userService.delete(userNonAdmin.id);

        //error case, user is admin
        expect(userService.delete(userAdmin.id)).rejects.toThrow("You do not have permission to delete this user");

        //error case, user not found
        expect(userService.delete(userNonAdmin.id)).rejects.toThrow("user not found");
    });
});