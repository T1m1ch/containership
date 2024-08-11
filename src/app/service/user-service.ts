import User from "../models/user-model"

import {Request, Response} from "express"

class UserService {
    public async printAllUsers(req : Request, res : Response) : Promise<void> {
        try {
            res.status(200).send(await User.findAll());
        } catch(err) {
            console.log(err);
            //res.status(500).send("internal server erroro");
        }
    }
}

export default new UserService;