import express from 'express';

import { getPost, createPost } from '../controllers/posts.js';

const router = express.Router();

router.post('/', createPost);
router.get('/', getPost);

export default router;