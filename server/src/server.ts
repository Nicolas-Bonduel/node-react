import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import routes from "./routes/index.routes";

import { env } from "./config/env";
const { PORT, FRONTEND_URL } = env;

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true 
}));


app.use('/', routes);

app.get('*', (request, response) => {
    response.status(404).json({
        message: "Not found"
    });
})


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})