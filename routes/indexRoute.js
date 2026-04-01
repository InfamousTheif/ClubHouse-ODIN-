import { Router } from "express";
const indexRouter = Router();
import * as indexController from "../controllers/indexController.js"
import passport from "passport";
import * as postControllers from "../controllers/postControllers.js"

// Get requests
indexRouter.get("/", indexController.renderIndexPage);

indexRouter.get("/Sign-up", indexController.renderSignUp);

indexRouter.get("/Log-in", indexController.renderLogIn);

indexRouter.get("/member-initiation", indexController.renderMemberInitiation);

indexRouter.get("/Log-out", indexController.handleLogOut);

// Post requests

indexRouter.post("/Sign-up", postControllers.handleSignIn);

indexRouter.post("/Log-in", passport.authenticate('local', {failureRedirect:"/Log-in?status=failed", successRedirect:"/" }), postControllers.handleLogIn);

indexRouter.post("/member-initiation", postControllers.handleMemberInitiation);

indexRouter.post("/", postControllers.handleuserPosts);

indexRouter.post("/delete-post", postControllers.handleDeletePost);

export { indexRouter }