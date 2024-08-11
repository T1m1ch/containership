import {Request} from "express"

function getUserIP(req : Request) : string | undefined {
    const xForwardedFor = req.headers["x-forwarded-for"] as string;
    if (xForwardedFor) {
        const ipChain = xForwardedFor.split(",").map(ip => ip.trim());
        return ipChain[0];
    } else {
        const ip = String(req.socket.remoteAddress).split(":")[3];
        if (ip) {
            return ip;
        }
    }
};

export default getUserIP;