import express from 'express';
import { getAnswers,addAnswer,getUserAnswers } from '../controllors/answer.js';

const router=express.Router();

router.get('/:id',getAnswers);
router.get('/useranswers/:id',getUserAnswers);
router.post('/',addAnswer);

export default router;