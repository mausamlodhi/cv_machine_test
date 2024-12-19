import { Router } from "express";
import controllers from "../controllers";
const router = Router();
const { mediaController } = controllers;

router.post(
    '/media/upload/:mediaFor/:mediaType', (request, response, next) => {
        Object.assign(request.params, { apiName: 'media' });
        next();
    }, (request, response, next) => {
        const { params } = request;
        Object.assign(request.body, params);
        next();
    },
    mediaController.uploadMedia
)
export default router;