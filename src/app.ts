import * as routers from "./routers";
import "reflect-metadata";
import express from "express";
import { errorHandler } from "./errors/handleError";
import "express-async-errors";

const app = express();

app.use(express.json());
app.use(errorHandler);
app.use("/login", routers.loginRoutes);
app.use("/users", routers.userRoutes);

export default app;
