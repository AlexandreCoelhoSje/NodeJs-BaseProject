import { User } from "../entities/User";
import { UserService } from "../services/UserService";
import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(async () => {

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

        const user = await userService.create(userData);
    }
    
    console.log("database has been initialized");

}).catch(error => console.log(error));

export { AppDataSource }