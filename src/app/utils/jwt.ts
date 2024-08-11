import jwt, { JwtPayload } from "jsonwebtoken"

import {Request, Response} from "express"

import createError from "./error-constructor"

export enum Roles {
    user = 1,
    su = 2,
    admin = 3
}

function generateJWT(sub : string, usr : string, ip : string, role : Roles) : string {
    const header = {
        alg : "HS256",
        typ : "JWT"
    };
    const payload = {
        sub,
        usr,
        ip,
        iat : Math.floor(Date.now()/1000),
        exp : Math.floor(Date.now()/1000) + 1000 * 60 * 60 * 24 * 30,
        role,
    };
    return jwt.sign(payload, String(process.env.JWT_SECRET), {header});
}

export function checkJWT(role : Roles) {
    return async (req : Request, res : Response, next : Function) => {
        try {
            const userJWT = req.headers["authorization"];
            if (!userJWT) {
                res.status(401).send("User is not authorized");
                return;
            }
            const decodedJwt = jwt.verify(userJWT, String(process.env.JWT_SECRET)) as JwtPayload;
            if (decodedJwt.role < role) {
                res.status(403).send("User does not have the required permissions");
                return;
            }
            next();
        } catch (err) {
            if (err instanceof jwt.JsonWebTokenError) {
                res.status(401).send(createError("Invalid token"));
            } else if (err instanceof jwt.TokenExpiredError) {
                res.status(401).send(createError("Token has expired"));
            } else {
                res.status(500).send(createError("Internal Server Error"));
            }
        }
    };
}

export default generateJWT;