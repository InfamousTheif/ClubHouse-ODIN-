import { Router } from "express";
const indexRouter = Router();
import * as indexController from '../controllers/indexController.js'

indexRouter.get("/", indexController.renderIndexPage);

indexRouter.get("/Sign-up", indexController.renderSignUp);

indexRouter.get("/Log-in", indexController.renderLogIn)

indexRouter.get("/member-initiation", indexController.renderMemberInitiation)

export { indexRouter }