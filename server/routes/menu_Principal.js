import express from "express";

import { getMenu_Principal } from "../controllers/menu_Principal.js";

const router = express.Router();

router.get('/', getMenu_Principal);
export default router;