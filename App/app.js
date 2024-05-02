import express from "express";
import cors from "cors";
import helmet from "helmet";

import { roleRouter } from "./routes/roles.routes.js";
import {router as userRoutes} from "./routes/user.routes.js";
import {router as userRoleRoutes} from "./routes/userRole.routes.js";
import {router as permissionRoutes} from './routes/permission.routes.js'
import {router as attachmentRoutes} from './routes/attachments.routes.js'
import{router as rolePermissions} from './routes/permissionForRoles.routes.js'
import { responseHandler } from "../common/handlers.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(helmet());

const routes = [
    { path: '/api/user', router: userRoutes },
    { path: '/api/roles', router: roleRouter },
    { path: '/api/users', router: userRoleRoutes },
    { path: '/api/permissions', router: permissionRoutes },
    { path: '/api/boards', router: attachmentRoutes },
    { path: '/api/rolePermissions', router: rolePermissions }
  ];
  
routes.forEach(route => {
app.use(route.path, route.router);
});

app.use((error,req,res,next)=>{
  console.log(error);
  res.status(error.statusCode || 500).send(new responseHandler(null,error.message))
})
  
export default app;