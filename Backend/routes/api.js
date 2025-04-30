import express from "express";
import { createPost, getPost, getPostById, getRandomPosts, uploadDataToCloud } from "../app/controllers/postController.js";
const router = express.Router();

router.post('/uploadfile',uploadDataToCloud);
router.post('/create-post',createPost);
router.get('/get-post',getPost);
router.get("/post/:id", getPostById);
router.get("/random-posts", getRandomPosts);


export default router;