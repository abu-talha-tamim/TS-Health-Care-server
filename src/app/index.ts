import express from "express";
import { userRouter } from "./modules/User/user.routes";
import { adminRoutes } from "./modules/Admin/admin.routes";
import { AuthRoutes } from "./modules/Auth/auth.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/admins",
    route: adminRoutes,
  },
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
