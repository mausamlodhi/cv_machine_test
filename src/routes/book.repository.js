import { Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";

const { bookController } = controllers;
const { bookMiddleware } = middlewares;
const router = Router();

router.post('/',
    bookMiddleware.checkBookExistance,
    bookController.createBook
);

router.get('/get_all_book',
    bookController.getAllBooks
);

router.delete('/delete_book/:id',
    bookController.deleteBook
);

router.put('/update_book',
    bookController.updateBook
);

export default router;
