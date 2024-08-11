
let servers = ["    server {\n\
        listen 80;\n\
        server_name myhomedomain.sytes.net;\n\
        location / {\n\
            proxy_pass http://myhomedomain.sytes.net:9999;\n\
            proxy_set_header Host $host;\n\
            proxy_set_header X-Real-IP $remote_addr;\n\
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n\
            proxy_set_header X-Forwarded-Proto $scheme;\n\
        }\n\
    }\n"];

export default servers;