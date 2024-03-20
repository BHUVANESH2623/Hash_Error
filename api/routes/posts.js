import {addPost,getPost,getPosts,deletePost,updatePost,getUserPosts} from '../controllors/post.js';
import express from 'express';

const router=express.Router();

router.get('/',getPosts);
router.get('/userposts/:id',getUserPosts);
router.get('/:id',getPost);
router.post('/',addPost);
router.delete('/:id',deletePost);
router.put('/:id',updatePost)

export default router