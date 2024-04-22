import express from "express";
import cors from "cors";

import { router as roleRoutes } from "./routes/roles.routes.js";
import {router as userRoutes} from "./routes/user.routes.js";
import {router as userRoleRoutes} from "./routes/userRole.routes.js";
import {router as permissionRoutes} from './routes/permission.routes.js'
import {router as attachmentRoutes} from './routes/attachments.routes.js'
import{router as rolePermissions} from './routes/permissionForRoles.routes.js'

const app = express();

app.use(express.json());
app.use(cors());


app.use('/api/user',userRoutes);
app.use("/api/roles", roleRoutes);
app.use('/api/users',userRoleRoutes)
app.use('/api/permissions',permissionRoutes)
app.use('/api/boards',attachmentRoutes)
app.use('/api/rolePermissions',rolePermissions);



export default app;