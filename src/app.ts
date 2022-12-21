import "express-async-errors";
import "reflect-metadata";
import * as routers from "./routers";
import express from "express";
import { errorHandler } from "./errors/handleError";

const app = express();

app.use(express.json());
app.use("/login", routers.sessionRoutes);
app.use("/users", routers.userRoutes);
app.use(errorHandler);

export default app;
