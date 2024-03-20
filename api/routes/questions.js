import express from 'express';
import { addQuestion,getQuestion,getQuestions,getUserQuestions } from '../controllors/question.js';

const router =express.Router();

router.get('/',getQuestions);
router.get('/userquestions/:id',getUserQuestions);
router.get('/:id',getQuestion);
router.post('/',addQuestion);




export default router;