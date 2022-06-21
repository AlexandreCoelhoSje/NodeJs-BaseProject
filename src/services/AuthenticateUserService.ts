import { UserRepository } from "../repositories/UserRepository";
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
    email: string;
    password: string;
}
export class AuthenticateUserService {

    async authenticate({ email, password }: IAuthenticateRequest): Promise<string> {

        const userRepository = new UserRepository();

        const userFound = await userRepository.findOne(email);

        if (!userFound) {
            throw new Error("Email/Password incorrect");
        }
        
        const passwordMatch = await compare(password, userFound.password);        

        if (!passwordMatch) {
            throw new Error("Email/Password incorrect");
        }

        const token = sign({
            email: userFound.email,
            admin: userFound.admin
        },
        "b0ca81d582e0d1ef9536df4acc3e0d27", {
            subject: userFound.id,
            expiresIn: "1d"
        });

        return token;
    }
}