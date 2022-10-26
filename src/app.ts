import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { userRoutes } from "./routes/users.routes";
import { loginRoutes } from "./routes/login.routes";
import { handleErrorMiddleware } from "./middlewares/handleError.middleware";
import { categoriesRoutes } from "./routes/categories.routes";
import { propertiesRoutes } from "./routes/properties.routes";
import { schenduleRoutes } from "./routes/schendules.routes";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoriesRoutes);
app.use("/properties", propertiesRoutes);
app.use("/schedules", schenduleRoutes);
app.use(handleErrorMiddleware);

export default app;
