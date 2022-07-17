import express from "express";
import errorMiddleware from './middlewares/errorMiddleware';
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorMiddleware)

export default app;
