import express  from "express";
import {addSolution, getSolutions,getVideoId,getSingleLink,getUserSolutions} from '../controllors/solution.js'
const router=express.Router();

router.get('/:id',getSolutions);
router.get('/usersolution/:id',getUserSolutions)
router.post('/',addSolution);
router.get('/videoid/:id',getVideoId);
router.get('/link/:id',getSingleLink);


export default router;