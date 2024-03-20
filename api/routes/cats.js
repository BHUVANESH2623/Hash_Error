import express from "express";
import {getCats} from '../controllors/cat.js';

const router=express.Router();

router.get('/',getCats);

export default router;