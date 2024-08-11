import fs from "fs"

import servers from "../config/nginx"

export function insertNewServer(subdomain : string, port : number) {
    servers.push(`      server {\n\
        listen 80;\n\
        server_name ${subdomain}.${String(process.env.DOMAIN)};\n\
        location / {\n\
            proxy_pass http://${String(process.env.DOMAIN)}:${port};\n\
            proxy_set_header Host $host;\n\
            proxy_set_header X-Real-IP $remote_addr;\n\
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n\
            proxy_set_header X-Forwarded-Proto $scheme;\n\
        }\n\
    }\n`);
}

export function updateNginxConfig() {
    let content = `events {\n\
}\n\
http {\n`;
    servers.forEach(server => content += server);
    content += "}\n";
    fs.writeFileSync("text.txt", content);
}
