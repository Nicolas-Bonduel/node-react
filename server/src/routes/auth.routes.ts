import { Router } from "express";
import { register, login, logout, relogin} from "../controllers/auth.controller";
import { authMiddleware as isAuth } from "../middlewares/auth.middleware";

const router = Router();


router.post('/register', register);

router.post('/login', login);
router.post('/relogin', isAuth, relogin);

router.get('/logout', logout);


export default router;