import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

import { insertNewServer, updateNginxConfig } from "../utils/nginx-conf-editor";
import createError from "../utils/error-constructor";
import { createSubDomain } from "../utils/regru";

class AppController {
    public async create(req : Request, res : Response) : Promise<void> {
        if (!req.query["name"]) {
            res.status(400).send(createError("Query param name is not defined"));   
            return
        }
        const username = (jwt.decode(req.headers["authorization"] as string) as JwtPayload).usr;
        if (await createSubDomain(`${req.query["name"]}.${username}`)) {
            res.status(500).send(createError("Internal server error"));
        }
        insertNewServer(`${req.query["name"]}.${username}`, 8000);
        updateNginxConfig();
        res.status(200).send();
    }
}

export default new AppController;