import express from "express";
import cors from "cors";
import helmet from "helmet";
import { responseHandler } from "../common/handlers.js";

import { roleRouter } from "./routes/roles.routes.js";
import {router as userRoutes} from "./routes/user.routes.js";
import {router as userRoleRoutes} from "./routes/userRole.routes.js";
import {router as permissionRoutes} from './routes/permission.routes.js'
import {router as attachmentRoutes} from './routes/attachments.routes.js'
import{router as rolePermissions} from './routes/permissionForRoles.routes.js'
import {router as boardsRoutes} from "./routes/boards.routes.js";
import {router as sprintRoutes} from "./routes/sprint.routes.js"



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
    { path: '/api/rolePermissions', router: rolePermissions },
    { path: '/api/board',router: boardsRoutes},
    {path:'/api/board',router:sprintRoutes}
  ];
  
routes.forEach(route => {

app.use(route.path, route.router);
});

app.use((error,req,res,next)=>{
  res.status(error.statusCode || 500).send(new responseHandler(null,error.message))

})
  
export default app;