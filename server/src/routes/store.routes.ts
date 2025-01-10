import { Router } from "express";
import { getProducts, getUserOrders, purchase } from "../controllers/store.controller";
import { authMiddleware as isAuth } from "../middlewares/auth.middleware";

const router = Router();


router.get('/products', getProducts);

router.post('/purchase', isAuth, purchase);

router.get('/orders', isAuth, getUserOrders)


export default router;