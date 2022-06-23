import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"
import { IAuthenticatedUser } from "../interfaces/message/IAuthenticatedUser";

interface IPayload {
    sub: string;
    email: string;
    admin: boolean;
}
export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authToken = request.headers.authorization;

    if (!authToken)
        return response.status(401).end();

    const [,token] = authToken.split(' ');

    try {

        const { sub, email, admin } = verify(token, "b0ca81d582e0d1ef9536df4acc3e0d27") as IPayload;

        request.user = {id: sub, email, admin} as IAuthenticatedUser;

        return next();
    }
    catch(err) {
        return response.status(401).end();
    }
}