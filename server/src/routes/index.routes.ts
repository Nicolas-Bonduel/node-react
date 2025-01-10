import { Router } from 'express';
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes"
import { authMiddleware as isAuth } from '../middlewares/auth.middleware';

const router = Router();


router.use('/', authRoutes);
router.use('/my-account', isAuth, userRoutes);


export default router;