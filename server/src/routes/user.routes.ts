import { Router } from "express";
import { editAccount } from "../controllers/user.controller";

const router = Router();


router.post('/edit', editAccount);


export default router;