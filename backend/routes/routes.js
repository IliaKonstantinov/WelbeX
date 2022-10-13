import { Router } from "express";
import { createItem, deleteItem, getAllItems} from "../controllers/object-controller.js";

export const router = new Router()

router.get('/all', getAllItems);
router.post('/create', createItem);
router.post('/delete', deleteItem)