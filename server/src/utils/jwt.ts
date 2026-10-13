import { IUserToken } from "./interfaces";
import { SECRET } from "./env";
import jwt from "jsonwebtoken";

export const generateToken = (user: IUserToken): string => {
    const token = jwt.sign(user, SECRET, {
        expiresIn: "1h",
    });
    return token;
};

export const getUserData = (token: string) => {
    try {
        const user = jwt.verify(token, SECRET) as IUserToken;
        return user;
    } catch (error) {
        return null
    }
};
