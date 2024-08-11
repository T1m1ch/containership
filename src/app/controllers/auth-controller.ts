import bcrypt from "bcrypt"
import {Request, Response} from "express"

import User from "../models/user-model"
import getUserIP from "../utils/user-ip";
import generateJWT, { Roles } from "../utils/jwt";
import { validateEmail, validatePassword, validateUsername } from "../utils/validation";
import createError from "../utils/error-constructor";

class AuthController {
    public async register(req : Request, res : Response) : Promise<void> {
        try {
            const {username, email, password} = req.body; 
            if (!username || !email || !password) {
                res.status(422).send(createError("Fields 'username', 'email' and 'password' must be filled in"));
                return;
            }
            const usernameValidationMessage = validateUsername(username);
            if (usernameValidationMessage.length > 0) {
                res.status(422).send(createError(usernameValidationMessage));
                return;
            }
            if (await User.findOne({where: {name : username}})) {
                res.status(409).send(createError("A user with the specified name already exists"));
                return;
            }
            if (!validateEmail(email)) {
                res.status(422).send(createError("Email is uncorrect"));
                return;
            }
            if (await User.findOne({where: {email}})) {
                res.status(409).send(createError("The provided email is already in use by another user"));
                return;
            } 
            const passwordValidationMessage = validatePassword(password);
            if (passwordValidationMessage.length > 0) {
                res.status(422).send(createError(passwordValidationMessage));
                return;
            }
            await User.create({name : username, email, password : await bcrypt.hash(password, 10)});
            
            console.log(process.env.IP);

            const result = await fetch(`https://api.reg.ru/api/regru2/zone/add_alias?input_data={"username":"${String(process.env.REGRU_USERNAME)}","password":"${String(process.env.REGRU_PASSWORD)}","domains":[{"dname":"${String(process.env.DOMAIN)}"}],"subdomain":"${username}","ipaddr":"${String(process.env.IP)}","output_content_type":"plain"}&input_format=json`, {method : "POST"});
            if ((await result.json()).result != "success") {
                res.status(500).send(createError("Internal Server Error"));   
                return;
            }
            res.status(201).send();
        } catch(err) {
            console.log(err);
            res.status(500).send(createError("Internal Server Error"));
        }
    }
    public async login(req : Request, res : Response) : Promise<void> {
        try {
            const {username, email, password} = req.body;
            const user = await User.findOne({where : {name : username}});
            if (!user) {
                res.status(404).send(createError("The provided username does not correspond to any account"));
                return;
            }
            if (!await bcrypt.compare(password, user.dataValues.password)) {
                res.status(401).send(createError("Invalid password."));
                return;
            }
            const userIP = process.env.IP;//getUserIP(req);
            if (userIP) {
                res.status(200).send(generateJWT(user?.dataValues.id, username, userIP, Roles.user));
            } else {
                res.status(400).send(createError("IP cannot be recognized"));
            }
        } catch (err) {
            res.status(500).send(createError("Internal Server Error"));
        }
    }
}

export default new AuthController;