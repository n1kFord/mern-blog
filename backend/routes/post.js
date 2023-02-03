import {Router} from 'express'
import {checkAuth} from "../utils/checkAuth.js";
import {
    createPost,
    getAll,
    getById,
    getMyPosts,
    removePost,
    updatePost,
    getPostComments
} from "../controllers/posts.js";

const router = new Router()

router.post('/', checkAuth, createPost);

router.get('/', getAll);

router.get('/me', checkAuth, getMyPosts);

router.get('/:id', getById);

router.put('/:id', checkAuth, updatePost);

router.delete('/:id', checkAuth, removePost);

router.get('/comments/:id', checkAuth, getPostComments);
export default router