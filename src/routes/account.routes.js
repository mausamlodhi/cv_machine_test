import { Router } from "express";
import controllers from "../controllers";

const { accountController } = controllers;
const router = Router();

router.post('/signup',
    accountController.userSignup
);

export default router;