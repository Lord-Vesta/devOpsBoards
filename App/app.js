import express from "express";
import cors from "cors";

// import { router as roleRoutes } from "./routes/roles.routes.js";
import {router as userRoutes} from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(cors());


app.use('/api/user',userRoutes);
// app.use("/api/roles", roleRoutes);



export default app;