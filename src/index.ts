import express, {Request, Response} from "express"
import cors from "cors"

import routes from "./app/routes/routes"
import db from "./app/config/db"
import logger from "./app/config/logger"

logger.info("Hello world");

const PORT = 9999;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

async function startApp() {
    try {
        if (db) {
            db.sync({force:false}).then(()=> {console.log("Database created")}).catch((err : Error) => {console.log(err)})
        }
        app.get("/", async (req : Request, res : Response) => {
            res.status(200).send("<span>Hello</span>");
        })
        app.listen(PORT, async () => {
            console.log("Server listen aat port", PORT);
        });
    } catch (e) {
        console.log(e);
    }
}

startApp();