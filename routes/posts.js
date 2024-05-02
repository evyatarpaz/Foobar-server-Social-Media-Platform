import express from "express";
import { getPosts, getCommentsList } from "../controllers/posts.js";
import {authorization} from "../controllers/tokens.js";

const router = express.Router();

router.get("/",authorization ,getPosts);

router.get("/:id/commentsList", getCommentsList);

export default router;
