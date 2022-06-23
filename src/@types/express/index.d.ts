declare namespace Express {
    
    import { IAuthenticatedUser } from "../../interfaces/message/IAuthenticatedUser";

    export interface Request {       
        user: IAuthenticatedUser;
    }
}