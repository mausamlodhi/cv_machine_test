import { Router } from "express";
import controllers from "../controllers";

const { accountController } = controllers;
const router = Router();

router.post('/signup',
    accountController.userSignup
);

router.post('/login',
    accountController.userLogin
)

export default router;